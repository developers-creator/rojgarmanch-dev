import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const items = [
  [
    "1573496359142-b8d87734a5a2",
    "४० वर्षपछि पनि नयाँ क्षेत्र सिक्नेहरूले के फेरे"
  ],
  [
    "1522071820081-009f0129c71c",
    "मिटिङ घटाएर पनि प्रभाव बढाउने टोलीको तरिका"
  ],
  [
    "1517245386807-bb43f82c33c4",
    "प्रमोशनअघि तयार गर्नुपर्ने दस प्रमाण"
  ],
  [
    "1522071820081-009f0129c71c",
    "मिटिङ घटाएर पनि प्रभाव बढाउने टोलीको तरिका"
  ],
] as const;

/** अर्थ र रोजगार */
export function ArthaRojgar() {
  return (
    <section className="spotlight" id="artha-rojgar" aria-labelledby="artha-rojgar-title">
      <SectionTitle href="/category/artha-rojgar">
        <span id="artha-rojgar-title">अर्थ र रोजगार</span>
      </SectionTitle>
      <div className="spotlight__grid">
        <Reveal className="spotlight__lead reveal">
          <div className="spotlight__lead-bg" aria-hidden="true" />
          <div className="spotlight__lead-inner">
            <Link
              className="spotlight__lead-media"
              href="#article"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                className="img-cover"
                src={u("1552664730-d307ca884978", 800, 520)}
                alt="रातको सिफ्टले करियर रोक्छ भन्ने विश्वास सही हो?"
                width={800}
                height={520}
                loading="lazy"
              />
            </Link>
            <h3 className="spotlight__lead-title">
              <Link href="#article">रातको सिफ्टले करियर रोक्छ भन्ने विश्वास सही हो?</Link>
            </h3>
            <p className="spotlight__lead-excerpt">
              धेरैले रात्रि सिफ्टलाई वृद्धि रोकने कारक ठान्छन्। प्रबन्धक र
              अपरेटरहरू भन्छन् — समस्या सिफ्ट होइन, दृश्यता र सिकाइको योजना हो।
            </p>
          </div>
        </Reveal>
        <Reveal className="spotlight__list reveal reveal-delay-1">
          <ul>
  {items.map(([image, title], index) => (
    <li key={`${title}-${index}`}>
      <Link className="spotlight__item" href="#article">
        <img
          src={u(image, 200, 160)}
          alt={title}
          width={100}
          height={80}
          loading="lazy"
        />
        <span>
          <strong className="line-2">{title}</strong>
        </span>
      </Link>
    </li>
  ))}
</ul>
        </Reveal>
      </div>
    </section>
  );
}
