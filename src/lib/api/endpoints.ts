import type { BannerNewsData } from "@/types/bannerNews";
import { cache } from "react";
import type { Settings, SettingsData } from "@/types/settings";
import { apiFetch } from "./client";
import type { NewsDetailData, NewsCategoryData, SearchData, TrendingData, WebstoryData, PublicationData, PublicationDetailData } from "@/types/news";
import type { ContactData } from "@/types/contact";
import type { MenuData } from "@/types/menu";
import type { AdsData } from "@/types/ads";
import type { TeamPageResponse } from "@/types/team";
import type { SeoResponse } from "@/types/seo";
import type { AboutPageResponse, DefaultPageResponse } from "@/types/page";
import type { SitemapResponse } from "@/types/sitemap";
import type { AuthorPostsData } from "@/types/author";

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
  kala: "/category/art?per_page=4",
  sahitya: "/category/literature?per_page=4",
  opinion: "/category/opinion?per_page=6",
  ramailoSansar: "/category/fun-world?per_page=4",
  world: "/category/world?per_page=4",
  englishHeadline: "/category/english-headline?per_page=4",
  headerMenu: "/menu/menu-1",
  footerMenu: "/menu/footer-menu",
  additionalMenu: "/menu/additional-menu",
  search: "/search",
  trending: "/trending",
  ads: "/ads",
  team: "/page/team",
  about: "/page/about",
  privacyPolicy: "/page/privacy-policy",
  termsAndConditions: "/page/terms-of-use",
  sitemap: "/sitemap",
} as const;

// Response types are `unknown` until the payloads are typed.
export const getSettings = () => apiFetch<SettingsData>(ENDPOINTS.settings);

// Banner News
export const getBannerNews = () =>
  apiFetch<BannerNewsData>(ENDPOINTS.bannerNews);

// Contact
export const getContact = () => apiFetch<ContactData>(ENDPOINTS.contact);

// Single news article — `slug` is the CMS slug as-is, e.g. "news/2026/09/112895"
// `cache` shares one fetch between generateMetadata and the page.
export const getNews = cache((slug: string) =>
  apiFetch<NewsDetailData>(`/${slug}`),
);

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
export const CATEGORY_PER_PAGE = 25;

export const getCategoryPosts = (slug: string, page = 1) =>
  apiFetch<NewsCategoryData>(
    `/category/${encodeURIComponent(slug)}?per_page=${CATEGORY_PER_PAGE}&page=${page}`,
  );

// Author archive, paginated — `slug` is the CMS author slug, e.g. "rojgar-manch"
export const AUTHOR_PER_PAGE = 25;

export const getAuthorPosts = (slug: string, page = 1) =>
  apiFetch<AuthorPostsData>(
    `/author/${encodeURIComponent(slug)}?per_page=${AUTHOR_PER_PAGE}&page=${page}`,
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

// kala
export const getKala = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.kala);

// sahitya
export const getSahitya = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.sahitya);

// opinion
export const getOpinion = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.opinion);

// ramailoSansar
export const getRamailoSansar = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.ramailoSansar);

// world
export const getWorld = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.world);

// englishHeadline
export const getEnglishHeadline = () =>
  apiFetch<NewsCategoryData>(ENDPOINTS.englishHeadline);

// headerMenu
export const getHeaderMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.headerMenu);

// footerMenu
export const getFooterMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.footerMenu);

// additionalMenu
export const getAdditionalMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.additionalMenu);

// ads
// `cache` dedupes the several calls made while rendering one page.
export const getAds = cache(() => apiFetch<AdsData>(ENDPOINTS.ads));

// team
export const getTeam = () =>
  apiFetch<TeamPageResponse>(ENDPOINTS.team);

// about
export const getAbout = () =>
  apiFetch<AboutPageResponse>(ENDPOINTS.about);

// privacy-policy
export const getPrivacyPolicy = () =>
  apiFetch<DefaultPageResponse>(ENDPOINTS.privacyPolicy);

// terms of use
export const getTermsOfUse = () =>
  apiFetch<DefaultPageResponse>(ENDPOINTS.termsAndConditions);

// SEO — `path` is the page's path on the CMS (e.g. "about", "category/news").
export const getSeo = (path: string) =>
  apiFetch<SeoResponse>(`/seo?path=${encodeURIComponent(path)}`);

// Sitemap
export const getSitemap = () =>
  apiFetch<SitemapResponse>(ENDPOINTS.sitemap);

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

// Search — results are not cached long since queries are arbitrary.
export const searchNews = (q: string, page = 1, perPage = 10) =>
  apiFetch<SearchData>(
    `${ENDPOINTS.search}?q=${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`,
    { revalidate: 60 },
  );

// Trending (popular) news
export const getTrending = () => apiFetch<TrendingData>(ENDPOINTS.trending);
