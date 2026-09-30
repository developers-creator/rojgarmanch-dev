/** Temporary Unsplash helper — replace with WordPress media URLs. */
export function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
}
