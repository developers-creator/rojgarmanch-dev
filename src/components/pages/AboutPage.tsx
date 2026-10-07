import { Reveal } from "@/components/motion/Reveal";
import { getAbout } from "@/lib/api/endpoints";

export async function AboutPage() {
  const aboutData = (await getAbout().catch(() => null))?.data;
  const payload = aboutData?.payload;
  // The API content starts with its own <h1>; the page heading already renders the title.
  const lead = (payload?.content ?? "").replace(/<h1[\s\S]*?<\/h1>/i, "").trim();
  const values = payload?.why_us_details ?? [];

  return (
    <main id="main" className="site-page about-page">
      <div className="container">
        <div className="about-layout">
          <header className="about-head">
            <h1 id="about-title">{aboutData?.title}</h1>
            {lead ? (
              <div
                className="about-head__lead"
                dangerouslySetInnerHTML={{ __html: lead }}
              />
            ) : null}
          </header>

          {payload?.about_main_description ? (
            <section className="about-body" aria-label="हाम्रो कथा">
              <Reveal className="about-body__block">
                <div
                  dangerouslySetInnerHTML={{
                    __html: payload.about_main_description,
                  }}
                />
              </Reveal>
            </section>
          ) : null}
        </div>

        {values.length > 0 ? (
          <ul className="about-points" aria-label="हाम्रा मूल्यहरू">
            {values.map((item) => (
              <li key={item.why_title}>
                <strong>{item.why_title}</strong>
                <span>{item.why_short_description.trim()}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}
