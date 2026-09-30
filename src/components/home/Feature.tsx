import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const list = [
  ["1559136555-9303baea8ebd", "आन्तरिक परियोजना पिच गर्दा हुने गल्तीहरू"],
  ["1519389950473-47ba0277781c", "उच्च प्रदर्शन टोलीले कोचिङबाट सिक्ने कुरा"],
] as const;

/** फिचर — framed photo editorial + related list */
export function Feature() {
  return (
    <Reveal className="reveal reveal-delay-1">
      <section
        id="feature"
        className="feature-spot"
        aria-labelledby="feature-title"
      >
        <SectionTitle href="/category/feature" more={false}>
          <span id="feature-title">फिचर</span>
        </SectionTitle>

        <article className="feature-spot__hero">
          <Link className="feature-spot__media" href="#article" tabIndex={-1} aria-hidden="true">
            <img
              className="feature-spot__cover"
              src={u("1506905925346-21bda4d32df4", 900, 560)}
              alt=""
              width={900}
              height={560}
              loading="lazy"
            />
          </Link>

          <div className="feature-spot__body">
            <h3 className="feature-spot__headline">
              <Link href="#article">
                मध्य-करियर पेशेवरहरूले दिगो भविष्य को खेल कसरी
                फेर्दैछन्
              </Link>
            </h3>
            <p className="feature-spot__excerpt">
              दृश्यता, प्रायोजन र स्पष्ट जिम्मेवारीले नै अर्को पद खुल्छ।
            </p>
          </div>
        </article>

        <ul className="feature-spot__list">
          {list.map(([image, title]) => (
            <li key={title}>
              <Link className="feature-spot__item" href="#article">
                <span className="feature-spot__thumb">
                  <img
                    src={u(image, 200, 160)}
                    alt=""
                    width={88}
                    height={66}
                    loading="lazy"
                  />
                </span>
                <span className="feature-spot__item-title line-2">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
