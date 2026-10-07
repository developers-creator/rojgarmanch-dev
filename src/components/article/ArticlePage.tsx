import { Fragment } from "react";
import type { Article, ArticleBlock } from "@/data/articles";
import { ARTICLE_INLINE_ADS } from "@/lib/ads";
import {
  ArticleFontControls,
  ArticleFontProvider,
  ArticleBody,
} from "./ArticleFontSize";
import {
  ArticleAiSummary,
  type AiSummaryItem,
} from "./ArticleAiSummary";
import { ArticleHeroImage } from "./ArticleHeroImage";
import { ArticleStickyTitle } from "./ArticleStickyTitle";
import { ArticleAuthorShare } from "./ArticleAuthorShare";
import { ArticleInlineAds } from "./ArticleInlineAds";
import { ArticleMetaRail } from "./ArticleMetaRail";
import { ArticleRichText } from "./ArticleRichText";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CmsImageAd } from "@/components/ui/CmsImageAd";
import type { SidebarAds } from "@/types/ads";
import { fillImgAlt } from "@/lib/cmsHtml";
import Link from "next/link";

type ArticlePageProps = {
  article: Article;
  ads?: SidebarAds | null;
  /** Site name from settings, used as the ad image alt text. */
  siteName: string;
};

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/** Insert a 3-up ad break after the 2nd paragraph, then every 4th paragraph. */
function shouldInsertInlineAd(blocks: ArticleBlock[], index: number) {
  const block = blocks[index];
  if (block.type !== "p" || index === blocks.length - 1) return false;

  const paragraphNumber = blocks
    .slice(0, index + 1)
    .filter((item) => item.type === "p").length;

  return paragraphNumber >= 2 && (paragraphNumber - 2) % 4 === 0;
}

function Block({ block, fallbackAlt }: { block: ArticleBlock; fallbackAlt: string }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <ArticleRichText text={block.text} />
        </p>
      );
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const Tag = block.type;
      const id = block.id || slugifyHeading(block.text);
      return (
        <Tag id={id}>
          <ArticleRichText text={block.text} />
        </Tag>
      );
    }
    case "figure":
      return (
        <figure className="article-figure">
          <img
            src={block.src}
            alt={block.alt || fallbackAlt}
            width={1100}
            height={620}
            loading="lazy"
          />
          {block.caption ? (
            <figcaption>
              <ArticleRichText text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>
              <ArticleRichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>
              <ArticleRichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className="article-steps">
          {block.items.map((item, index) => (
            <li key={item.title}>
              <h3>
                <span className="article-steps__num" aria-hidden="true">
                  {index + 1}.
                </span>{" "}
                <ArticleRichText text={item.title} />
              </h3>
              <p>
                <ArticleRichText text={item.text} />
              </p>
            </li>
          ))}
        </ol>
      );
    case "quote":
    case "blockquote":
      return (
        <blockquote className="article-quote">
          <span className="article-quote__mark" aria-hidden="true">
            “
          </span>
          <p>
            <ArticleRichText text={block.text} />
          </p>
          {block.cite ? <cite>— {block.cite}</cite> : null}
        </blockquote>
      );
    case "table":
      return (
        <figure className="article-table">
          <div className="article-table__scroll">
            <table>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col">
                      <ArticleRichText text={header} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`}>
                        <ArticleRichText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption>
              <ArticleRichText text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case "hr":
      return <hr />;
    case "html":
      return <div
          className="article-html"
          dangerouslySetInnerHTML={{ __html: fillImgAlt(block.html, fallbackAlt) }}
        />;
    default:
      return null;
  }
}

export function ArticlePage({ article, ads, siteName }: ArticlePageProps) {
  const relatedRail = article.seeAlso ?? [];
  const relatedMore = article.relatedPosts ?? [];
  const aiSummary: AiSummaryItem[] = (article.summaryPoints ?? []).map(
    (text) => ({ title: text, text }),
  );

  return (
    <main id="main" className="article-page">
      <ArticleFontProvider>
        <div className="container">
          <CmsImageAd
            src={ads?.before_main_title}
            href={ads?.before_main_title_link}
            siteName={siteName}
          />

          <header className="article-hero">
            <div className="article-hero__copy">
              <div className="article-title-sentinel" aria-hidden="true" />
              <div className="article-hero__sticky">
                <h1 id="article-title">{article.title}</h1>

                {article.deck ? (
                  <p className="article-hero__deck">{article.deck}</p>
                ) : (
                  <p className="article-hero__deck">{article.excerpt}</p>
                )}
              </div>
            </div>

            {article.imageUrl ? (
              <ArticleHeroImage
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
              />
            ) : null}
          </header>

          <div className="article-layout">
            <ArticleMetaRail
              author={article.author}
              authorAvatar={article.authorAvatar}
              dateLabel={article.dateLabel}
              dateIso={article.dateIso}
              title={article.title}
              href={article.href}
              comments={article.comments}
              shares={article.views ?? Math.max(12, (article.comments ?? 1) * 18)}
            />

            <article className="article-body" aria-labelledby="article-title">
              <ArticleStickyTitle title={article.title} />
              <ArticleAiSummary items={aiSummary} />

              {/* Body text only responds to font-size controls */}
              <ArticleBody>
                {article.body.map((block, index) => (
                  <Fragment key={`${block.type}-${index}`}>
                    <Block block={block} fallbackAlt={article.title || siteName} />
                    {shouldInsertInlineAd(article.body, index) ? (
                      <ArticleInlineAds ads={ARTICLE_INLINE_ADS} />
                    ) : null}
                  </Fragment>
                ))}
              </ArticleBody>
            </article>

            <aside className="article-rail" aria-label="यो पनि हेर्नुहोस्">
              <div className="article-rail__sticky">
              {ads?.before_additional_news_first_ad ||
              ads?.before_additional_news_second_ad ? (
                <div className="article-rail__ads">
                  <CmsImageAd
                    src={ads.before_additional_news_first_ad}
                    href={ads.before_additional_news_first_ad_link}
                    siteName={siteName}
                    width={400}
                    height={300}
                    variant="aside"
                  />
                  <CmsImageAd
                    src={ads.before_additional_news_second_ad}
                    href={ads.before_additional_news_second_ad_link}
                    siteName={siteName}
                    width={400}
                    height={300}
                    variant="aside"
                  />
                </div>
              ) : null}
                {relatedRail.length ? (
                  <div className="article-rail__block">
                    <SectionTitle more={false}>यो पनि हेर्नुहोस्</SectionTitle>
                    <ul className="article-related">
                      {relatedRail.map((item) => (
                        <li key={item.href}>
                          <Link className="article-related__item" href={item.href}>
                            {item.imageUrl ? (
                              <span className="article-related__thumb">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  width={72}
                                  height={72}
                                  loading="lazy"
                                />
                              </span>
                            ) : null}
                            <span className="article-related__title">{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                
              </div>
            </aside>
          </div>

          <CmsImageAd
            src={ads?.before_related_news_ad}
            href={ads?.before_related_news_ad_link}
            siteName={siteName}
          />

          {relatedMore.length ? (
            <section
              className="article-more"
              aria-labelledby="article-more-title"
            >
              <SectionTitle
                href={`/category/${article.categorySlug}`}
                more={Boolean(article.categorySlug)}
                moreLabel="सबै हेर्नुहोस्"
              >
                <span id="article-more-title">सम्बन्धित समाचार</span>
              </SectionTitle>

              <div className="article-more__grid">
                {relatedMore.map((item) => (
                  <article key={item.href} className="article-more__card">
                    <Link className="article-more__media" href={item.href}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          width={640}
                          height={400}
                          loading="lazy"
                        />
                      ) : null}
                    </Link>
                    <h3 className="article-more__title">
                      <Link href={item.href}>{item.title}</Link>
                    </h3>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </ArticleFontProvider>
    </main>
  );
}