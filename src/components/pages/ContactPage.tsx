import type { ContactContent } from "@/data/pages";
import type { SiteInfo } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { Icon, socialIconName } from "@/components/ui/Icon";

type ContactPageProps = {
  content: ContactContent;
  site: SiteInfo;
};

export function ContactPage({ content, site }: ContactPageProps) {
  return (
    <main id="main" className="site-page contact-page">
      <div className="container">
        <header className="site-page__head">
          <p className="site-page__en">{content.titleEn}</p>
          <h1 id="contact-title">{content.titleNe}</h1>
          <p className="site-page__lead">{content.lead}</p>
        </header>

        <div className="contact-layout">
          <Reveal className="contact-details">
            <h2 className="contact-details__title">{site.name}</h2>
            <ul className="contact-details__list">
              <li>
                <Icon name="id-card" size={16} />
                <span>{site.registrationNo}</span>
              </li>
              <li>
                <Icon name="location" size={16} />
                <span>{site.address}</span>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </li>
              <li>
                <Icon name="envelope" size={16} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>

            <ul className="contact-details__social" aria-label="सोसल मिडिया">
              {site.social.map((item) => (
                <li key={item.icon}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name={socialIconName(item.icon)} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="contact-map reveal-delay-1">
            <iframe
              className="contact-map__frame"
              title={`${site.address} — Google Map`}
              src={content.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
