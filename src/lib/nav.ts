/** Site navigation — each item (except गृह) is a category archive. */
export const NAV_LINKS = [
  { href: "/", slug: "home", labelNe: "गृह", labelEn: "Home" },
  {
    href: "/samachar",
    slug: "samachar",
    labelNe: "समाचार",
    labelEn: "News",
  },
  {
    href: "/rojgar",
    slug: "rojgar",
    labelNe: "रोजगार",
    labelEn: "Jobs",
  },
  {
    href: "/antarwarta",
    slug: "antarwarta",
    labelNe: "अन्तर्वार्ता",
    labelEn: "Interview",
  },
  {
    href: "/business",
    slug: "business",
    labelNe: "बिजनेस",
    labelEn: "Business",
  },
  { href: "/nrn", slug: "nrn", labelNe: "एनआरएन", labelEn: "NRN" },
  {
    href: "/pravas",
    slug: "pravas",
    labelNe: "प्रवास",
    labelEn: "Diaspora",
  },
  {
    href: "/artha-rojgar",
    slug: "artha-rojgar",
    labelNe: "अर्थ र रोजगार",
    labelEn: "Economy & Jobs",
  },
  {
    href: "/vichar",
    slug: "vichar",
    labelNe: "ब्लग / विचार",
    labelEn: "Blog / Opinion",
  },
  {
    href: "/feature",
    slug: "feature",
    labelNe: "फिचर",
    labelEn: "Feature",
  },
  { href: "/kala", slug: "kala", labelNe: "कला", labelEn: "Arts" },
  {
    href: "/sahitya",
    slug: "sahitya",
    labelNe: "साहित्य",
    labelEn: "Literature",
  },
  { href: "/khel", slug: "khel", labelNe: "खेल", labelEn: "Sports" },
  {
    href: "/paryatan",
    slug: "paryatan",
    labelNe: "पर्यटन",
    labelEn: "Tourism",
  },
  {
    href: "/ramailo-sansar",
    slug: "ramailo-sansar",
    labelNe: "रमाइलो संसार",
    labelEn: "Fun World",
  },
  {
    href: "/desh-samaj",
    slug: "desh-samaj",
    labelNe: "देश/समाज",
    labelEn: "Society",
  },
  {
    href: "/bishwa",
    slug: "bishwa",
    labelNe: "विश्व",
    labelEn: "World",
  },
  {
    href: "/english-headline",
    slug: "english-headline",
    labelNe: "English Headline",
    labelEn: "English Headline",
  },
  { href: "/tv", slug: "tv", labelNe: "टि. भी.", labelEn: "TV" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
export type CategorySlug = Exclude<NavLink["slug"], "home">;

const NAV_BAR_SLUGS = [
  "home",
  "samachar",
  "rojgar",
  "antarwarta",
  "business",
  "nrn",
  "pravas",
  "artha-rojgar",
  "feature",
  "kala",
  "khel",
  "tv",
] as const;

const barSlugSet = new Set<string>(NAV_BAR_SLUGS);

export function getNavBarLinks() {
  return NAV_BAR_SLUGS.map(
    (slug) => NAV_LINKS.find((link) => link.slug === slug)!,
  );
}

export function getNavMoreLinks() {
  return NAV_LINKS.filter((link) => !barSlugSet.has(link.slug));
}

export function getNavCategories() {
  return NAV_LINKS.filter((link) => link.slug !== "home");
}
