"use client";

import { useEffect, useState } from "react";
import type { SiteInfo } from "@/types/content";
import { toNepaliDigits } from "@/lib/dates";
import { Icon, socialIconName } from "@/components/ui/Icon";
import Link from "next/link";

type FooterProps = {
  site: SiteInfo;
};

export function Footer({ site }: FooterProps) {
  const [year, setYear] = useState("२०२६");

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
                <span>{site.registrationNo}</span>
              </li>
              <li>
                <Icon name="location" size={14} />
                <span>{site.address}</span>
              </li>
              <li>
                <Icon name="phone" size={14} />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} itemProp="telephone">
                  {site.phone}
                </a>
              </li>
              <li>
                <Icon name="envelope" size={14} />
                <a href={`mailto:${site.email}`} itemProp="email">
                  {site.email}
                </a>
              </li>
            </ul>
            <ul
              className="footer__social-icons footer__social-icons--brand"
              aria-label="सोसल मिडिया"
            >
              {site.social.map((item) => (
                <li key={item.icon}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name={socialIconName(item.icon)} size={16} />
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
              {site.quickLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href}>{link.label}</Link>
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
              {site.team.map((member) => (
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
              src="/images/rojgar-manch-logo.svg"
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              loading="lazy"
              decoding="async"
            />
            <img
              className="logo logo--white"
              src="/images/rojgar-manch-whitelogo.svg"
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="footer__copy footer__copy--end">
            Developed by <Link href="#">Webtech Nepal</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
