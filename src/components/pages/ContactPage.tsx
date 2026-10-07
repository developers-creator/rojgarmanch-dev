import { Reveal } from "@/components/motion/Reveal";
import { Icon, socialIconName } from "@/components/ui/Icon";
import { getContact, getSettingsOrEmpty } from "@/lib/api";
import Link from "next/link";

export async function ContactPage() {
  const [contactData, settings] = await Promise.all([
    getContact().catch(() => null),
    getSettingsOrEmpty(),
  ]);
  const payload = contactData?.data?.payload;

  const {
    darta_no = "",
    rojgar_insert_map_url = "",
    phone = "",
    email = "",
    location = "",
    site_title = "",
    insert_iframe_url = "",
  } = settings;
  const social_handles = settings.social_handles ?? [];

  return (
    <main id="main" className="site-page contact-page">
      <div className="container">
        <header className="site-page__head">
          <p className="site-page__en">Contact</p>
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
              {darta_no ? (
                <li>
                  <Icon name="id-card" size={16} />
                  <span dangerouslySetInnerHTML={{ __html: darta_no }} />
                </li>
              ) : null}
              {location ? (
                <li>
                  <Icon name="location" size={16} />
                  <span>
                    {rojgar_insert_map_url ? (
                      <Link href={rojgar_insert_map_url} target="_blank">{location}</Link>
                    ) : (
                      location
                    )}
                  </span>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <Icon name="phone" size={16} />
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <Icon name="envelope" size={16} />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ) : null}
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

          {insert_iframe_url ? (
            <Reveal className="contact-map reveal-delay-1">
              <iframe
                className="contact-map__frame"
                title={`${location || site_title} — Google Map`}
                src={insert_iframe_url}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </main>
  );
}
