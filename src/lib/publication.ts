/** List endpoint returns a full CMS URL as `slug`; the detail route needs just its last segment. */
export function publicationSlug(cmsUrl: string): string {
  const last = cmsUrl.split("/").filter(Boolean).pop() ?? "";
  try {
    return decodeURIComponent(last);
  } catch {
    return last;
  }
}
