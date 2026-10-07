export interface SeoRobots {
  index: string;
  follow: string;
  "max-snippet"?: string;
  "max-image-preview"?: string;
  "max-video-preview"?: string;
}

export interface SeoImage {
  width?: number;
  height?: number;
  url: string;
  type?: string;
}

export interface Seo {
  title: string;
  description: string;
  robots: SeoRobots;
  canonical: string;
  og_title: string;
  og_description: string;
  og_type: string;
  og_url: string;
  og_image: SeoImage[];
  og_locale: string;
  og_site_name: string;
  twitter_card: string;
  article_published_time: string | null;
  article_modified_time: string | null;
  /** schema.org JSON-LD document (`@graph`); its URLs point at the CMS host. */
  schema: Record<string, unknown> | null;
}

export interface SeoResponse {
  success: boolean;
  message: string;
  data: Seo;
}
