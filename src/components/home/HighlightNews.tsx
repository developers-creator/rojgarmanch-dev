/** मुख्य समाचार — Highlight news */
import type { HighlightStory } from "@/types/content";
import { ADS } from "@/lib/ads";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";

type HighlightNewsProps = {
  story: HighlightStory;
  more?: HighlightStory[];
};

const HIGHLIGHT_ADS = [ADS.ncell, ADS.worldlink, ADS.hardik] as const;

function HighlightItem({
  story,
  headingId,
  showImage = true,
  priority = false,
}: {
  story: HighlightStory;
  headingId?: string;
  showImage?: boolean;
  priority?: boolean;
}) {
  return (
    <div className="highlight__content">
      {story.category ? (
        <span className="highlight__badge">{story.category}</span>
      ) : null}

      <h2 className="highlight__title" id={headingId}>
        <Link href={story.href}>{story.title}</Link>
      </h2>

      <div className="highlight__meta">
        {story.authorAvatar ? (
          <img
            className="highlight__avatar"
            src={story.authorAvatar}
            alt=""
            width={28}
            height={28}
            decoding="async"
            loading={priority ? "eager" : "lazy"}
          />
        ) : null}
        {story.author ? (
          <span className="highlight__author">{story.author}</span>
        ) : null}
      </div>

      {showImage && story.imageUrl ? (
        <Link className="highlight__media" href={story.href}>
          <img
            className="img-cover"
            src={story.imageUrl}
            alt={story.imageAlt || story.title}
            width={960}
            height={540}
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </Link>
      ) : null}

      {story.excerpt ? (
        <p className="highlight__excerpt">{story.excerpt}</p>
      ) : null}
    </div>
  );
}

export function HighlightNews({ story, more = [] }: HighlightNewsProps) {
  const items: {
    story: HighlightStory;
    showImage: boolean;
    headingId?: string;
    priority?: boolean;
  }[] = [
    { story, showImage: true, headingId: "highlight-title", priority: true },
    ...more.slice(0, 2).map((item) => ({
      story: item,
      showImage: false,
    })),
  ];

  return (
    <section
      className="highlight"
      id="highlight"
      aria-labelledby="highlight-title"
    >
      {items.map((item, index) => (
        <div key={item.story.id} className="highlight__block">
          <div className="container">
            <div className="highlight__inner">
              <HighlightItem
                story={item.story}
                headingId={item.headingId}
                showImage={item.showImage}
                priority={item.priority}
              />
            </div>
          </div>
          <div className="ad-band">
            <div className="container">
              <AdUnit
                ad={HIGHLIGHT_ADS[index % HIGHLIGHT_ADS.length]}
                variant="banner"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
