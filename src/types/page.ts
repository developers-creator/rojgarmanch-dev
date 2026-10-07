export interface WhyUsDetail {
  why_title: string;
  why_short_description: string;
}

export interface AboutPagePayload {
  content: string;
  about_main_description: string;
  why_us_details: WhyUsDetail[];
}

export interface AboutPage {
  id: number;
  post_type: "page";
  slug: string;
  title: string;
  template: string;
  payload: AboutPagePayload;
}

export interface AboutPageResponse {
  success: boolean;
  message: string;
  data: AboutPage;
}

export interface DefaultPagePayload {
  title: string;
  featured_image: string | null;
  content: string;
}

export interface DefaultPage {
  id: number;
  post_type: "page";
  slug: string;
  title: string;
  template: string;
  payload: DefaultPagePayload;
}

export interface DefaultPageResponse {
  success: boolean;
  message: string;
  data: DefaultPage;
}
