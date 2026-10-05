import type { BannerNewsData } from "@/types/bannerNews";
import type { Settings, SettingsData } from "@/types/settings";
import { apiFetch } from "./client";
import type { NewsDetailData, NewsCategoryData, WebstoryData, PublicationData, PublicationDetailData } from "@/types/news";
import type { ContactData } from "@/types/contact";

// Add new endpoints here: one line for the path, one function to fetch it.
export const ENDPOINTS = {
  settings: "/settings",
  bannerNews: "/banner-news",
  contact: "/page/contact",
  news: "/category/news?per_page=9",
  careerPlaybook: "/category/career-playbook?per_page=5",
  arthaRojgar: "/category/employment?per_page=5",
  employment: "/category/employment?per_page=6",
  publication: "/magazine?per_page=1",
  rojgartv: "/category/rojgar-tv?per_page=4",
  reels: "/category/reels?per_page=4",
  business: "/category/business?per_page=7",
  nrn: "/category/nrn?per_page=4",
  pravas: "/category/abroad?per_page=4",
  webstories: "/category/webstories?per_page=5",
  interview: "/category/interview?per_page=4",
  feature: "/category/feature?per_page=3",
  sports: "/category/sport?per_page=3",
  travel: "/category/tourism?per_page=3",
} as const;

// Response types are `unknown` until the payloads are typed.
export const getSettings = () => apiFetch<SettingsData>(ENDPOINTS.settings);

// Banner News
export const getBannerNews = () =>
  apiFetch<BannerNewsData>(ENDPOINTS.bannerNews);

// Contact
export const getContact = () => apiFetch<ContactData>(ENDPOINTS.contact);

// Single news article — `slug` is the CMS slug as-is, e.g. "news/2026/09/112895"
export const getNews = (slug: string) =>
  apiFetch<NewsDetailData>(`/${slug}`);

// News category listing
export const getNewsCategories = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.news);

// Artha-rojgar category listing
export const getArthaRojgarCategories = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.arthaRojgar);

// Career playbook category listing
export const getCareerPlaybookCategories = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.careerPlaybook);

// Employment category listing
export const getEmploymentCategories = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.employment);

// Any category listing, paginated — `slug` is the CMS category slug, e.g. "employment"
export const CATEGORY_PER_PAGE = 7;

export const getCategoryPosts = (slug: string, page = 1) =>
  apiFetch<NewsCategoryData>(
    `/category/${encodeURIComponent(slug)}?per_page=${CATEGORY_PER_PAGE}&page=${page}`,
  );

// Publication
export const getPublication = () =>
  apiFetch<PublicationData>(ENDPOINTS.publication);

// Single publication — `slug` is the bare slug, e.g. "year-16-issue-1-2083-shrawan-issue"
export const getPublicationDetail = (slug: string) =>
  apiFetch<PublicationDetailData>(`/magazine/${encodeURIComponent(slug)}`);

// Publications
export const PUBLICATIONS_PER_PAGE = 12;

export const getPublications = (page = 1) =>
  apiFetch<PublicationData>(
    `/magazine?per_page=${PUBLICATIONS_PER_PAGE}&page=${page}`,
  );

// Rojgar TV
export const getRojgarTV = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.rojgartv);

// Reels
export const getReels = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.reels);

// Business
export const getBusiness = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.business);

// NRn
export const getNRN = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.nrn);

// Pravas
export const getPravas = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.pravas);

// Webstories
export const getWebstories = () =>
  apiFetch<WebstoryData>(ENDPOINTS.webstories);

// interview
export const getInterview = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.interview);

// feature
export const getFeature = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.feature);

// sports
export const getSports = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.sports);

// travel
export const getTravel = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.travel);

const EMPTY_SETTINGS: Settings = {
  site_title: "",
  dark_logo: "",
  white_logo: "",
  location: "",
  email: "",
  phone: "",
  mobile: "",
  chief_administrator: "",
  advisory_editor: "",
  editor: "",
  assistant_editor: "",
  columnists: "",
  correspondents: "",
  rojgar_insert_map_url: "",
  insert_iframe_url: "",
  darta_no: "",
  social_handles: [],
};

// Don't fail the build if the CMS is unreachable (e.g. it blocks the build
// server); pages revalidate and pick up the real settings later.
export const getSettingsOrEmpty = () =>
  getSettings()
    .then((res) => res.data)
    .catch(() => EMPTY_SETTINGS);
