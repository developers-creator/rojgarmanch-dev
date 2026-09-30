import { unsplash as u } from "@/lib/media";

export type PublicationIssue = {
  slug: string;
  kicker: string;
  date: string;
  title: string;
  cover: string;
  pdfHref: string;
  tagline: string;
  toc: string[];
};

export const PUBLICATIONS: PublicationIssue[] = [
  {
    slug: "asar-2083",
    kicker: "अंक ११",
    date: "असार २०८३",
    title: "अर्थ र रोजगार",
    cover: u("1522071820081-009f0129c71c", 720, 960),
    pdfHref: "/publications/Artha-Ra-Rojgar_Ashar-2083.pdf",
    tagline: "अर्थ · रोजगार · अवसर",
    toc: [
      "अर्थतन्त्रका मुख्य सूचक",
      "रोजगार बजार विश्लेषण",
      "नीति र कार्यान्वयन",
      "उद्यम कथाहरू",
      "सीप र अवसर",
    ],
  },
  {
    slug: "saun-2083",
    kicker: "अंक १२",
    date: "साउन २०८३",
    title: "रोजगार मञ्च मासिक",
    cover: u("1521737711867-e3b97375f902", 720, 960),
    pdfHref: "/publications/Artha-Ra-Rojgar_Ashar-2083.pdf",
    tagline: "करियर · उद्यम · प्रवास",
    toc: [
      "युवा रोजगार मार्गचित्र",
      "बैंक तथा वित्तमा खुला पद",
      "अभिमुखीकरण अनिवार्य",
      "फर्केका कामदारका कथा",
      "तलब वार्ताका पाँच बानी",
    ],
  },
  {
    slug: "jestha-2083",
    kicker: "अंक १०",
    date: "जेठ २०८३",
    title: "युवा उद्यम कथाहरू",
    cover: u("1556761175-5973dc0f32e7", 720, 960),
    pdfHref: "/publications/Artha-Ra-Rojgar_Ashar-2083.pdf",
    tagline: "स्टार्टअप · सीप · बजार",
    toc: [
      "पहिलो ग्राहक कसरी भेट्ने",
      "सानो पुँजीमा उत्पादन",
      "सहकारीसँग सहकार्य",
      "डिजिटल बिक्री च्यानल",
      "लेखा राख्ने सरल तरिका",
    ],
  },
  {
    slug: "baisakh-2083",
    kicker: "अंक ९",
    date: "वैशाख २०८३",
    title: "लोक सेवा तयारी अंक",
    cover: u("1454165804606-c3d57bc86b40", 720, 960),
    pdfHref: "/publications/Artha-Ra-Rojgar_Ashar-2083.pdf",
    tagline: "परीक्षा · नोट · अन्तर्वार्ता",
    toc: [
      "पाठ्यक्रम नक्सा",
      "दैनिक पढाइ तालिका",
      "मोडल प्रश्न सेट",
      "अन्तर्वार्ता अभ्यास",
      "नतिजापछिको योजना",
    ],
  },
  {
    slug: "chaitra-2082",
    kicker: "अंक ८",
    date: "चैत २०८२",
    title: "महिला करियर विशेष",
    cover: u("1573496359142-b8d87734a5a2", 720, 960),
    pdfHref: "/publications/Artha-Ra-Rojgar_Ashar-2083.pdf",
    tagline: "नेतृत्व · सन्तुलन · अवसर",
    toc: [
      "कार्यस्थल सुरक्षा",
      "तलब वार्ताका आधार",
      "मातृत्वपछि फर्किने बाटो",
      "महिला उद्यम कथा",
      "मेन्टर खोज्ने तरिका",
    ],
  },
  {
    slug: "falgun-2082",
    kicker: "अंक ७",
    date: "फागुन २०८२",
    title: "डिजिटल सीप अंक",
    cover: u("1517245386807-bb43f82c33c4", 720, 960),
    pdfHref: "/publications/Artha-Ra-Rojgar_Ashar-2083.pdf",
    tagline: "टेक · सिकाइ · जागिर",
    toc: [
      "फ्रीलान्स सुरुआत",
      "पोर्टफोलियो बनाउने तरिका",
      "रिमोट जागिर खोजी",
      "आधारभूत डाटा सीप",
      "साइबर सुरक्षा बानी",
    ],
  },
];

export function getPublications() {
  return PUBLICATIONS;
}

export function getPublication(slug: string) {
  return PUBLICATIONS.find((item) => item.slug === slug) ?? null;
}

export function getPublicationSlugs() {
  return PUBLICATIONS.map((item) => item.slug);
}
