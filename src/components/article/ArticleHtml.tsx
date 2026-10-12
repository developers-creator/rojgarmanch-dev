import type { ReactNode } from "react";
import Image from "next/image";
import { fillImgAlt } from "@/lib/cmsHtml";
import { unoptimizedImage } from "@/lib/media";

const IMG_BLOCK =
  /<p>\s*(<img\b[^>]*>)\s*<\/p>|(<img\b[^>]*>)/gi;

function attr(tag: string, name: string) {
  const match = new RegExp(
    `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  ).exec(tag);
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? "";
}

function imageSrc(src: string) {
  if (src.startsWith("//")) return `https:${src}`;
  if (src.startsWith("/")) return `https://cms.rojgarmanch.com${src}`;
  return src;
}

type ArticleHtmlProps = {
  html: string;
  fallbackAlt: string;
};

/** CMS article HTML, with each embedded `<img>` rendered through `next/image`. */
export function ArticleHtml({ html, fallbackAlt }: ArticleHtmlProps) {
  const filled = fillImgAlt(html, fallbackAlt);
  if (!/<img\b/i.test(filled)) {
    return (
      <div
        className="article-html"
        dangerouslySetInnerHTML={{ __html: filled }}
      />
    );
  }

  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;

  for (const match of filled.matchAll(IMG_BLOCK)) {
    const start = match.index ?? 0;
    const before = filled.slice(last, start);
    if (before.trim()) {
      nodes.push(
        <div
          key={`t-${index}`}
          className="article-html__chunk"
          dangerouslySetInnerHTML={{ __html: before }}
        />,
      );
    }

    const tag = match[1] || match[2];
    const src = imageSrc(attr(tag, "src"));
    if (src) {
      const width = Number(attr(tag, "width")) || 1100;
      const height = Number(attr(tag, "height")) || 620;
      nodes.push(
        <Image
          key={`i-${index}`}
          className="article-html__photo"
          src={src}
          alt={attr(tag, "alt") || fallbackAlt}
          width={width}
          height={height}
          sizes="(max-width: 900px) 100vw, 760px"
          unoptimized={unoptimizedImage(src)}
          style={{ width: "100%", height: "auto" }}
        />,
      );
    }

    last = start + match[0].length;
    index += 1;
  }

  const after = filled.slice(last);
  if (after.trim()) {
    nodes.push(
      <div
        key={`t-${index}`}
        className="article-html__chunk"
        dangerouslySetInnerHTML={{ __html: after }}
      />,
    );
  }

  return <div className="article-html">{nodes}</div>;
}
