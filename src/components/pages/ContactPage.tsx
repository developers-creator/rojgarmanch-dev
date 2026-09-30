import type { ContactContent } from "@/data/pages";
import type { SiteInfo } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { Icon, socialIconName } from "@/components/ui/Icon";
import { getContact, getSettings } from "@/lib/api";
import Link from "next/link";

type ContactPageProps = {
  content: ContactContent;
  site: SiteInfo;
};

export async function ContactPage({ content, site }: ContactPageProps) {

  const [contactData, settingsData] = await Promise.all([
    getContact(),
    getSettings(),
  ]);
  const payload = contactData?.data?.payload;

  const { darta_no, rojgar_insert_map_url, phone, email, location, social_handles, site_title, insert_iframe_url } = settingsData.data;

  return (
    <main id="main" className="site-page contact-page">
      <div className="container">
        <header className="site-page__head">
          <p className="site-page__en">{content.titleEn}</p>
          <h1 id="contact-title">{payload?.title ?? ""}</h1>
          <div
            className="site-page__lead"
            dangerouslySetInnerHTML={{ __html: payload?.content ?? "" }}
          />
        </header>

        <div className="contact-layout">
          <Reveal className="contact-details">
            <h2 className="contact-details__title">{site_title}</h2>
            <ul className="contact-details__list">
              <li>
                <Icon name="id-card" size={16} />
                  <span dangerouslySetInnerHTML={{ __html: darta_no }} />
              </li>
              <li>
                <Icon name="location" size={16} />
                <span>
                  <Link href={rojgar_insert_map_url} target="_blank">{location}</Link>
                </span>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
              </li>
              <li>
                <Icon name="envelope" size={16} />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>

            <ul className="contact-details__social" aria-label="सोसल मिडिया">
                {social_handles.map((item) => (
                <li key={item.choose_media}>
                  <a
                    href={item.insert_url}
                    aria-label={item.choose_media}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name={socialIconName(item.choose_media)} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="contact-map reveal-delay-1">
            <iframe
              className="contact-map__frame"
              title={`${site.address} — Google Map`}
              src={insert_iframe_url}
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
