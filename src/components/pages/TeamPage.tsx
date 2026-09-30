import type { TeamMember } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";

type TeamPageProps = {
  members: TeamMember[];
};

export function TeamPage({ members }: TeamPageProps) {
  return (
    <main id="main" className="site-page team-page">
      <div className="container">
        <header className="site-page__head">
          <p className="site-page__en">Our team</p>
          <h1 id="team-title">हाम्रो समूह</h1>
          <p className="site-page__lead">
            सम्पादकीय कक्षदेखि फिल्ड संवाददातासम्म — रोजगार मञ्च बनाउने टोली।
          </p>
        </header>

        <section className="team-grid" aria-label="टोली सदस्य">
          {members.map((member, index) => (
            <Reveal
              key={`${member.role}-${member.name}`}
              className={`team-card${index ? ` reveal-delay-${Math.min((index % 3) + 1, 3)}` : ""}`}
            >
              <div className="team-card__media">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
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
                <p className="team-card__role">{member.role}</p>
                <h2 className="team-card__name">{member.name}</h2>
                {member.bio ? <p className="team-card__bio">{member.bio}</p> : null}
              </div>
            </Reveal>
          ))}
        </section>
      </div>
    </main>
  );
}
