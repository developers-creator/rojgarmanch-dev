import Link from "next/link";
import { getPublication } from "@/lib/api/endpoints";
import { Reveal } from "@/components/motion/Reveal";
import { publicationSlug } from "@/lib/publication";
import { decodeEntities } from "@/lib/text";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** प्रकाशन — latest cover; title opens that flipbook */
export async function Publication() {
  const publication = await getPublication().catch(() => null);
  const data = publication?.data?.[0];
  if (!data) return null;
  const title = decodeEntities(data.title);

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
              {data.featured_image ? (
                <img src={data.featured_image} alt={title} width={320} height={420} />
              ) : null}
              <span className="pub-cover__shade" aria-hidden="true" />
              <span className="pub-cover__meta">
                <em>
                  {data.sub_title ? `${decodeEntities(data.sub_title)} · ${data.date}` : data.date}
                </em>
                <strong>
                  <Link href={`/publication/${encodeURIComponent(publicationSlug(data.slug))}`}>{title}</Link>
                </strong>
              </span>
            </span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
