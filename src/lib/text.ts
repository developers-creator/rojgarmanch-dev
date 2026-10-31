const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  ndash: "–",
  mdash: "—",
  hellip: "…",
};

/** Decode HTML entities the CMS leaves in plain-text fields (e.g. `&#8216;`). */
export function decodeEntities(text: string): string {
  return text.replace(/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi, (match, dec, hex, name) => {
    if (dec || hex) {
      const code = dec ? parseInt(dec, 10) : parseInt(hex, 16);
      return code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED[name.toLowerCase()] ?? match;
  });
}

/**
 * The excerpt an editor actually wrote, or "" when the CMS auto-trimmed one from
 * the body (WordPress ends those with a `[&hellip;]` / `[…]` marker).
 */
export function editorExcerpt(text: string | null | undefined): string {
  if (!text) return "";
  const decoded = decodeEntities(text).trim();
  return /\[\s*(?:…|\.{3})\s*\]$/.test(decoded) ? "" : decoded;
}

/** Decode an excerpt and drop the WordPress "read more" marker (`[&hellip;]` / `[…]`). */
export function cleanExcerpt(text: string): string {
  return decodeEntities(text)
    .replace(/\s*\[\s*(?:…|\.{3})\s*\]\s*$/, "")
    .trim();
}
