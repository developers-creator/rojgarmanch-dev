/** Static ad creatives — swap src/href when CMS or ad server is wired. */
export const ADS = {
  ncell: {
    src: "/images/1100x110px_NCELL.jpg",
    alt: "Ncell विज्ञापन",
    width: 1100,
    height: 110,
    href: "#",
  },
  worldlink: {
    src: "/images/WorldLink-1100-x-100.jpg",
    alt: "WorldLink विज्ञापन",
    width: 1100,
    height: 100,
    href: "#",
  },
  hardik: {
    src: "/images/Hardik-850.100-e1724679881539.jpg",
    alt: "Hardik विज्ञापन",
    width: 1200,
    height: 146,
    href: "#",
  },
  hbl: {
    src: "/images/HBL-1.jpg",
    alt: "HBL विज्ञापन",
    width: 810,
    height: 100,
    href: "#",
  },
  belaco: {
    src: "/images/Belaco-2080.jpg",
    alt: "Belaco विज्ञापन",
    width: 1080,
    height: 1080,
    href: "#",
  },
  ime: {
    src: "/images/IME_ONLINE.jpg",
    alt: "IME विज्ञापन",
    width: 350,
    height: 200,
    href: "#",
  },
  classicTech: {
    src: "/images/Classic-Tech-450x200.jpg",
    alt: "Classic Tech विज्ञापन",
    width: 450,
    height: 200,
    href: "#",
  },
} as const;

export type AdCreative = (typeof ADS)[keyof typeof ADS];

/** Three-up square ads inserted between article paragraphs. */
export const ARTICLE_INLINE_ADS: AdCreative[] = [
  ADS.ime,
  ADS.classicTech,
  ADS.belaco,
];

/** Stacked ads below the article “यो पनि हेर्नुहोस्” rail. */
export const ARTICLE_RAIL_ADS: AdCreative[] = [ADS.belaco, ADS.ime];

/** Aside ads below करियर प्लेबुक on the homepage. */
export const CAREER_PLAYBOOK_ADS: AdCreative[] = [ADS.ime, ADS.classicTech];
