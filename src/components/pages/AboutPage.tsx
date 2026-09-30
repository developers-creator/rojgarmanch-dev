import type { AboutContent } from "@/data/pages";
import { Reveal } from "@/components/motion/Reveal";

type AboutPageProps = {
  content: AboutContent;
};

export function AboutPage({ content }: AboutPageProps) {
  return (
    <main id="main" className="site-page about-page">
      <div className="container">
        <div className="about-layout">
          <header className="about-head">
            <h1 id="about-title">{content.titleNe}</h1>
            <p className="about-head__lead">{content.lead}</p>
          </header>

          <section className="about-body" aria-label="हाम्रो कथा">
            {content.story.map((block, index) => (
              <Reveal
                key={block.title}
                className={`about-body__block${index ? ` reveal-delay-${Math.min(index, 3)}` : ""}`}
              >
                <h2>{block.title}</h2>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </Reveal>
            ))}
          </section>
        </div>

        {content.values.length > 0 ? (
          <ul className="about-points" aria-label="हाम्रा मूल्यहरू">
            {content.values.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}
