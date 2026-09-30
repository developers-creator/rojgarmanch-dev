"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import HTMLFlipBook from "react-pageflip";
import type { PublicationIssue } from "@/data/publications";
import { Icon } from "@/components/ui/Icon";

type FlipApi = {
  pageFlip: () => {
    flipNext: (corner?: "top" | "bottom") => void;
    flipPrev: (corner?: "top" | "bottom") => void;
    flip: (page: number, corner?: "top" | "bottom") => void;
    turnToPage: (page: number) => void;
    getPageCount: () => number;
    getCurrentPageIndex: () => number;
  };
};

/** Store zoom as percent to avoid float drift */
const ZOOM_MIN = 85;
const ZOOM_MAX = 145;
const ZOOM_STEP = 10;
const ZOOM_DEFAULT = 100;

const Sheet = forwardRef<
  HTMLDivElement,
  { hard?: boolean; className?: string; children: ReactNode }
>(function Sheet({ hard, className = "", children }, ref) {
  return (
    <div
      ref={ref}
      className={`pub-sheet${hard ? " pub-sheet--hard" : ""} ${className}`.trim()}
      data-density={hard ? "hard" : "soft"}
    >
      {children}
    </div>
  );
});

type FlipbookProps = {
  issue: PublicationIssue;
};

function canvasToJpegUrl(canvas: HTMLCanvasElement, quality = 0.78) {
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas export failed"));
          return;
        }
        resolve(URL.createObjectURL(blob));
      },
      "image/jpeg",
      quality,
    );
  });
}

async function renderPdfPages(
  url: string,
  onProgress?: (done: number, total: number) => void,
) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

  const pdf = await pdfjs.getDocument({
    url,
    withCredentials: false,
  }).promise;

  const total = pdf.numPages;
  const images: string[] = [];
  const targetWidth = 900;

  for (let i = 1; i <= total; i += 1) {
    const page = await pdf.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(1.25, targetWidth / base.width);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      throw new Error("Canvas unavailable");
    }

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      viewport,
      canvas,
    }).promise;

    images.push(await canvasToJpegUrl(canvas));
    canvas.width = 0;
    canvas.height = 0;
    onProgress?.(i, total);
  }

  return images;
}

/** Full-page PDF flipbook reader */
export function Flipbook({ issue }: FlipbookProps) {
  const bookRef = useRef<FlipApi | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const pageUrlsRef = useRef<string[]>([]);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"portrait" | "landscape">("landscape");
  const [flipState, setFlipState] = useState("read");
  const [pages, setPages] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageInput, setPageInput] = useState("1");
  const [isNarrow, setIsNarrow] = useState(false);

  const total = pages.length;
  const isCover = mode === "landscape" && page === 0 && flipState === "read";
  const isBack =
    mode === "landscape" && total > 0 && page === total - 1 && flipState === "read";
  const zoomFactor = zoom / 100;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899.98px)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setReady(false);
      setLoadError(null);
      setPages([]);
      setProgress({ done: 0, total: 0 });

      for (const url of pageUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      pageUrlsRef.current = [];

      try {
        const images = await renderPdfPages(issue.pdfHref, (done, totalPages) => {
          if (!cancelled) {
            setProgress({ done, total: totalPages });
          }
        });
        if (!cancelled) {
          pageUrlsRef.current = images;
          setPages(images);
          setReady(true);
        } else {
          for (const url of images) URL.revokeObjectURL(url);
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : "Unknown PDF error";
          console.error("[flipbook]", error);
          setLoadError(`PDF खोल्न सकिएन: ${message}`);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      for (const url of pageUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      pageUrlsRef.current = [];
    };
  }, [issue.pdfHref]);

  useEffect(() => {
    setPageInput(String(page + 1));
  }, [page]);

  useEffect(() => {
    const onFs = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const getApi = useCallback(() => {
    try {
      return bookRef.current?.pageFlip() ?? null;
    } catch {
      return null;
    }
  }, []);

  const next = useCallback(() => {
    getApi()?.flipNext("top");
  }, [getApi]);

  const prev = useCallback(() => {
    getApi()?.flipPrev("top");
  }, [getApi]);

  const goToPage = useCallback(
    (index: number) => {
      if (!ready || total < 1) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      const api = getApi();
      if (!api) return;
      api.turnToPage(clamped);
      setPage(clamped);
    },
    [getApi, ready, total],
  );

  const zoomIn = useCallback(() => {
    setZoom((value) => Math.min(ZOOM_MAX, value + ZOOM_STEP));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((value) => Math.max(ZOOM_MIN, value - ZOOM_STEP));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const root = rootRef.current;
    if (!root) return;
    try {
      if (!document.fullscreenElement) {
        await root.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("[flipbook] fullscreen", error);
    }
  }, []);

  const submitPage = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const nextPage = Number.parseInt(pageInput, 10);
      if (Number.isNaN(nextPage)) {
        setPageInput(String(page + 1));
        return;
      }
      goToPage(nextPage - 1);
    },
    [goToPage, page, pageInput],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-" || event.key === "_") zoomOut();
      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        void toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggleFullscreen, zoomIn, zoomOut]);

  return (
    <main
      id="main"
      className={`pub-flip${isFullscreen ? " is-fullscreen" : ""}`}
      ref={rootRef}
    >
      <div className="container pub-flip__box">
        <header className="pub-flip__top">
          <div className="pub-flip__copy">
            <h1>
              {issue.title} · {issue.date}
            </h1>
          </div>
          <div className="pub-flip__tools">
            <Link href="/publication">सबै प्रकाशन</Link>
            <a href={issue.pdfHref} target="_blank" rel="noreferrer">
              <Icon name="file-pdf" size={14} />
              PDF
            </a>
          </div>
        </header>

        <div
          className={[
            "pub-flip__stage",
            isCover ? "pub-flip__stage--cover" : "",
            isBack ? "pub-flip__stage--back" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {loadError ? (
            <div className="pub-flip__loading">
              <p>{loadError}</p>
              <a
                className="pub-flip__fallback"
                href={issue.pdfHref}
                target="_blank"
                rel="noreferrer"
              >
                PDF सिधै खोल्नुहोस्
              </a>
            </div>
          ) : !ready || total < 1 ? (
            <div className="pub-flip__loading">
              PDF पाना तयार हुँदैछ…
              {progress.total > 0
                ? ` ${progress.done}/${progress.total}`
                : " (२५ MB फाइल लोड हुँदै)"}
            </div>
          ) : (
            <div
              className="pub-flip__zoom"
              style={{ ["--pub-zoom" as string]: String(zoomFactor) } as CSSProperties}
            >
              <HTMLFlipBook
                key={`${issue.slug}-${total}-${isNarrow ? "p" : "l"}`}
                ref={bookRef}
                className="pub-flip__book"
                style={{ margin: "0 auto" }}
                width={420}
                height={560}
                size="stretch"
                minWidth={280}
                maxWidth={560}
                minHeight={360}
                maxHeight={720}
                startPage={0}
                drawShadow
                flippingTime={800}
                usePortrait={isNarrow}
                startZIndex={4}
                autoSize
                maxShadowOpacity={0.55}
                showCover
                mobileScrollSupport
                clickEventForward={false}
                useMouseEvents
                swipeDistance={28}
                showPageCorners
                disableFlipByClick={false}
                onFlip={(event) => setPage(Number(event.data) || 0)}
                onChangeOrientation={(event) =>
                  setMode(event.data === "portrait" ? "portrait" : "landscape")
                }
                onChangeState={(event) =>
                  setFlipState(String(event.data || "read"))
                }
                onInit={(event) => {
                  setPage(Number(event.data?.page) || 0);
                  setMode(
                    event.data?.mode === "portrait" ? "portrait" : "landscape",
                  );
                }}
              >
                {pages.map((src, index) => (
                  <Sheet
                    key={`${issue.slug}-${index}`}
                    hard={index === 0 || index === total - 1}
                    className={
                      index === 0
                        ? "pub-sheet--cover pub-sheet--pdf"
                        : index === total - 1
                          ? "pub-sheet--back pub-sheet--pdf"
                          : "pub-sheet--pdf"
                    }
                  >
                    <img src={src} alt={`${issue.title} — पाना ${index + 1}`} />
                  </Sheet>
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </div>

        <footer className="pub-flip__bar" aria-label="फ्लिपबुक नियन्त्रण">
          <div className="pub-flip__toolbar">
            <button
              type="button"
              className="pub-flip__icon-btn"
              onClick={prev}
              disabled={!ready || page <= 0}
              aria-label="अघिल्लो पाना"
              title="Previous"
            >
              <Icon name="chevron-left" size={16} />
            </button>

            <button
              type="button"
              className="pub-flip__icon-btn"
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              aria-label="जुम घटाउनुहोस्"
              title="Zoom out"
            >
              <Icon name="magnifying-glass-minus" size={16} />
            </button>

            <button
              type="button"
              className="pub-flip__icon-btn"
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              aria-label="जुम बढाउनुहोस्"
              title="Zoom in"
            >
              <Icon name="magnifying-glass-plus" size={16} />
            </button>

            <span className="pub-flip__divider" aria-hidden="true" />

            <form className="pub-flip__pager" onSubmit={submitPage}>
              <label className="sr-only" htmlFor="pub-flip-page">
                पाना नम्बर
              </label>
              <input
                id="pub-flip-page"
                type="text"
                inputMode="numeric"
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                onBlur={() => setPageInput(String(page + 1))}
                disabled={!ready || total < 1}
              />
              <span>/ {ready && total > 0 ? total : "—"}</span>
            </form>

            <span className="pub-flip__divider" aria-hidden="true" />

            <button
              type="button"
              className="pub-flip__icon-btn"
              onClick={() => void toggleFullscreen()}
              aria-label={isFullscreen ? "पूर्ण स्क्रिन बन्द" : "पूर्ण स्क्रिन"}
              title="Fullscreen"
            >
              <Icon name={isFullscreen ? "compress" : "expand"} size={16} />
            </button>

            <button
              type="button"
              className="pub-flip__icon-btn"
              onClick={next}
              disabled={!ready || total < 1 || page >= total - 1}
              aria-label="अर्को पाना"
              title="Next"
            >
              <Icon name="chevron-right" size={16} />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
