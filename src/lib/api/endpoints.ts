import type { BannerNewsData } from "@/types/bannerNews";
import { cache } from "react";
import type { Settings, SettingsData } from "@/types/settings";
import { apiFetch } from "./client";
import type { NewsDetailData, NewsCategoryData, MainNewsData, SearchData, TrendingData, WebstoryData, PublicationData, PublicationDetailData } from "@/types/news";
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
  mainNews: "/main-news?per_page=9",
  latestNews: "/latest-news?page=1&per_page=9",
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

// Posts and ads are refreshed on demand. Keep listing tags scoped to the data
// each endpoint returns so a post does not expire unrelated homepage sections.
export const CACHE_TAGS = {
  bannerNews: "home-banner-news",
  mainNews: "home-main-news",
  latestNews: "home-latest-news",
  trending: "trending",
  headerMenu: "header-menu",
  footerMenu: "footer-menu",
  additionalMenu: "additional-menu",
} as const;
export const ADS_TAG = "ads";
export const SITEMAP_TAG = "sitemap";
export const SETTINGS_TAG = "settings";
export const articleTag = (slug: string) => `article:${slug}`;
export const categoryTag = (slug: string) => `category:${slug}`;
export const authorTag = (slug: string) => `author:${slug}`;

// Webhooks provide freshness for listings; daily revalidation is a safety net.
const LISTING_REVALIDATE = 86400;
const listingOptions = (tag: string) => ({
  revalidate: LISTING_REVALIDATE,
  tags: [tag],
});
const pagedListingOptions = (page: number, tag: string) =>
  page > 1 ? { revalidate: LISTING_REVALIDATE } : listingOptions(tag);
// `false` = cached until the webhook expires the tag (no timer-driven rewrites).
export const MENU_TAGS = [
  CACHE_TAGS.headerMenu,
  CACHE_TAGS.footerMenu,
  CACHE_TAGS.additionalMenu,
] as const;
const ADS_OPTIONS = { revalidate: false as const, tags: [ADS_TAG] };
// Site settings feed the root layout, so their lifetime caps every page's ISR
// lifetime. They almost never change: a week is the safety net, and the tag
// lets them be expired on demand with `revalidateTag(SETTINGS_TAG)`.
const LONG_REVALIDATE = 604800;
const SITE_CONFIG_OPTIONS = { revalidate: LONG_REVALIDATE, tags: [SETTINGS_TAG] };
// Static pages (about, team, contact, legal) and SEO rarely change.
const STATIC_PAGE_OPTIONS = { revalidate: 86400 };
const SITEMAP_OPTIONS = { revalidate: 86400, tags: [SITEMAP_TAG] };
// Magazine issues are published rarely and aren't covered by the post webhook.
const PUBLICATION_OPTIONS = { revalidate: 86400 };
const MENU_OPTIONS = {
  header: { revalidate: false as const, tags: [CACHE_TAGS.headerMenu] },
  footer: { revalidate: false as const, tags: [CACHE_TAGS.footerMenu] },
  additional: { revalidate: false as const, tags: [CACHE_TAGS.additionalMenu] },
};

// Response types are `unknown` until the payloads are typed.
export const getSettings = () =>
  apiFetch<SettingsData>(ENDPOINTS.settings, SITE_CONFIG_OPTIONS);


// Banner News
export const getBannerNews = () =>
  apiFetch<BannerNewsData>(
    ENDPOINTS.bannerNews,
    listingOptions(CACHE_TAGS.bannerNews),
  );

// Contact
export const getContact = () =>
  apiFetch<ContactData>(ENDPOINTS.contact, STATIC_PAGE_OPTIONS);

// Single news article — `slug` is the CMS slug as-is, e.g. "news/2026/09/112895"
// `cache` shares one fetch between generateMetadata and the page.
export const getNews = cache((slug: string) =>
  apiFetch<NewsDetailData>(`/${slug}`, {
    revalidate: false,
    tags: [articleTag(slug)],
  }),
);

// News category listing
export const getNewsCategories = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.news,
    listingOptions(categoryTag("news")),
  );

// Homepage समाचार — mixed main news, not the news category.
export const getMainNews = () =>
  apiFetch<MainNewsData>(
    ENDPOINTS.mainNews,
    listingOptions(CACHE_TAGS.mainNews),
  );

// Artha-rojgar category listing
export const getArthaRojgarCategories = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.arthaRojgar,
    listingOptions(categoryTag("employment")),
  );

// Career playbook category listing
export const getCareerPlaybookCategories = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.careerPlaybook,
    listingOptions(categoryTag("career-playbook")),
  );

// Employment category listing
export const getEmploymentCategories = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.employment,
    listingOptions(categoryTag("employment")),
  );

// Any category listing, paginated — `slug` is the CMS category slug, e.g. "employment"
export const CATEGORY_PER_PAGE = 25;

export const getCategoryPosts = (slug: string, page = 1) =>
  apiFetch<NewsCategoryData>(
    `/category/${encodeURIComponent(slug)}?per_page=${CATEGORY_PER_PAGE}&page=${page}`,
    pagedListingOptions(page, categoryTag(slug)),
  );

// Author archive, paginated — `slug` is the CMS author slug, e.g. "rojgar-manch"
export const AUTHOR_PER_PAGE = 25;

export const getAuthorPosts = (slug: string, page = 1) =>
  apiFetch<AuthorPostsData>(
    `/author/${encodeURIComponent(slug)}?per_page=${AUTHOR_PER_PAGE}&page=${page}`,
    pagedListingOptions(page, authorTag(slug)),
  );

// Publication
export const getPublication = () =>
  apiFetch<PublicationData>(ENDPOINTS.publication, PUBLICATION_OPTIONS);

// Single publication — `slug` is the bare slug, e.g. "year-16-issue-1-2083-shrawan-issue"
export const getPublicationDetail = (slug: string) =>
  apiFetch<PublicationDetailData>(
    `/magazine/${encodeURIComponent(slug)}`,
    STATIC_PAGE_OPTIONS,
  );

// Publications
export const PUBLICATIONS_PER_PAGE = 12;

export const getPublications = (page = 1) =>
  apiFetch<PublicationData>(
    `/magazine?per_page=${PUBLICATIONS_PER_PAGE}&page=${page}`,
    PUBLICATION_OPTIONS,
  );

// Rojgar TV
export const getRojgarTV = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.rojgartv,
    listingOptions(categoryTag("rojgar-tv")),
  );

// Reels
export const getReels = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.reels,
    listingOptions(categoryTag("reels")),
  );

// Business
export const getBusiness = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.business,
    listingOptions(categoryTag("business")),
  );

// NRn
export const getNRN = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.nrn,
    listingOptions(categoryTag("nrn")),
  );

// Pravas
export const getPravas = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.pravas,
    listingOptions(categoryTag("abroad")),
  );

// Webstories
export const getWebstories = () =>
  apiFetch<WebstoryData>(
    ENDPOINTS.webstories,
    listingOptions(categoryTag("webstories")),
  );

// interview
export const getInterview = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.interview,
    listingOptions(categoryTag("interview")),
  );

// feature
export const getFeature = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.feature,
    listingOptions(categoryTag("feature")),
  );

// sports
export const getSports = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.sports,
    listingOptions(categoryTag("sport")),
  );

// travel
export const getTravel = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.travel,
    listingOptions(categoryTag("tourism")),
  );

// kala
export const getKala = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.kala,
    listingOptions(categoryTag("art")),
  );

// sahitya
export const getSahitya = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.sahitya,
    listingOptions(categoryTag("literature")),
  );

// opinion
export const getOpinion = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.opinion,
    listingOptions(categoryTag("opinion")),
  );

// ramailoSansar
export const getRamailoSansar = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.ramailoSansar,
    listingOptions(categoryTag("fun-world")),
  );

// world
export const getWorld = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.world,
    listingOptions(categoryTag("world")),
  );

// englishHeadline
export const getEnglishHeadline = () =>
  apiFetch<NewsCategoryData>(
    ENDPOINTS.englishHeadline,
    listingOptions(categoryTag("english-headline")),
  );

// headerMenu
export const getHeaderMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.headerMenu, MENU_OPTIONS.header);

// footerMenu
export const getFooterMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.footerMenu, MENU_OPTIONS.footer);

// additionalMenu
export const getAdditionalMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.additionalMenu, MENU_OPTIONS.additional);

// ads
// `cache` dedupes the several calls made while rendering one page.
export const getAds = cache(() =>
  apiFetch<AdsData>(ENDPOINTS.ads, ADS_OPTIONS),
);

// team
export const getTeam = () =>
  apiFetch<TeamPageResponse>(ENDPOINTS.team, STATIC_PAGE_OPTIONS);

// about
export const getAbout = () =>
  apiFetch<AboutPageResponse>(ENDPOINTS.about, STATIC_PAGE_OPTIONS);

// privacy-policy
export const getPrivacyPolicy = () =>
  apiFetch<DefaultPageResponse>(ENDPOINTS.privacyPolicy, STATIC_PAGE_OPTIONS);

// terms of use
export const getTermsOfUse = () =>
  apiFetch<DefaultPageResponse>(ENDPOINTS.termsAndConditions, STATIC_PAGE_OPTIONS);

// SEO — `path` is the page's path on the CMS (e.g. "about", "category/news").
// An article's SEO changes only when the post does, and the post webhook already
// expires `article:<slug>`, so it needs no timer. Other pages (home, categories,
// static pages) have no webhook and get the long safety-net lifetime instead.
const ARTICLE_SEO_PATH = /^[a-z0-9-]+\/\d{4}\/\d{2}\/\d+$/;

export const getSeo = (path: string) => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return apiFetch<SeoResponse>(`/seo?path=${encodeURIComponent(path)}`, {
    revalidate: ARTICLE_SEO_PATH.test(clean) ? false : LONG_REVALIDATE,
    // Lets an edited article refresh its SEO along with its body.
    tags: [articleTag(clean)],
  });
};

// Sitemap
export const getSitemap = () =>
  apiFetch<SitemapResponse>(ENDPOINTS.sitemap, SITEMAP_OPTIONS);

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

// Search — results are not cached long since queries are arbitrary. The query is
// normalised first so "  Job  ", "Job" and "Job " share one cache entry, and its
// length is capped so junk queries can't create ever-larger entries.
const SEARCH_QUERY_MAX = 100;
export const searchNews = (q: string, page = 1, perPage = 10) => {
  const query = q.replace(/\s+/g, " ").trim().slice(0, SEARCH_QUERY_MAX);
  return apiFetch<SearchData>(
    `${ENDPOINTS.search}?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    // Arbitrary queries would each write a cache entry; hit the CMS directly instead.
    { revalidate: 0 },
  );
};

// Trending is independent of post listing invalidation and refreshes every 30 minutes.
export const getTrending = () =>
  apiFetch<TrendingData>(ENDPOINTS.trending, {
    revalidate: 1800,
    tags: [CACHE_TAGS.trending],
  });
