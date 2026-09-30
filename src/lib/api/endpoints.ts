import type { BannerNewsData } from "@/types/bannerNews";
import type { SettingsData } from "@/types/settings";
import { apiFetch } from "./client";
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