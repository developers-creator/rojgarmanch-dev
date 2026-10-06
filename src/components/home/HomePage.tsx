import type { HomePageData } from "@/types/content";
import { ADS } from "@/lib/ads";
import { AdUnit } from "@/components/ui/AdUnit";
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
import type { BelowMenuHomeAd, LongHighlightAd } from "@/types/ads";

type HomePageProps = {
  data: HomePageData;
  bannerNewsData?: BannerNewsData;
  belowMenuAds?: BelowMenuHomeAd[];
  highlightAds?: LongHighlightAd[];
  siteName: string;
};

function BannerAd({ ad }: { ad: (typeof ADS)[keyof typeof ADS] }) {
  return (
    <div className="ad-band">
      <div className="container">
        <AdUnit ad={ad} variant="banner" />
      </div>
    </div>
  );
}

export function HomePage({
  data,
  bannerNewsData,
  belowMenuAds,
  highlightAds,
  siteName,
}: HomePageProps) {
  return (
    <main id="main">
      <BelowMenuAds ads={belowMenuAds} siteName={siteName} />

      {/* मुख्य समाचार */}
      <HighlightNews
        bannerNewsData={bannerNewsData}
        ads={highlightAds}
        siteName={siteName}
      />
      
      <Samachar />

      <BannerAd ad={ADS.hardik} />

      <div className="container artha-row">
        <ArthaRojgar />
        <Publication />
      </div>

      <BannerAd ad={ADS.hbl} />

      {/* युट्युब — २:१ भिडियो + Shorts */}
      <Youtube data={data.youtube} />


      <BannerAd ad={ADS.hbl} />

     

      {/* रोजगार — wraps बिजनेस */}
      <Rojgar>
        <Business />
        <VinimayaDar />
      </Rojgar>

      <BannerAd ad={ADS.ncell} />
      {/* एनआरएन · प्रवास */}
      <Pravas />

      <BannerAd ad={ADS.hardik} />

      {/* इन्स्टा-स्टाइल स्टोरी */}
      <WebStories />

      <BannerAd ad={ADS.hbl} />

      {/* अन्तर्वार्ता · फिचर */}
      <section className="container split split--iv-feature" aria-label="अन्तर्वार्ता र फिचर">
        <Antarwarta />
        <Feature />
      </section>

      <BannerAd ad={ADS.ncell} />

      {/* खेल · पर्यटन */}
      <section className="container duo-cats" aria-label="खेल र पर्यटन">
        <Khel />
        <Paryatan />
      </section>

      <BannerAd ad={ADS.hardik} />

      {/* कला · साहित्य */}
      <Kala />

      <BannerAd ad={ADS.hbl} />

      {/* ब्लग / विचार */}
      <BlogBichar />

      <BannerAd ad={ADS.ncell} />

      {/* रमाइलो संसार · विश्व · English Headline */}
      <section className="container triple" aria-label="रमाइलो संसार विश्व">
        <RamailoSansar />
        <Bishwa />
        <EnglishHeadline />
      </section>

    </main>
  );
}
