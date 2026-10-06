/** The CMS sends `false` (not null/"") when an ad slot has no image. */
export type AdImage = string | false;

export type UploadedAd = {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type TopSidebarAd = {
  top_ads: string;
  top_link: string;
};

export type BottomSidebarAd = {
  bottom_ads: string;
  bottom_link: string;
};

export type SidebarAds = {
  top_sidebar_ads: TopSidebarAd[];
  bottom_sidebar_ads: BottomSidebarAd[];
  inner_top_ad: AdImage;
  inner_top_ad_link: string;
  inner_bottom_ad: AdImage;
  inner_bottom_ad_link: string;
  below_comments_ad: AdImage;
  below_comments_ad_link: string;
  before_related_news_left_ad: AdImage;
  before_related_news_left_ad_link: string;
  before_related_news_right_ad: AdImage;
  before_related_news_right_ad_link: string;
};

export type BelowMenuHomeAd = {
  image: string;
  link: string;
};

export type HeaderAds = {
  below_menu_home_page: BelowMenuHomeAd[];
  header_ad_left: AdImage;
  header_ad_left_link: string;
  header_ad_right: AdImage;
  header_ad_right_link: string;
};

export type LongHighlightAd = {
  long_highlight_upload_ad: UploadedAd;
  long_highlight_insert_url: string;
};

export type LongAds = {
  long_ads_for_highlight_news: LongHighlightAd[];
  below_news_ad: AdImage;
  below_news_insert_url: string;
  below_artha_ra_rojgar_ad: AdImage;
  below_artha_ra_rojgar_ad_url: string;
  below_rojgar_tv_ad: AdImage;
  below_rojgar_tv_ad_url: string;
  below_business_ad: AdImage;
  below_business_ad_url: string;
  below_nrn: AdImage;
  below_nrn_url: string;
  below_webstories: AdImage;
  below_webstories_ad_url: string;
  below_interview_ad: AdImage;
  below_interview_ad_url: string;
  below_sports_news_ad: AdImage;
  below_sports_news_ad_url: string;
  below_kala_sahitya_ad: AdImage;
  below_kala_sahitya_ad_url: string;
  below_blog_and_opinions_ad: AdImage;
  below_blog_and_opinions_ad_url: string;
  above_footer_ad: AdImage;
  above_footer_ad_url: string;
};

export type JobAd = {
  job_image: string;
  job_link: string;
};

export type JobsAds = {
  jobs: JobAd[];
};

export type PopupAds = {
  web: AdImage;
  web_link: string;
  mobile: AdImage;
  mobile_link: string;
};

export type Ads = {
  sidebar_ads: SidebarAds;
  header_ads: HeaderAds;
  long_ads: LongAds;
  jobs_ads: JobsAds;
  popup_ads: PopupAds;
};

export type AdsData = {
  success: boolean;
  message: string;
  data: Ads;
};
