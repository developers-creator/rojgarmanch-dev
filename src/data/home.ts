import type { HomePageData, Post, SiteInfo } from "@/types/content";

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

let nextPostId = 1;

const post = (
  partial: Omit<Post, "id" | "slug" | "href"> & { id?: number; slug?: string },
): Post => {
  const id = partial.id ?? nextPostId++;
  const slug = partial.slug ?? `story-${id}`;
  return {
    id,
    slug,
    href: `/article/${slug}`,
    ...partial,
  };
};

/** Static homepage content — replace body of getHomePageData() when CMS is ready. */
const homePageData: HomePageData = {
  teasers: [
    post({
      title: "तलब वार्तामा सफलता दिने पाँच बानी",
      imageUrl: u("1552664730-d307ca884978", 168, 128),
      imageAlt: "तलब वार्तामा सफलता दिने पाँच बानी",
    }),
    post({
      title: "मध्य-करियर स्विच किन नजिकका क्षेत्रबाट सजिलो हुन्छ",
      imageUrl: u("1454165804606-c3d57bc86b40", 168, 128),
    }),
    post({
      title: "तलब संरचना: भ्रमबिनाको सरल व्याख्या",
      imageUrl: u("1521737711867-e3b97375f902", 168, 128),
    }),
    post({
      title: "काममा सीमा राख्दा करियर कसरी बलियो हुन्छ",
      imageUrl: u("1517245386807-bb43f82c33c4", 168, 128),
    }),
    post({
      title: "असफल परियोजनाबाट सिक्ने चार व्यावहारिक पाठ",
      imageUrl: u("1519389950473-47ba0277781c", 168, 128),
    }),
    post({
      title: "लेखन बानीले विचार कसरी स्पष्ट पार्छ",
      imageUrl: u("1486312338219-ce68d2c6f44d", 168, 128),
    }),
  ],
  recent: [
    post({
      title: "भाडा दिने प्रबन्धकले पहिलो दस मिनेटमा के हेर्छन्",
      dateLabel: "साउन ७, २०८३",
      dateIso: "2026-07-22",
    }),
    post({
      title: "महत्वाकांक्षी व्यक्तिहरूलाई रोक्ने बानीहरू",
      dateLabel: "साउन ३, २०८३",
      dateIso: "2026-07-18",
    }),
    post({
      title: "नेतृत्व पद स्वीकार्नुअघि सोध्नुपर्ने दस प्रश्न",
      dateLabel: "असार ३०, २०८३",
      dateIso: "2026-07-14",
    }),
  ],
  highlight: {
    ...post({
      title:
        "सरकारले रोजगार नीतिमा नयाँ कदम चाल्दै — युवा र विदेशबाट फर्केकालाई प्राथमिकता",
      excerpt:
        "नयाँ मार्गचित्रमा तालिम, उद्यमशीलता र वैदेशिक रोजगारको सुरक्षा जोडिएको छ। नीति कार्यान्वयनमा स्थानीय तह र निजी क्षेत्रको भूमिका कस्तो हुनेछ भन्नेमा छलफल तीव्र बनेको छ।",
      category: "अर्थ विशेष : सरकार",
      author: "फणीन्द्र नेपाल",
      dateLabel: "साउन १६, २०८३",
      dateIso: "2026-08-01",
      imageUrl: u("1521737711867-e3b97375f902", 960, 540),
      imageAlt: "कार्यस्थल छलफल",
    }),
    authorAvatar: u("1472099645785-5658abf4ff4e", 56, 56),
  },
  highlightMore: [
    {
      ...post({
        title: "बैंक तथा वित्तमा नयाँ पद खुला — आवेदन कहिलेसम्म?",
        category: "रोजगार",
        author: "सुमन गिरी",
        dateLabel: "साउन १५, २०८३",
        dateIso: "2026-07-31",
      }),
      authorAvatar: u("1500648767791-00dcc994a43e", 56, 56),
    },
    {
      ...post({
        title: "वैदेशिक रोजगार अभिमुखीकरणको नयाँ तालिका सार्वजनिक",
        excerpt:
          "श्रम कार्यालयहरूले आगामी महिनाका लागि अभिमुखीकरण कक्षाको तालिका सार्वजनिक गरेका छन्। विदेश जानुअघि अनिवार्य तालिम नलिएका कामदारलाई अध्यागमनमा समस्या हुन सक्ने चेतावनी दिइएको छ।",
        category: "प्रवास",
        author: "उत्तम भट्टराई",
        dateLabel: "साउन १४, २०८३",
        dateIso: "2026-07-30",
      }),
      authorAvatar: u("1438761681033-6461ffad8d80", 56, 56),
    },
  ],
  feature: post({
    title: "मध्य-करियर पेशेवरहरूले प्रमोशनको खेल कसरी फेर्दैछन्",
    excerpt:
      "दृश्यता, प्रायोजन र स्पष्ट जिम्मेवारीले नै अर्को पद खुल्छ। हामीले प्रबन्धक र अपरेटरहरूसँग कुरा गर्‍यौं — केले अगाडि बढाउँछ र केले उही ठाउँमा घुमाउँछ।",
    imageUrl: u("1522071820081-009f0129c71c", 1000, 700),
    imageAlt: "कार्यस्थलमा सहकार्य गर्दै पेशेवरहरू",
    category: "रोजगार",
    author: "आन्या शर्मा",
    dateLabel: "साउन ५, २०८३",
    dateIso: "2026-07-20",
  }),
  featurePair: [
    post({
      title: "तलब वार्तामा सफलता दिने पाँच बानी",
      excerpt: "तयारी, सीमा र स्पष्ट मागले वार्ताको नतिजा फेर्छ।",
      author: "रवि थापा",
      dateLabel: "साउन ३, २०८३",
      imageUrl: u("1556761175-5973dc0f32e7", 640, 420),
      category: "सीप",
    }),
    post({
      title: "नयाँ भूमिका चाहिने संकेतहरू कसरी चिन्ने",
      excerpt: "वृद्धि रोकिएपछि राजनीति बढ्छ र सिकाइ कमजोर हुन्छ।",
      author: "प्रिया नायर",
      dateLabel: "साउन १, २०८३",
      imageUrl: u("1600880292203-757bb62b4baf", 640, 420),
      category: "करियर",
    }),
  ],
  ranked: [
    post({
      title: "राम्रो करियर रोक्ने नराम्रा बानीहरू",
      excerpt: "दृश्यताबिनाको मेहनत र सिकाइलाई ऐच्छिक ठान्नु।",
    }),
    post({
      title: "नयाँ पद होइन, नयाँ भूमिका चाहिने संकेतहरू",
      excerpt: "वृद्धि रोकिएपछि राजनीति बढ्छ र सीप कमजोर हुन्छ।",
    }),
    post({
      title: "उत्पादन-केन्द्रित टोलीले रोज्ने सिकाइ स्ट्याक",
      excerpt: "प्रणाली सोच, सरोकारवाला लेखन र निर्णय लग।",
    }),
    post({
      title: "कार्यसम्पादन मूल्याङ्कनका लुकेका सत्यहरू",
      excerpt: "रेटिङले के नाप्छ — र प्रमाण कसरी तयार गर्ने।",
    }),
  ],
  stories: [
    post({
      title: "टोली परिवर्तन गर्दा हुने सात गल्तीहरू",
      imageUrl: u("1551836022-d5d88e9218df", 960, 540),
      category: "समाचार",
      author: "प्रिया नायर",
      excerpt: "कथाबिना छाड्नु, सरोकारवाला नक्सा नबनाउनु र समयको अनुमान गलत गर्नु।",
    }),
    post({
      title: "दूरस्थ टोली पनि नजिक महसुस गराउने तरिका",
      imageUrl: u("1517245386807-bb43f82c33c4", 480, 280),
      category: "समाचार",
      author: "देव कपूर",
      excerpt: "असिंक रित, स्पष्ट निर्णयकर्ता र कम तर प्रभावकारी बैठक।",
    }),
    post({
      title: "बलियो भर्ना प्रक्रियाबाट सिकिने सीपहरू",
      imageUrl: u("1573496359142-b8d87734a5a2", 480, 280),
      category: "समाचार",
      author: "मीरा जोशी",
      excerpt: "संरचित स्क्रिन, प्रमाणमा आधारित स्कोरिङ र पढिने प्रतिक्रिया।",
    }),
    post({
      title: "२०८३ को कामबारे बीस चार्ट — संक्षेपमा",
      imageUrl: u("1460925895917-afdab827c52f", 480, 280),
      category: "समाचार",
      author: "कबीर सेन",
      excerpt: "भर्ना, अवधि, रिमोट मिश्रण र तलब परिवर्तन — बिना हल्ला।",
    }),
    post({
      title: "स्थानीय तहमा रोजगार कार्यक्रम विस्तार",
      imageUrl: u("1521737711867-e3b97375f902", 480, 280),
      category: "समाचार",
      author: "सुमन गिरी",
      excerpt: "तालिम र उद्यमशीलता जोडिएका नयाँ प्याकेज सार्वजनिक।",
    }),
    post({
      title: "वैदेशिक रोजगारमा नयाँ गन्तव्यको चर्चा",
      imageUrl: u("1507679799987-c73779587ccf", 480, 280),
      category: "समाचार",
      author: "उत्तम भट्टराई",
    }),
    post({
      title: "युवा स्वरोजगार कर्जाको आवेदन खुला",
      imageUrl: u("1556761175-b413da4baf72", 480, 280),
      category: "समाचार",
      author: "रवि थापा",
    }),
    post({
      title: "महिला उद्यमशीलता कार्यक्रम दोस्रो चरणमा",
      imageUrl: u("1559136555-9303baea8ebd", 480, 280),
      category: "समाचार",
      author: "आन्या शर्मा",
    }),
    post({
      title: "कृषि सहकारीमा रोजगार सिर्जना बढ्दो",
      imageUrl: u("1461896836934-ffe607ba8211", 480, 280),
      category: "समाचार",
      author: "मोहन सुवेदी",
    }),
  ],
  igStories: [
    {
      id: "samachar",
      label: "समाचार",
      avatarUrl: u("1521737711867-e3b97375f902", 160, 160),
      slides: [
        {
          imageUrl: u("1521737711867-e3b97375f902", 1080, 1920),
          title: "नयाँ रोजगार नीति — युवामा प्राथमिकता",
          href: "/article/naya-rojgar-niti",
        },
        {
          imageUrl: u("1454165804606-c3d57bc86b40", 1080, 1920),
          title: "बैंक तथा वित्तमा नयाँ पद खुला",
        },
      ],
    },
    {
      id: "rojgar",
      label: "रोजगार",
      avatarUrl: u("1522071820081-009f0129c71c", 160, 160),
      slides: [
        {
          imageUrl: u("1522071820081-009f0129c71c", 1080, 1920),
          title: "मध्य-करियर प्रमोशनको नयाँ खेल",
        },
        {
          imageUrl: u("1556761175-5973dc0f32e7", 1080, 1920),
          title: "तलब वार्तामा सफलता दिने बानी",
        },
      ],
    },
    {
      id: "pravas",
      label: "प्रवास",
      avatarUrl: u("1486312338219-ce68d2c6f44d", 160, 160),
      slides: [
        {
          imageUrl: u("1486312338219-ce68d2c6f44d", 1080, 1920),
          title: "खाडी मुलुकमा नयाँ कामदार कोटा",
        },
      ],
    },
    {
      id: "business",
      label: "बिजनेस",
      avatarUrl: u("1573496359142-b8d87734a5a2", 160, 160),
      slides: [
        {
          imageUrl: u("1573496359142-b8d87734a5a2", 1080, 1920),
          title: "उद्यम र बजारका मुख्य कथा",
        },
        {
          imageUrl: u("1460925895917-afdab827c52f", 1080, 1920),
          title: "२०८३ को तलब सर्वेक्षण",
        },
      ],
    },
    {
      id: "artha-rojgar",
      label: "अर्थ र रोजगार",
      avatarUrl: u("1552664730-d307ca884978", 160, 160),
      slides: [
        {
          imageUrl: u("1552664730-d307ca884978", 1080, 1920),
          title: "रातको सिफ्ट र करियर — विश्वास सही हो?",
        },
      ],
    },
    {
      id: "tv",
      label: "टि.भी.",
      avatarUrl: u("1574717024653-61fd2cf4d44d", 160, 160),
      slides: [
        {
          imageUrl: u("1574717024653-61fd2cf4d44d", 1080, 1920),
          title: "करियर कुराकानी: प्रबन्धकले के खोज्छन्",
        },
      ],
    },
    {
      id: "khel",
      label: "खेल",
      avatarUrl: u("1517245386807-bb43f82c33c4", 160, 160),
      slides: [
        {
          imageUrl: u("1517245386807-bb43f82c33c4", 1080, 1920),
          title: "सिर्जनात्मक कार्य र संस्कृति",
        },
      ],
    },
    {
      id: "ramailo-sansar",
      label: "रमाइलो संसार",
      avatarUrl: u("1551836022-d5d88e9218df", 160, 160),
      slides: [
        {
          imageUrl: u("1551836022-d5d88e9218df", 1080, 1920),
          title: "देश र समाजका ताजा मुद्दा",
        },
      ],
    },
  ],
  youtube: {
    channelUrl: "https://www.youtube.com/@rojgarmanch",
    featuredId: "yt-1",
    videos: [
      {
        id: "yt-1",
        youtubeId: "M7lc1UVf-VE",
        title: "करियर कुराकानी: प्रबन्धकहरूले भर्नामा के खोज्छन्",
      },
      {
        id: "yt-2",
        youtubeId: "jNQXAC9IVRw",
        title: "तलब वार्ताको वास्तविकता — एपिसोड १२",
      },
      {
        id: "yt-3",
        youtubeId: "aqz-KE-bpKQ",
        title: "रिमोट टोलीको दिनचर्या: उत्पादक रहने तरिका",
      },
      {
        id: "yt-4",
        youtubeId: "ScMzIvxBSi4",
        title: "पहिलो जागिरका पाठ — नयाँ कर्मचारी गाइड",
      },
    ],
    shorts: [
      {
        id: "ys-1",
        youtubeId: "0opXvwVsgOk",
        title: "जागिर अन्तर्वार्तामा नभन्ने तीन कुरा",
      },
      {
        id: "ys-2",
        youtubeId: "kl-WJPgjWrA",
        title: "रिज्युमेमा देखिनुपर्ने सीप",
      },
      {
        id: "ys-3",
        youtubeId: "aqz-KE-bpKQ",
        title: "वैदेशिक रोजगार: कागजात चेकलिस्ट",
      },
      {
        id: "ys-4",
        youtubeId: "ScMzIvxBSi4",
        title: "६० सेकेन्डमा LinkedIn प्रोफाइल टिप",
      },
    ],
  },
  flashNews: [
    post({
      title: "काठमाडौँमा रोजगार मेला — दर्ता खुला",
      dateLabel: "असार १८, २०८२",
      imageUrl: u("1521737711867-e3b97375f902", 120, 120),
      imageAlt: "रोजगार मेला",
    }),
    post({
      title: "बैंकहरूले नयाँ पदहरूका लागि आवेदन मागे",
      dateLabel: "असार १७, २०८२",
      imageUrl: u("1454165804606-c3d57bc86b40", 120, 120),
      imageAlt: "बैंक जागिर",
    }),
    post({
      title: "रिमोट जागिर: नेपाली पेशेवरहरूका अवसर",
      dateLabel: "असार १६, २०८२",
      imageUrl: u("1486312338219-ce68d2c6f44d", 120, 120),
      imageAlt: "रिमोट जागिर",
    }),
    post({
      title: "आईटी तालिम कार्यक्रममा निःशुल्क सिट खुला",
      dateLabel: "असार १५, २०८२",
      imageUrl: u("1519389950473-47ba0277781c", 120, 120),
      imageAlt: "आईटी तालिम",
    }),
    post({
      title: "वैदेशिक रोजगार अभिमुखीकरण नयाँ तालिका",
      dateLabel: "असार १४, २०८२",
      imageUrl: u("1556761175-5973dc0f32e7", 120, 120),
      imageAlt: "वैदेशिक रोजगार",
    }),
  ],
  trending: [
    post({ title: "वैदेशिक रोजगारमा नयाँ नीति — के परिवर्तन हुँदैछ?" }),
    post({ title: "सरकारी जागिर विज्ञापन: लोक सेवा तयारी सुझाव" }),
    post({ title: "आईटी क्षेत्रमा माग बढेका सीपहरू र कसरी सिक्ने" }),
    post({ title: "बैंक तथा वित्त क्षेत्रमा नयाँ करियर अवसरहरू" }),
    post({ title: "नेपालमा स्टार्टअप: लगानी र चुनौतीहरू" }),
    post({ title: "महिला उद्यमीका लागि अनुदान र तालिम कार्यक्रम" }),
    post({ title: "शिक्षक सेवा आयोग तयारी: महत्वपूर्ण सुझावहरू" }),
    post({ title: "डिजिटल मार्केटिङ सीपले कसरी जागिर पाउने?" }),
    post({ title: "खाडी मुलुकमा कामदार माग: नयाँ कोटा खुला" }),
  ],
};

const siteInfo: SiteInfo = {
  name: "रोजगार मिडिया प्रा.लि",
  domain: "rojgarmanch.com",
  registrationNo: "सूचना विभाग दर्ता नं: २००६/०७७/०७८",
  address: "Gyaneshwor, Kathmandu, Nepal",
  phone: "+977 1 4531043",
  email: "rojgarmanch@gmail.com",
  social: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook-f" },
    { label: "X / Twitter", href: "https://x.com", icon: "x-twitter" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin-in" },
  ],
  team: [
    { role: "प्रमुख व्यवस्थापक", name: "फणिन्द्र दाहाल" },
    { role: "सल्लाहकार सम्पादक", name: "युवराज नयाँघरे" },
    { role: "सम्पादक", name: "सुमन गिरी" },
    { role: "सह सम्पादक", name: "उत्तम भट्टराई" },
    { role: "स्तम्भकार", name: "हरिराम पौडेल, शम्भू सुस्केरा" },
    {
      role: "संवाददाता",
      name: "हेमन्त राज गौतम, हरि बहादुर थापा, पर्वत बिक, मोहन सुवेदी",
    },
  ],
  quickLinks: [
    { href: "/", label: "गृहपृष्ठ" },
    { href: "/about", label: "हाम्रो बारेमा" },
    { href: "/team", label: "हाम्रो समूह" },
    { href: "/contact", label: "सम्पर्क" },
    { href: "/publication", label: "प्रकाशन" },

    { href: "/category/samachar", label: "Archive" },
  ],
};


export function getHomePageData() {
  return homePageData;
}

export function getSiteInfo() {
  return siteInfo;
}
