import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const cards = [
  {
    image: "1556761175-b413da4baf72",
    title: "नयाँ अपरेटिङ मोडेल चाहिने दस संकेत",
    quote: false,
  },
  {
    image: "1573496359142-b8d87734a5a2",
    title: "सार्वजनिक रूपमा डेलिभर गर्ने अपरेटरहरूको वर्ष",
    quote: true,
  },
  {
    image: "1600880292203-757bb62b4baf",
    title: "आधुनिक उत्पादन शिल्प सिक्ने उत्कृष्ट स्रोत",
    quote: false,
  },
] as const;

/** अन्तर्वार्ता — quote hero + 3-up cards */
export function Antarwarta() {
  return (
    <Reveal className="reveal">
      <section
        id="antarwarta"
        className="iv-board"
        aria-labelledby="antarwarta-title"
      >
        <SectionTitle href="/category/antarwarta">
          <span id="antarwarta-title">अन्तर्वार्ता</span>
        </SectionTitle>

        <article className="iv-hero">
          <Link
            className="iv-hero__media"
            href="#article"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={u("1507003211169-0a1dd7228f2d", 900, 800)}
              alt=""
              width={640}
              height={560}
              loading="lazy"
            />
          </Link>
          <div className="iv-hero__copy">
            <span className="iv-hero__notch" aria-hidden="true" />
            <span className="iv-hero__quote" aria-hidden="true">
              ”
            </span>
            <h3 className="iv-hero__title">
              <Link href="#article">
                स्पष्ट संवाद गर्ने टोलीसँग ग्राहक{" "}
                बस्ने पन्ध्र कारण
              </Link>
            </h3>
            <p className="iv-hero__excerpt">
              विश्वास, पारदर्शिता र निरन्तर फलोअपले ग्राहक सम्बन्ध बलियो
              बनाउँछ — अनुभवी अपरेटरहरूको अनुभव।
            </p>
          </div>
        </article>

        <div className="iv-grid">
          {cards.map((card) => (
            <article className="iv-card" key={card.title}>
              <Link
                className="iv-card__media"
                href="#article"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={u(card.image, 480, 300)}
                  alt=""
                  width={320}
                  height={200}
                  loading="lazy"
                />
                {card.quote ? (
                  <span className="iv-card__quote" aria-hidden="true">
                    ”
                  </span>
                ) : null}
              </Link>
              <h3 className="iv-card__title line-2">
                <Link href="#article">{card.title}</Link>
              </h3>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
