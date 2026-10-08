"use client";

import { useEffect, useState } from "react";
import type { SiteInfo } from "@/types/content";
import { toNepaliDigits } from "@/lib/dates";
import { Icon, socialIconName } from "@/components/ui/Icon";
import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";
import { SocialHandle } from "@/types/settings";
import type { MenuItem } from "@/types/menu";

type FooterProps = {
  site: SiteInfo;
  footerMenu?: MenuItem[];
};

export function Footer({ site, footerMenu = [] }: FooterProps) {
  const [year, setYear] = useState("२०२६");

  const { 
    darta_no, rojgar_insert_map_url, phone, email, location, social_handles, white_logo, dark_logo,
    chief_administrator,
    advisory_editor,
    editor,
    assistant_editor,
    columnists,
    correspondents,
  } = useSettings();

  // Prefer the CMS footer menu; fall back to the static links if it is empty.
  const quickLinks: Pick<MenuItem, "id" | "title" | "url" | "target">[] =
    footerMenu.length
      ? footerMenu
      : site.quickLinks.map((l, i) => ({
          id: i,
          title: l.label,
          url: l.href,
          target: "",
        }));

  const team_members = [
    {
      role: "प्रमुख व्यवस्थापक",
      name: chief_administrator,
    },
    {
      role: "सल्लाहकार सम्पादक",
      name: advisory_editor,
    },
    {
      role: "सम्पादक",
      name: editor,
    },
    {
      role: "सह सम्पादक",
      name: assistant_editor,
    },
    {
      role: "स्तम्भकार",
      name: columnists,
    },
    {
      role: "संवाददाता",
      name: correspondents,
    },
  ];



  useEffect(() => {
    setYear(toNepaliDigits(new Date().getFullYear()));
  }, []);

  return (
    <footer
      className="footer"
      id="about"
      itemScope
      itemType="https://schema.org/NewsMediaOrganization"
    >
      <div className="container footer__inner">
        <div className="footer__cols">
          <section
            className="footer__col footer__col--brand"
            aria-labelledby="footer-org"
          >
            <h2 className="footer__title" id="footer-org" itemProp="name">
              {site.name}
            </h2>
            <ul className="footer__info">
              <li>
                <Icon name="id-card" size={14} />
                <span dangerouslySetInnerHTML={{ __html: darta_no }} />
              </li>
              <li>
                <Icon name="location" size={14} />
                <span>
                  <Link href={rojgar_insert_map_url} target="_blank">{location}</Link>
                </span>
              </li>
              <li>
                <Icon name="phone" size={14} />
                <a href={`tel:${phone.replace(/\s/g, "")}`} itemProp="telephone">
                  {phone}
                </a>
              </li>
              <li>
                <Icon name="envelope" size={14} />
                <a href={`mailto:${email}`} itemProp="email">
                  {email}
                </a>
              </li>
            </ul>
            <ul
              className="footer__social-icons footer__social-icons--brand"
              aria-label="सोसल मिडिया"
            >
              {social_handles.map((item: SocialHandle) => (
                <li key={item.choose_media}>
                  <a
                    href={item.insert_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.choose_media} मा हामीलाई फलो गर्नुहोस्`}
                  >
                    <Icon name={socialIconName(item.choose_media)} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer__col" aria-labelledby="footer-links-title">
            <h3 className="footer__title" id="footer-links-title">
              क्विक लिंक
            </h3>
            <ul className="footer__quick">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    target={link.target || undefined}
                    rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="footer__col footer__col--team"
            aria-labelledby="footer-team-title"
          >
            <h3 className="footer__title" id="footer-team-title">
              <Link href="/team">हाम्रो समूह</Link>
            </h3>
            <dl className="footer__people">
              {team_members.map((member) => (
                <div key={member.role}>
                  <dt>{member.role}</dt>
                  <dd>{member.name}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy footer__copy--start">
            Copyright © {year} Rojgar Media Pvt. Ltd. All rights reserved.
          </p>
          <Link
            className="footer__badge"
            href="/"
            aria-label="रोजगार मञ्च गृहपृष्ठ"
          >
            <img
              className="logo logo--color"
              src={dark_logo ? dark_logo : "/images/rojgar-manch-logo.svg"}
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              loading="lazy"
              decoding="async"
            />
            <img
              className="logo logo--white"
              src={white_logo ? white_logo : "/images/rojgar-manch-whitelogo.svg"}
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="footer__copy footer__copy--end">
            Developed by <Link href="https://webtechnepal.com/" target="_blank">Webtech Nepal</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
