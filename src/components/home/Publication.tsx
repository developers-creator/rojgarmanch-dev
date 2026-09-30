import Link from "next/link";
import { getPublications } from "@/data/publications";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** प्रकाशन — latest cover; title opens that flipbook */
export function Publication() {
  const latest = getPublications()[0];
  if (!latest) return null;

  return (
    <section id="publication" aria-labelledby="publication-title">
      <SectionTitle href="/publication" moreLabel="फ्लिपबुक">
        <span id="publication-title">प्रकाशन</span>
      </SectionTitle>
      <Reveal className="pub-aside reveal-delay-2">
        <div className="pub-cover">
          <span className="pub-cover__book">
            <span className="pub-cover__page pub-cover__page--2" aria-hidden="true" />
            <span className="pub-cover__page pub-cover__page--1" aria-hidden="true" />
            <span className="pub-cover__front">
              <img src={latest.cover} alt="" width={320} height={420} />
              <span className="pub-cover__shade" aria-hidden="true" />
              <span className="pub-cover__meta">
                <em>
                  {latest.kicker} · {latest.date}
                </em>
                <strong>
                  <Link href={`/publication/${latest.slug}`}>{latest.title}</Link>
                </strong>
              </span>
            </span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
