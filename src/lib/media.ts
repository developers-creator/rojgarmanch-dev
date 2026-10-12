/** Temporary Unsplash helper — replace with WordPress media URLs. */
export function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
}

/** The CMS sends a 150px thumbnail URL; drop the "-150x100" suffix for the original. */
export const fullSizeUrl = (url: string) => url.replace(/-\d+x\d+(?=\.\w+$)/, "");

/** SVG is blocked by the optimizer; GIF would be flattened to a still frame. */
export function unoptimizedImage(src: string) {
  return /\.(?:svg|gif)(?:$|[?#])/i.test(src);
}
