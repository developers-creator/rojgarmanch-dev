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
  before_main_title: AdImage;
  before_main_title_link: string;
  before_related_news_ad: AdImage;
  before_related_news_ad_link: string;
  before_additional_news_first_ad: AdImage;
  before_additional_news_first_ad_link: string;
  before_additional_news_second_ad: AdImage;
  before_additional_news_second_ad_link: string;
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
  before_samachar: UploadedAd | false;
  before_news_insert_url: string;
  below_news_ad: UploadedAd | false;
  below_news_insert_url: string;
  below_artha_ra_rojgar_ad: UploadedAd | false;
  below_artha_ra_rojgar_ad_url: string;
  below_rojgar_tv_ad: UploadedAd | false;
  below_rojgar_tv_ad_url: string;
  below_business_ad: UploadedAd | false;
  below_business_ad_url: string;
  below_nrn: UploadedAd | false;
  below_nrn_url: string;
  below_webstories: UploadedAd | false;
  below_webstories_ad_url: string;
  below_interview_ad: UploadedAd | false;
  below_interview_ad_url: string;
  below_sports_news_ad: UploadedAd | false;
  below_sports_news_ad_url: string;
  below_kala_sahitya_ad: UploadedAd | false;
  below_kala_sahitya_ad_url: string;
  below_blog_and_opinions_ad: UploadedAd | false;
  below_blog_and_opinions_ad_url: string;
  above_footer_ad: UploadedAd | false;
  above_footer_ad_url: string;
};

export type JobAd = {
  job_image: string;
  job_link: string;
};

export type JobsAds = {
  jobs: JobAd[];
};

export type WebPopupAd = {
  web: AdImage;
  web_link: string;
};

export type MobilePopupAd = {
  mobile: AdImage;
  mobile_link: string;
};

export type PopupAds = {
  wen_popup_ads: WebPopupAd[];
  mobile_popup_ads: MobilePopupAd[];
  show_popup_on_homepage_only: boolean;
  /** When true, no popup is shown anywhere. */
  hide_popup_entirely: boolean;
};

export type CategoryAds = {
  cat_ad_image: UploadedAd | false;
  cat_ad_url: string;
};

export type Ads = {
  sidebar_ads: SidebarAds;
  header_ads: HeaderAds;
  long_ads: LongAds;
  jobs_ads: JobsAds;
  popup_ads: PopupAds;
  category_ads: CategoryAds;
};

export type AdsData = {
  success: boolean;
  message: string;
  data: Ads;
};
