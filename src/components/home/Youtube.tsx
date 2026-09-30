"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { YoutubeBlock, YtShort, YtVideo } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { useUi } from "@/components/providers/UiProvider";

type YoutubeProps = {
  data: YoutubeBlock;
};

function thumb(id: string, quality: "hq" | "mq" | "sd" = "hq") {
  return `https://i.ytimg.com/vi/${id}/${quality}default.jpg`;
}

function WatchEmbed({
  video,
  onPlay,
}: {
  video: YtVideo;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      className="yt-block__poster"
      onClick={onPlay}
      aria-label={`${video.title} प्ले गर्नुहोस्`}
    >
      <img
        src={thumb(video.youtubeId, "hq")}
        alt=""
        width={1280}
        height={720}
        loading="lazy"
      />
      <span className="yt-block__shade" aria-hidden="true" />
      <span className="yt-block__play" aria-hidden="true">
        <Icon name="play" size={22} />
      </span>
      {video.duration ? (
        <span className="yt-block__duration">{video.duration}</span>
      ) : null}
      <span className="yt-block__poster-copy">
        <strong className="line-2">{video.title}</strong>
        {video.viewsLabel ? <em>{video.viewsLabel}</em> : null}
      </span>
    </button>
  );
}

function SideVideo({
  video,
  active,
  onSelect,
}: {
  video: YtVideo;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`yt-block__side${active ? " is-active" : ""}`}
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
    >
      <span className="yt-block__side-media">
        <img
          src={thumb(video.youtubeId, "mq")}
          alt=""
          width={320}
          height={180}
          loading="lazy"
        />
        <span className="yt-block__play yt-block__play--sm" aria-hidden="true">
          <Icon name="play" size={14} />
        </span>
        {video.duration ? (
          <span className="yt-block__duration">{video.duration}</span>
        ) : null}
      </span>
      <span className="yt-block__side-body">
        <span className="yt-block__side-title line-3">{video.title}</span>
        {video.viewsLabel ? (
          <span className="yt-block__meta">{video.viewsLabel}</span>
        ) : null}
      </span>
    </button>
  );
}

function VideoPopup({
  videos,
  activeId,
  onSelect,
  onClose,
}: {
  videos: YtVideo[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const active = videos.find((video) => video.id === activeId) ?? videos[0];
  const others = videos.filter((video) => video.id !== active.id);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!active) return null;

  return (
    <div
      className="yt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="युट्युब भिडियो"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="yt-popup__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="yt-popup__close"
          onClick={onClose}
          aria-label="बन्द गर्नुहोस्"
        >
          <Icon name="xmark" size={20} />
        </button>

        <div className="yt-popup__layout">
          <div className="yt-popup__main">
            <div className="yt-popup__player">
              <iframe
                key={active.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="yt-popup__info">
              <h3 className="yt-popup__title">{active.title}</h3>
              {active.viewsLabel ? (
                <p className="yt-popup__meta">{active.viewsLabel}</p>
              ) : null}
            </div>
          </div>

          {others.length ? (
            <aside className="yt-popup__side" aria-label="अन्य भिडियो">
              <p className="yt-popup__side-label">अन्य भिडियो</p>
              <div className="yt-popup__side-list">
                {others.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    className="yt-popup__side-item"
                    onClick={() => onSelect(video.id)}
                  >
                    <span className="yt-popup__side-thumb">
                      <img
                        src={thumb(video.youtubeId, "mq")}
                        alt=""
                        width={320}
                        height={180}
                        loading="lazy"
                      />
                      <span className="yt-block__play yt-block__play--sm" aria-hidden="true">
                        <Icon name="play" size={14} />
                      </span>
                      {video.duration ? (
                        <span className="yt-block__duration">{video.duration}</span>
                      ) : null}
                    </span>
                    <span className="yt-popup__side-copy">
                      <span className="yt-popup__side-title line-3">{video.title}</span>
                      {video.viewsLabel ? (
                        <span className="yt-block__meta">{video.viewsLabel}</span>
                      ) : null}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ShortCard({ item, onOpen }: { item: YtShort; onOpen: () => void }) {
  return (
    <button
      type="button"
      className="yt-block__short"
      onClick={onOpen}
      aria-label={`${item.title} — रिल प्ले गर्नुहोस्`}
    >
      <img
        src={thumb(item.youtubeId, "hq")}
        alt=""
        width={540}
        height={960}
        loading="lazy"
      />
      <span className="yt-block__short-body">
        <span className="yt-block__short-title line-3">{item.title}</span>
        {item.viewsLabel ? (
          <span className="yt-block__meta">{item.viewsLabel}</span>
        ) : null}
      </span>
    </button>
  );
}

function ShortsPopup({
  items,
  startIndex,
  onClose,
}: {
  items: YtShort[];
  startIndex: number;
  onClose: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(startIndex);

  const scrollToIndex = useCallback((index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const el = slideRefs.current[startIndex];
    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setActive(startIndex);
  }, [startIndex]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(
          (visible.target as HTMLElement).dataset.index ?? "-1",
        );
        if (index >= 0) setActive(index);
      },
      { root, threshold: 0.65 },
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(Math.min(items.length - 1, active + 1));
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(Math.max(0, active - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length, onClose, scrollToIndex]);

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="shorts-popup"
      role="dialog"
      aria-modal="true"
      aria-label="YouTube Shorts"
      onClick={onBackdropClick}
    >
      <div
        className="shorts-popup__stage"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="shorts-popup__top">
          <div className="shorts-popup__heading">
            <p className="shorts-popup__label">
              Shorts · {active + 1}/{items.length}
            </p>
            <h3 className="shorts-popup__title">
              {items[active]?.title}
            </h3>
            {items[active]?.viewsLabel ? (
              <p className="shorts-popup__views">{items[active].viewsLabel}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="shorts-popup__close"
            onClick={onClose}
            aria-label="बन्द गर्नुहोस्"
          >
            <Icon name="xmark" size={20} />
          </button>
        </header>

        <div className="shorts-popup__scroller" ref={scrollerRef}>
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <article
                key={item.id}
                className="shorts-popup__slide"
                data-index={index}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
              >
                {isActive ? (
                  <iframe
                    key={item.youtubeId}
                    className="shorts-popup__player"
                    src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <img
                    className="shorts-popup__player"
                    src={thumb(item.youtubeId, "hq")}
                    alt=""
                    width={540}
                    height={960}
                  />
                )}
              </article>
            );
          })}
        </div>

        <div className="shorts-popup__nav">
          <button
            type="button"
            className="shorts-popup__nav-btn"
            disabled={active <= 0}
            onClick={() => scrollToIndex(active - 1)}
            aria-label="अघिल्लो रिल"
          >
            <Icon name="chevron-up" size={18} />
          </button>
          <button
            type="button"
            className="shorts-popup__nav-btn"
            disabled={active >= items.length - 1}
            onClick={() => scrollToIndex(active + 1)}
            aria-label="अर्को रिल"
          >
            <Icon name="chevron-down" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Youtube({ data }: YoutubeProps) {
  const { shortsOpen, closeShorts } = useUi();
  const videos = data.videos.slice(0, 4);
  const featuredFromData =
    videos.find((v) => v.id === data.featuredId) ?? videos[0];
  const [activeId, setActiveId] = useState(featuredFromData?.id ?? "");
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [shortIndex, setShortIndex] = useState<number | null>(null);

  const shorts = data.shorts.slice(0, 4);

  useEffect(() => {
    if (!shortsOpen || !shorts.length) return;
    setShortIndex(0);
  }, [shortsOpen, shorts.length]);

  const closeShortsPopup = () => {
    setShortIndex(null);
    closeShorts();
  };

  if (!videos.length) return null;

  const featured = videos.find((v) => v.id === activeId) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured.id);

  const openVideo = (id: string) => {
    setActiveId(id);
    setVideoPopupOpen(true);
  };

  return (
    <section className="yt-block container" id="youtube" aria-label="युट्युब र रिल्स">
      <div className="yt-block__layout">
        <div className="yt-block__col">
          <SectionTitle href={data.channelUrl ?? "https://www.youtube.com"}>
            <span id="youtube-title">रोजगार टिभी</span>
          </SectionTitle>
          <Reveal className="yt-block__main reveal">
            <article className="yt-block__feature">
              <WatchEmbed
                video={featured}
                onPlay={() => openVideo(featured.id)}
              />
            </article>

            {rest.length ? (
              <div className="yt-block__side-list" role="list">
                {rest.map((video) => (
                  <div key={video.id} role="listitem">
                    <SideVideo
                      video={video}
                      active={false}
                      onSelect={() => openVideo(video.id)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>

        <div className="yt-block__col">
          <SectionTitle
            href={
              data.channelUrl
                ? `${data.channelUrl}/shorts`
                : "https://www.youtube.com/shorts"
            }
          >
            <span id="reels-title">रिल्स</span>
          </SectionTitle>
          <Reveal className="yt-block__shorts reveal reveal-delay-1">
            <div className="yt-block__shorts-rail" role="list">
              {shorts.map((item, index) => (
                <div key={item.id} role="listitem">
                  <ShortCard item={item} onOpen={() => setShortIndex(index)} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {videoPopupOpen ? (
        <VideoPopup
          videos={videos}
          activeId={activeId}
          onSelect={setActiveId}
          onClose={() => setVideoPopupOpen(false)}
        />
      ) : null}

      {shortIndex !== null && shorts.length ? (
        <ShortsPopup
          items={shorts}
          startIndex={shortIndex}
          onClose={closeShortsPopup}
        />
      ) : null}
    </section>
  );
}
