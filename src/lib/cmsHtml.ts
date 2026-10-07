/**
 * The CMS content carries wrapper markup from the old site (an `nnb-carousel`
 * intro block, a nested `.article-body`). Those wrappers need the old site's
 * CSS/JS and collide with our own `.article-body`, so we drop the wrapper tags
 * and keep their children as plain top-level paragraphs.
 */
const UNWRAP_CLASS = /\b(nnb-carousel|carousel(__\w+)?|article-body)\b/;
const VOID = new Set(["img", "br", "hr", "input", "meta", "link", "source"]);

export function unwrapCmsWrappers(html: string): string {
  const tag = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  // One entry per open element: true when its tags are being removed.
  const stack: boolean[] = [];
  let out = "";
  let last = 0;

  for (const m of html.matchAll(tag)) {
    const [full, closing, rawName, attrs, selfClose] = m;
    const name = rawName.toLowerCase();
    out += html.slice(last, m.index);
    last = m.index + full.length;

    if (VOID.has(name) || selfClose) {
      out += full;
    } else if (closing) {
      out += stack.pop() ? "" : full;
    } else {
      const cls = /class\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1] ?? "";
      const unwrap =
        UNWRAP_CLASS.test(cls) || (name === "section" && /\bsection\b/.test(cls));
      stack.push(unwrap);
      out += unwrap ? "" : full;
    }
  }
  return out + html.slice(last);
}

/**
 * CMS bodies often carry <img> tags with no alt (or an empty one). Fill those
 * with `fallback` (the page title, then the site title) so every image has text.
 */
export function fillImgAlt(html: string, fallback: string): string {
  if (!fallback) return html;
  const safe = fallback.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const alt = /\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(tag);
    if (!alt) return tag.replace(/<img\b/i, `<img alt="${safe}"`);
    if ((alt[1] ?? alt[2] ?? "").trim()) return tag;
    return tag.replace(alt[0], `alt="${safe}"`);
  });
}
