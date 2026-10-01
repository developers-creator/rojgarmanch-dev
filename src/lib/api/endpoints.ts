import type { BannerNewsData } from "@/types/bannerNews";
import type { Settings, SettingsData } from "@/types/settings";
import { apiFetch } from "./client";
import type { NewsDetailData } from "@/types/news";
import type { ContactData } from "@/types/contact";

// Add new endpoints here: one line for the path, one function to fetch it.
export const ENDPOINTS = {
  settings: "/settings",
  bannerNews: "/banner-news",
  contact: "/page/contact",
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
