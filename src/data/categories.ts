import type { Post } from "@/types/content";
import type { CategorySlug } from "@/lib/nav";
import { getNavCategories } from "@/lib/nav";
import { unsplash as u } from "@/lib/media";

export type CategoryInfo = {
  slug: CategorySlug;
  labelNe: string;
  labelEn: string;
  description: string;
};

const descriptions: Record<CategorySlug, string> = {
  samachar: "ताजा समाचार, घटनाक्रम र विश्लेषण — रोजगार र करियरसँग जोडिएका मुख्य खबरहरू।",
  rojgar: "जागिर अवसर, भर्ना प्रक्रिया र करियर मार्गदर्शन।",
  antarwarta: "नेता, उद्यमी र पेशेवरहरूसँगको विशेष अन्तर्वार्ता।",
  business: "बजार, उद्यम र व्यावसायिक निर्णयका कथाहरू।",
  nrn: "गैरआवासीय नेपाली समुदायका अवसर र अनुभव।",
  pravas: "वैदेशिक रोजगार, प्रवास जीवन र सुरक्षाका विषय।",
  "artha-rojgar": "अर्थतन्त्र, बजार र रोजगारका विश्लेषण।",
  vichar: "ब्लग, विचार र करियर दर्शन।",
  feature: "गहिरो फिचर र विशेष रिपोर्ट।",
  kala: "कला, संस्कृति र सिर्जनात्मक कार्य।",
  sahitya: "साहित्य, लेखन र पठन संस्कृति।",
  khel: "खेलकुद समाचार, टोली र खेलाडीका कथा।",
  paryatan: "पर्यटन, यात्रा र गन्तव्य सम्बन्धी सामग्री।",
  "ramailo-sansar": "रमाइलो संसारका कथा, मनोरञ्जन र हल्का विषय।",
  "desh-samaj": "देश र समाजका मुद्दा तथा जनजीवन।",
  bishwa: "विश्व घटना, श्रम बजार र अन्तर्राष्ट्रिय सन्दर्भ।",
  "english-headline": "Selected stories and headlines in English.",
  tv: "भिडियो श्रृंखला, पोडकास्ट र दृश्य सामग्री।",
};

export function getCategory(slug: string): CategoryInfo | null {
  const match = getNavCategories().find((item) => item.slug === slug);
  if (!match) return null;
  return {
    slug: match.slug,
    labelNe: match.labelNe,
    labelEn: match.labelEn,
    description: descriptions[match.slug],
  };
}

export function getAllCategorySlugs(): CategorySlug[] {
  return getNavCategories().map((item) => item.slug);
}

const post = (
  partial: Omit<Post, "id" | "slug" | "href"> & {
    id: number;
    slug: string;
    categorySlug: CategorySlug;
  },
): Post => {
  const { categorySlug: _categorySlug, ...rest } = partial;
  return {
    href: `/article/${partial.slug}`,
    ...rest,
  };
};

/** Primary category archive — समाचार (fully designed sample). */
const samacharPosts: Post[] = [
  post({
    id: 101,
    slug: "naya-rojgar-niti",
    categorySlug: "samachar",
    category: "समाचार",
    title: "सरकारले ल्यायो नयाँ रोजगार नीति — युवामा प्राथमिकता",
    excerpt:
      "तालिम, उद्यमशीलता र वैदेशिक रोजगार सुरक्षा समेटिएको मार्गचित्र सार्वजनिक। स्थानीय तह र निजी क्षेत्रको भूमिकामा छलफल तीव्र।",
    imageUrl: u("1521737711867-e3b97375f902", 1200, 720),
    author: "फणीन्द्र नेपाल",
    authorAvatar: u("1472099645785-5658abf4ff4e", 96, 96),
    dateLabel: "साउन १६, २०८३",
    dateIso: "2026-08-01",
  }),
  post({
    id: 102,
    slug: "bank-bharti",
    categorySlug: "samachar",
    category: "समाचार",
    title: "बैंक तथा वित्त क्षेत्रमा नयाँ पद खुला — आवेदन प्रक्रिया सुरु",
    excerpt: "व्यावसायिक बैंकहरूले सहायक र अधिकृत तहका लागि दरखास्त माग गरेका छन्।",
    imageUrl: u("1454165804606-c3d57bc86b40", 640, 420),
    author: "सुमन गिरी",
    authorAvatar: u("1500648767791-00dcc994a43e", 96, 96),
    dateLabel: "साउन १४, २०८३",
    dateIso: "2026-07-30",
  }),
  post({
    id: 103,
    slug: "it-skill-demand",
    categorySlug: "samachar",
    category: "समाचार",
    title: "आईटी क्षेत्रमा माग बढेका सीपहरू — कहाँबाट सिक्ने?",
    excerpt: "क्लाउड, डाटा र प्रोडक्ट सोच अझै उच्च मागमा। तालिम केन्द्रहरूले नयाँ कोर्स खोले।",
    imageUrl: u("1519389950473-47ba0277781c", 640, 420),
    author: "उत्तम भट्टराई",
    authorAvatar: u("1507003211169-0a1dd7228f2d", 96, 96),
    dateLabel: "साउन १२, २०८३",
    dateIso: "2026-07-28",
  }),
  post({
    id: 104,
    slug: "lok-sewa",
    categorySlug: "samachar",
    category: "समाचार",
    title: "लोक सेवा आयोगको नयाँ विज्ञापन — तयारी कहाँबाट थाल्ने",
    excerpt: "समूहगत परीक्षा तालिका सार्वजनिक। पाठ्यक्रम परिवर्तनको सारांश।",
    imageUrl: u("1522071820081-009f0129c71c", 640, 420),
    author: "मीरा जोशी",
    authorAvatar: u("1494790108377-be9c29b29330", 96, 96),
    dateLabel: "साउन १०, २०८३",
    dateIso: "2026-07-26",
  }),
  post({
    id: 105,
    slug: "remote-jobs",
    categorySlug: "samachar",
    category: "समाचार",
    title: "रिमोट जागिर: नेपाली पेशेवरहरूका लागि नयाँ अवसर",
    excerpt: "वैदेशिक कम्पनीहरूले नेपालबाटै काम गर्न सक्ने पद थपेका छन्।",
    imageUrl: u("1517245386807-bb43f82c33c4", 640, 420),
    author: "रवि थापा",
    authorAvatar: u("1438761681033-6461ffad8d80", 96, 96),
    dateLabel: "साउन ८, २०८३",
    dateIso: "2026-07-24",
  }),
  post({
    id: 106,
    slug: "skill-mela",
    categorySlug: "samachar",
    category: "समाचार",
    title: "काठमाडौँमा सीप र रोजगार मेला — दर्ता खुला",
    excerpt: "एकै छतमुनि रोजगारदाता र तालिम प्रदायक भेला हुँदै।",
    imageUrl: u("1551836022-d5d88e9218df", 640, 420),
    author: "प्रिया नायर",
    authorAvatar: u("1544005313-94ddf0286df2", 96, 96),
    dateLabel: "साउन ६, २०८३",
    dateIso: "2026-07-22",
  }),
  post({
    id: 107,
    slug: "salary-survey",
    categorySlug: "samachar",
    category: "समाचार",
    title: "२०८३ को तलब सर्वेक्षण — कुन क्षेत्र अगाडि?",
    excerpt: "आईटी र बैंकिङ अझै उच्च औसतमा, साना उद्यममा वृद्धि सुस्त।",
    imageUrl: u("1460925895917-afdab827c52f", 640, 420),
    author: "कबीर सेन",
    authorAvatar: u("1506794778202-cad84cf45f1d", 96, 96),
    dateLabel: "साउन ४, २०८३",
    dateIso: "2026-07-20",
  }),
  post({
    id: 108,
    slug: "foreign-quota",
    categorySlug: "samachar",
    category: "समाचार",
    title: "खाडी मुलुकमा नयाँ कामदार कोटा खुला",
    excerpt: "अभिमुखीकरण तालिका र आवश्यक कागजातको सूची सार्वजनिक।",
    imageUrl: u("1486312338219-ce68d2c6f44d", 640, 420),
    author: "हेमन्त राज गौतम",
    authorAvatar: u("1534528741775-53994a69daeb", 96, 96),
    dateLabel: "साउन २, २०८३",
    dateIso: "2026-07-18",
  }),
  post({
    id: 109,
    slug: "startup-fund",
    categorySlug: "samachar",
    category: "समाचार",
    title: "स्टार्टअप कोषमा नयाँ आवेदक आह्वान",
    excerpt: "युवा उद्यमलाई सहुलियत ऋण र मेन्टरसिप प्याकेज।",
    imageUrl: u("1556761175-5973dc0f32e7", 640, 420),
    author: "आन्या शर्मा",
    authorAvatar: u("1539571696357-5a69c17a67c6", 96, 96),
    dateLabel: "असार ३०, २०८३",
    dateIso: "2026-07-15",
  }),
  post({
    id: 110,
    slug: "women-training",
    categorySlug: "samachar",
    category: "समाचार",
    title: "महिला उद्यमीका लागि निःशुल्क तालिम कार्यक्रम",
    excerpt: "डिजिटल मार्केटिङ र वित्तीय साक्षरतामा जोड।",
    imageUrl: u("1573496359142-b8d87734a5a2", 640, 420),
    author: "लोरी वेस्ट",
    authorAvatar: u("1534528741775-53994a69daeb", 96, 96),
    dateLabel: "असार २८, २०८३",
    dateIso: "2026-07-13",
  }),
  post({
    id: 111,
    slug: "teacher-service",
    categorySlug: "samachar",
    category: "समाचार",
    title: "शिक्षक सेवा आयोग तयारी: महत्वपूर्ण सुझावहरू",
    excerpt: "पाठ्यक्रम केन्द्रित अभ्यास र समय व्यवस्थापनका उपाय।",
    imageUrl: u("1600880292203-757bb62b4baf", 640, 420),
    author: "देव कपूर",
    authorAvatar: u("1517841905240-472988babdf9", 96, 96),
    dateLabel: "असार २५, २०८३",
    dateIso: "2026-07-10",
  }),
  post({
    id: 112,
    slug: "orientation",
    categorySlug: "samachar",
    category: "समाचार",
    title: "वैदेशिक रोजगार अभिमुखीकरणको नयाँ तालिका",
    excerpt: "जिल्लागत सत्र र अनलाइन विकल्प दुवै उपलब्ध।",
    imageUrl: u("1507679799987-c73779587ccf", 640, 420),
    author: "मोहन सुवेदी",
    authorAvatar: u("1487412720507-e7ab37603c6f", 96, 96),
    dateLabel: "असार २२, २०८३",
    dateIso: "2026-07-07",
  }),
];

/** Lightweight placeholders so other category URLs render the same layout. */
function placeholderPosts(category: CategoryInfo): Post[] {
  const titleVariants = [
    `${category.labelNe} सम्बन्धी विशेष सामग्री`,
    `${category.labelNe} मा ताजा विश्लेषण`,
    `${category.labelNe} का मुख्य कथाहरू`,
    `${category.labelNe} — गहिरो रिपोर्ट`,
    `${category.labelNe} मा नयाँ विकास`,
    `${category.labelNe} सम्बन्धी विशेष श्रृंखला`,
  ];
  const images = [
    "1521737711867-e3b97375f902",
    "1517245386807-bb43f82c33c4",
    "1551836022-d5d88e9218df",
    "1454165804606-c3d57bc86b40",
    "1519389950473-47ba0277781c",
    "1573496359142-b8d87734a5a2",
  ];
  const avatars = [
    "1472099645785-5658abf4ff4e",
    "1500648767791-00dcc994a43e",
    "1507003211169-0a1dd7228f2d",
    "1494790108377-be9c29b29330",
    "1438761681033-6461ffad8d80",
    "1544005313-94ddf0286df2",
  ];

  return Array.from({ length: 18 }, (_, i) => {
    const n = i + 1;
    return post({
      id: n * 1000 + category.slug.length,
      slug: `${category.slug}-${n}`,
      categorySlug: category.slug,
      category: category.labelNe,
      title: titleVariants[(n - 1) % titleVariants.length],
      excerpt: category.description,
      imageUrl: u(images[(n - 1) % images.length], 640, 420),
      author: "सम्पादकीय टोली",
      authorAvatar: u(avatars[(n - 1) % avatars.length], 96, 96),
      dateLabel: `साउन ${n + 1}, २०८३`,
      dateIso: `2026-07-${String(10 + (n % 18)).padStart(2, "0")}`,
    });
  });
}

export function getCategoryPosts(slug: string): Post[] {
  const category = getCategory(slug);
  if (!category) return [];
  if (category.slug === "samachar") return samacharPosts;
  return placeholderPosts(category);
}
