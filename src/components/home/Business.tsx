import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const items = [
  ["1486406146926-c627a92ad1ab", "काठमाडौंमा नयाँ व्यावसायिक कम्प्लेक्सको लगानी बढ्यो"],
  ["1492144534655-ae79c964c9d7", "अटो शोमा विद्युतीय सवारीको माग उच्च"],
  ["1552664730-d307ca884978", "बैंकिङ क्षेत्रमा डिजिटल सेवा विस्तार"],
  ["1517245386807-bb43f82c33c4", "बीमा क्षेत्रमा नयाँ योजना सार्वजनिक"],
  ["1521737711867-e3b97375f902", "स्टार्टअप लगानीमा विदेशी चासो बढ्दो"],
  ["1559136555-9303baea8ebd", "सेयर बजारमा संस्थागत खरिद सक्रिय"],
] as const;

/** बिजनेस — image + solid red headline, then 2-col list */
export function Business() {
  return (
    <Reveal className="reveal">
      <section
        id="business"
        className="biz-board"
        aria-labelledby="business-title"
      >
        <SectionTitle href="/category/business">
          <span id="business-title">बिजनेस</span>
        </SectionTitle>

        <article className="biz-hero">
          <Link
            className="biz-hero__media"
            href="#article"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={u("1541888946425-d81bb19240f5", 900, 640)}
              alt=""
              width={640}
              height={440}
              loading="lazy"
            />
          </Link>
          <div className="biz-hero__panel">
            <h3 className="biz-hero__title">
              <Link href="#article">
                बाढी पहिरोले अवरुद्ध सडक खुलाउन जेसिबी खटाइयो, स्थानीयको
                सहयोगमा काम तीव्र
              </Link>
            </h3>
          </div>
        </article>

        <ul className="biz-grid">
          {items.map(([image, title]) => (
            <li key={title}>
              <Link className="biz-item" href="#article">
                <span className="biz-item__thumb">
                  <img
                    src={u(image, 240, 160)}
                    alt=""
                    width={120}
                    height={80}
                    loading="lazy"
                  />
                </span>
                <span className="biz-item__title line-2">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
