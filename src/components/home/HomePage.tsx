import type { HomePageData } from "@/types/content";
import { CmsBannerAd } from "@/components/ui/CmsBannerAd";
import { CmsBannerAdPair } from "@/components/ui/CmsBannerAdPair";
import { BelowMenuAds } from "./BelowMenuAds";
import { HighlightNews } from "./HighlightNews";
import { BlogBichar } from "./BlogBichar";
import { WebStories } from "./WebStories";
import { Antarwarta } from "./Antarwarta";
import { Samachar } from "./Samachar";
import { Pravas } from "./Pravas";
import { ArthaRojgar } from "./ArthaRojgar";
import { Publication } from "./Publication";
import { Rojgar } from "./Rojgar";
import { Business } from "./Business";
import { VinimayaDar } from "./VinimayaDar";
import { Feature } from "./Feature";
import { Kala } from "./Kala";
import { Khel } from "./Khel";
import { Paryatan } from "./Paryatan";
import { RamailoSansar } from "./RamailoSansar";
import { Bishwa } from "./Bishwa";
import { EnglishHeadline } from "./EnglishHeadline";
import { TV } from "./TV";
import { Youtube } from "./Youtube";
import type { BannerNewsData } from "@/types/bannerNews";
import type { BelowMenuHomeAd, LongAds, LongHighlightAd } from "@/types/ads";

type HomePageProps = {
  data: HomePageData;
  bannerNewsData?: BannerNewsData;
  belowMenuAds?: BelowMenuHomeAd[];
  highlightAds?: LongHighlightAd[] | false;
  longAds?: LongAds;
  siteName: string;
};

export function HomePage({
  data,
  bannerNewsData,
  belowMenuAds,
  highlightAds,
  longAds,
  siteName,
}: HomePageProps) {
  return (
    <main id="main">
      <h1 className="sr-only">रोजगार मञ्च — करियर र रोजगार पत्रिका</h1>

      <BelowMenuAds ads={belowMenuAds} siteName={siteName} />

      {/* मुख्य समाचार */}
      <HighlightNews
        bannerNewsData={bannerNewsData}
        ads={highlightAds}
        siteName={siteName}
      />
      
      <CmsBannerAd
        image={longAds?.before_samachar}
        href={longAds?.before_news_insert_url}
        siteName={siteName}
      />

      <Samachar />

      <CmsBannerAdPair
        left={{
          image: longAds?.below_news_ad_left,
          href: longAds?.below_news_left_insert_url,
        }}
        right={{
          image: longAds?.below_news_ad_right,
          href: longAds?.below_news_right_insert_url,
        }}
        siteName={siteName}
      />

      <div className="container artha-row">
        <ArthaRojgar />
        <Publication />
      </div>

      <CmsBannerAdPair
        left={{
          image: longAds?.below_artha_ra_rojgar_ad_left,
          href: longAds?.below_artha_ra_rojgar_ad_url_left,
        }}
        right={{
          image: longAds?.below_artha_ra_rojgar_ad_right,
          href: longAds?.below_artha_ra_rojgar_ad_url_right,
        }}
        siteName={siteName}
      />

      {/* युट्युब — २:१ भिडियो + Shorts */}
      <Youtube data={data.youtube} />

      <CmsBannerAd
        image={longAds?.below_rojgar_tv_ad}
        href={longAds?.below_rojgar_tv_ad_url}
        siteName={siteName}
      />

      {/* रोजगार — wraps बिजनेस */}
      <Rojgar>
        <Business />
        <div className="split__aside">
          <VinimayaDar />
          <CmsBannerAd
            bare
            image={longAds?.beside_business}
            href={longAds?.beside_business_url}
            siteName={siteName}
            sizes="(max-width: 1080px) 100vw, 420px"
          />
        </div>
      </Rojgar>

      <CmsBannerAd
        image={longAds?.below_business_ad}
        href={longAds?.below_business_ad_url}
        siteName={siteName}
      />

      
      {/* एनआरएन · प्रवास */}
      <Pravas />

      <CmsBannerAd
        image={longAds?.below_nrn}
        href={longAds?.below_nrn_url}
        siteName={siteName}
      />

      {/* इन्स्टा-स्टाइल स्टोरी */}
      <WebStories />

      <CmsBannerAd
        image={longAds?.below_webstories}
        href={longAds?.below_webstories_ad_url}
        siteName={siteName}
      />

      {/* अन्तर्वार्ता · फिचर */}
      <section className="container split split--iv-feature" aria-label="अन्तर्वार्ता र फिचर">
        <Antarwarta />
        <Feature />
      </section>

      <CmsBannerAd
        image={longAds?.below_interview_ad}
        href={longAds?.below_interview_ad_url}
        siteName={siteName}
      />

      {/* खेल · पर्यटन */}
      <section className="container duo-cats" aria-label="खेल र पर्यटन">
        <Khel />
        <Paryatan />
      </section>

      <CmsBannerAd
        image={longAds?.below_sports_news_ad}
        href={longAds?.below_sports_news_ad_url}
        siteName={siteName}
      />

      {/* कला · साहित्य */}
      <Kala />

      <CmsBannerAd
        image={longAds?.below_kala_sahitya_ad}
        href={longAds?.below_kala_sahitya_ad_url}
        siteName={siteName}
      />

      {/* ब्लग / विचार */}
      <BlogBichar
        ad={{
          image: longAds?.beside_blog_and_opinions,
          href: longAds?.beside_blog_and_opinions_url,
        }}
        siteName={siteName}
      />

      <CmsBannerAd
        image={longAds?.below_blog_and_opinions_ad}
        href={longAds?.below_blog_and_opinions_ad_url}
        siteName={siteName}
      />

      {/* रमाइलो संसार · विश्व · English Headline */}
      <section className="container triple" aria-label="रमाइलो संसार विश्व">
        <RamailoSansar />
        <Bishwa />
        <EnglishHeadline />
      </section>

      <CmsBannerAd
        image={longAds?.above_footer_ad}
        href={longAds?.above_footer_ad_url}
        siteName={siteName}
      />

    </main>
  );
}
