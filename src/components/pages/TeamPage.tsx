import { fillImgAlt } from "@/lib/cmsHtml";
import { Reveal } from "@/components/motion/Reveal";
import { getTeam } from "@/lib/api/endpoints";

export async function TeamPage() {
  const teamData = (await getTeam().catch(() => null))?.data;
  const members = teamData?.payload?.team ?? [];

  return (
    <main id="main" className="site-page team-page">
      <div className="container">
        <header className="site-page__head">
          <h1 id="team-title">{teamData?.title}</h1>
          {teamData?.payload?.content ? (
            <div
              className="site-page__lead"
              dangerouslySetInnerHTML={{ __html: teamData.payload.content }}
            />
          ) : null}
        </header>

        <section className="team-grid" aria-label="टोली सदस्य">
          {members.map((member, index) => (
            <Reveal
              key={`${member.id}-${member.title}`}
              className={`team-card${index ? ` reveal-delay-${Math.min((index % 3) + 1, 3)}` : ""}`}
            >
              <div className="team-card__media">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.title}
                    width={480}
                    height={480}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 4 ? "high" : "auto"}
                  />
                ) : (
                  <span className="team-card__placeholder" aria-hidden="true" />
                )}
              </div>
              <div className="team-card__body">
                <p className="team-card__role">{member.positions.join(", ")}</p>
                <h2 className="team-card__name">{member.title}</h2>
                {member.content ? <div className="team-card__bio" dangerouslySetInnerHTML={{ __html: fillImgAlt(member.content, member.title) }} /> : null}
              </div>
            </Reveal>
          ))}
        </section>
      </div>
    </main>
  );
}
