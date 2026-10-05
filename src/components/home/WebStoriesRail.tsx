"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { IgStory } from "@/types/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

const DEFAULT_MS = 5000;
const HOLD_MS = 180;
const SEEN_KEY = "rm-ig-stories-seen";

type WebStoriesRailProps = {
  /** Section heading (the CMS category name). */
  title: string;
  href?: string;
  items: IgStory[];
};

function readSeen(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSeen(ids: Set<string>) {
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

export function WebStoriesRail({ title, href, items }: WebStoriesRailProps) {
  const rail = items.slice(0, 5);
  const [seen, setSeen] = useState<Set<string>>(() => new Set());
  const [active, setActive] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const fillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const startedAt = useRef(0);
  const remaining = useRef(DEFAULT_MS);
  const didHold = useRef(false);
  const pauseProgress = useRef<() => void>(() => {});
  const resumeProgress = useRef<() => void>(() => {});
  const goNextRef = useRef<() => void>(() => {});
  const goPrevRef = useRef<() => void>(() => {});
  const activeRef = useRef(active);
  const slideRef = useRef(slide);
  const itemsRef = useRef(rail);

  activeRef.current = active;
  slideRef.current = slide;
  itemsRef.current = rail;

  useEffect(() => {
    setSeen(readSeen());
  }, []);

  const story = active !== null ? rail[active] : null;
  const currentSlide = story?.slides[slide];
  const duration = currentSlide?.durationMs ?? DEFAULT_MS;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const syncBars = useCallback((currentIndex: number) => {
    fillsRef.current.forEach((el, index) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.width = index < currentIndex ? "100%" : "0%";
    });
  }, []);

  const markSeen = useCallback((id: string) => {
    setSeen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      writeSeen(next);
      return next;
    });
  }, []);

  const close = useCallback(() => {
    clearTimer();
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setActive(null);
    setSlide(0);
  }, []);

  const goNext = useCallback(() => {
    const a = activeRef.current;
    const s = slideRef.current;
    const list = itemsRef.current;
    if (a === null) return;
    const current = list[a];
    if (s < current.slides.length - 1) {
      setSlide(s + 1);
      return;
    }
    markSeen(current.id);
    if (a < list.length - 1) {
      setActive(a + 1);
      setSlide(0);
      return;
    }
    close();
  }, [markSeen, close]);

  const goPrev = useCallback(() => {
    const a = activeRef.current;
    const s = slideRef.current;
    const list = itemsRef.current;
    if (a === null) return;
    if (s > 0) {
      setSlide(s - 1);
      return;
    }
    if (a > 0) {
      const prev = list[a - 1];
      setActive(a - 1);
      setSlide(Math.max(0, prev.slides.length - 1));
    }
  }, []);

  goNextRef.current = goNext;
  goPrevRef.current = goPrev;

  useEffect(() => {
    if (active === null || !story) return;
    markSeen(story.id);
  }, [active, story, markSeen]);

  /* One bar fills at a time; previous stay full, later stay empty */
  useEffect(() => {
    if (active === null) return;

    let cancelled = false;
    clearTimer();
    remaining.current = duration;
    syncBars(slide);

    const el = fillsRef.current[slide];

    const finishAndNext = () => {
      if (cancelled) return;
      if (el) {
        el.style.transition = "none";
        el.style.width = "100%";
      }
      goNextRef.current();
    };

    const run = (ms: number) => {
      if (cancelled || !el) return;
      clearTimer();
      remaining.current = ms;
      startedAt.current = performance.now();

      // Force layout so width:0 → width:100% transition always starts
      void el.offsetWidth;
      el.style.transition = `width ${ms}ms linear`;
      el.style.width = "100%";

      timerRef.current = window.setTimeout(finishAndNext, ms);
    };

    pauseProgress.current = () => {
      if (cancelled || !el) return;
      clearTimer();
      const elapsed = performance.now() - startedAt.current;
      remaining.current = Math.max(0, remaining.current - elapsed);
      const width = getComputedStyle(el).width;
      el.style.transition = "none";
      el.style.width = width;
    };

    resumeProgress.current = () => {
      if (cancelled) return;
      run(remaining.current);
    };

    // Double rAF so the 0% width paint lands before the fill starts
    const raf1 = window.requestAnimationFrame(() => {
      const raf2 = window.requestAnimationFrame(() => {
        run(duration);
      });
      // store outer cancel via cancelled flag
      void raf2;
    });

    return () => {
      cancelled = true;
      clearTimer();
      window.cancelAnimationFrame(raf1);
    };
  }, [active, slide, duration, syncBars]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") goNextRef.current();
      if (event.key === "ArrowLeft") goPrevRef.current();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  const openAt = (index: number) => {
    clearTimer();
    setActive(index);
    setSlide(0);
  };

  const onHitPointerDown = () => {
    didHold.current = false;
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
    }
    holdTimerRef.current = window.setTimeout(() => {
      didHold.current = true;
      pauseProgress.current();
    }, HOLD_MS);
  };

  const onHitPointerUp = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (didHold.current) {
      resumeProgress.current();
    }
  };

  const onHitClick = (direction: "prev" | "next") => {
    if (didHold.current) {
      didHold.current = false;
      return;
    }
    if (direction === "prev") goPrev();
    else goNext();
  };

  if (!rail.length) return null;

  return (
    <section className="ig-stories" aria-label={title}>
      <div className="container">
        <SectionTitle href={href} more={Boolean(href)}>
          {title}
        </SectionTitle>
        <ul className="ig-stories__rail">
          {rail.map((item, index) => {
            const isSeen = seen.has(item.id);
            const cover = item.slides[0]?.imageUrl ?? item.avatarUrl;
            const count = item.slides.length;
            const title = item.slides[0]?.title ?? item.label;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`ig-stories__item${isSeen ? " is-seen" : ""}`}
                  onClick={() => openAt(index)}
                >
                  <img
                    className="ig-stories__cover"
                    src={cover}
                    alt=""
                    width={360}
                    height={640}
                    loading="lazy"
                  />
                  <span
                    className="ig-stories__count"
                    aria-label={`${count} ${count === 1 ? "story" : "stories"}`}
                  >
                    <strong>{count}</strong>
                    <em>{count === 1 ? "STORY" : "STORIES"}</em>
                  </span>
                  <span className="ig-stories__item-body">
                    <span className="ig-stories__label">{title}</span>
                  </span>
                  <span className="ig-stories__ticks" aria-hidden="true">
                    {item.slides.map((_, tick) => (
                      <span
                        key={`${item.id}-tick-${tick}`}
                        className={tick === 0 ? "is-on" : undefined}
                      />
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {active !== null && story && currentSlide ? (
        <div
          className="ig-stories__viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${story.label} स्टोरी`}
        >
          <div className="ig-stories__frame">
            <div className="ig-stories__progress" aria-hidden="true">
              {story.slides.map((_, index) => (
                <span key={`${story.id}-${index}`} className="ig-stories__bar">
                  <span
                    ref={(node) => {
                      fillsRef.current[index] = node;
                    }}
                    className="ig-stories__bar-fill"
                  />
                </span>
              ))}
            </div>

            <div className="ig-stories__top">
              <div className="ig-stories__who">
                <img src={story.avatarUrl} alt="" width={36} height={36} />
                <span>{story.label}</span>
              </div>
              <button
                type="button"
                className="ig-stories__close"
                onClick={close}
                aria-label="बन्द गर्नुहोस्"
              >
                <Icon name="xmark" size={20} />
              </button>
            </div>

            <img
              className="ig-stories__media"
              src={currentSlide.imageUrl}
              alt={currentSlide.title || story.label}
              width={1080}
              height={1920}
            />

            {currentSlide.title ? (
              <div className="ig-stories__caption">
                {currentSlide.href ? (
                  <Link href={currentSlide.href}>{currentSlide.title}</Link>
                ) : (
                  <p>{currentSlide.title}</p>
                )}
              </div>
            ) : null}

            <button
              type="button"
              className="ig-stories__hit ig-stories__hit--prev"
              aria-label="अघिल्लो"
              onPointerDown={onHitPointerDown}
              onPointerUp={onHitPointerUp}
              onPointerCancel={onHitPointerUp}
              onPointerLeave={onHitPointerUp}
              onClick={() => onHitClick("prev")}
            />
            <button
              type="button"
              className="ig-stories__hit ig-stories__hit--next"
              aria-label="अर्को"
              onPointerDown={onHitPointerDown}
              onPointerUp={onHitPointerUp}
              onPointerCancel={onHitPointerUp}
              onPointerLeave={onHitPointerUp}
              onClick={() => onHitClick("next")}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
