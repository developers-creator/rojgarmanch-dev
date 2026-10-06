"use client";

import { useRef, useState } from "react";
import { getNavBarLinks, getNavMoreLinks } from "@/lib/nav";
import { useUi } from "@/components/providers/UiProvider";
import { Icon, socialIconName, type IconName } from "@/components/ui/Icon";
import Link from "next/link";
import { useSettings } from "../providers/SettingsProvider";
import { SocialHandle } from "@/types/settings";
import type { MenuItem } from "@/types/menu";

const searchDefaults = ["रोजगार", "सीप", "लोक सेवा", "वैदेशिक रोजगार", "आईटी", "तालिम"];

type FullscreenMenuProps = {
  headerMenu?: MenuItem[];
  additionalMenu?: MenuItem[];
};

type FsLink = { id: string | number; href: string; label: string; sub: string; target?: string };

const fromMenu = (items: MenuItem[]): FsLink[] =>
  items.map((m) => ({
    id: m.id,
    href: m.url,
    label: m.title,
    sub: m.description,
    target: m.target,
  }));

const fromStatic = (links: ReturnType<typeof getNavBarLinks>): FsLink[] =>
  links.map((l) => ({ id: l.href, href: l.href, label: l.labelNe, sub: l.labelEn }));

export function FullscreenMenu({
  headerMenu = [],
  additionalMenu = [],
}: FullscreenMenuProps) {
  const { menuOpen, closeMenu } = useUi();
  const [searchTerms, setSearchTerms] = useState(searchDefaults);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { social_handles } = useSettings();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return inputRef.current?.focus();
    setSearchTerms((items) =>
      [searchQuery, ...items.filter((item) => item !== searchQuery)].slice(0, 8)
    );
    closeMenu();
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!menuOpen) return null;

  // Prefer the CMS menus; fall back to the static links when a menu is empty.
  const barLinks = headerMenu.length
    ? fromMenu(headerMenu)
    : fromStatic(getNavBarLinks());
  const moreLinks = additionalMenu.length
    ? fromMenu(additionalMenu)
    : fromStatic(getNavMoreLinks());

  return (
    <div
      className="fs-menu is-open"
      id="fullscreen-menu"
      aria-hidden={!menuOpen}
    >
      

      <div className="fs-menu__backdrop" onClick={closeMenu} />
      <div
        className="fs-menu__panel"
        role="dialog"
        aria-modal="true"
        aria-label="मुख्य मेनु"
      >
        <div className="fs-menu__inner container">
          <div className="fs-menu__top">
            <Link className="fs-menu__brand" href="/">
              <img
                className="logo logo--color"
                src="/images/rojgar-manch-logo.svg"
                alt="रोजगार मञ्च"
                width={283}
                height={87}
              />
              <img
                className="logo logo--white"
                src="/images/rojgar-manch-whitelogo.svg"
                alt="रोजगार मञ्च"
                width={283}
                height={87}
              />
            </Link>
            <button
              className="fs-menu__close"
              type="button"
              aria-label="मेनु बन्द गर्नुहोस्"
              onClick={closeMenu}
            >
              <Icon name="xmark" size={22} />
            </button>
          </div>

          <form className="fs-menu__search search-box" role="search" onSubmit={handleSearch}>
            <label className="sr-only" htmlFor="fs-search">
              किवर्ड खोज्नुहोस्
            </label>
            <input
              ref={inputRef}
              id="fs-search"
              type="search"
              name="q"
              placeholder="किवर्ड लेख्नुहोस्…"
              autoComplete="off"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button className="search-box__submit" type="submit" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "block", minWidth: "20px", minHeight: "20px" }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <nav className="fs-menu__nav" aria-label="पूर्ण मेनु">
            {barLinks.map((link, index) => (
              <Link
                className="fs-menu__link"
                href={link.href}
                style={{ ["--i" as string]: index }}
                target={link.target || undefined}
                onClick={closeMenu}
                key={link.id}
              >
                <span>{link.label}</span>
                <small>{link.sub}</small>
              </Link>
            ))}
            {moreLinks.length ? (
              <>
                <p className="fs-menu__group">थप</p>
                {moreLinks.map((link, index) => (
                  <Link
                    className="fs-menu__link"
                    href={link.href}
                    style={{ ["--i" as string]: barLinks.length + index }}
                    target={link.target || undefined}
                    onClick={closeMenu}
                    key={link.id}
                  >
                    <span>{link.label}</span>
                    <small>{link.sub}</small>
                  </Link>
                ))}
              </>
            ) : null}
          </nav>
        </div>

        {/* Sticky Bottom Social Media Bar */}
        <div className="fs-menu__footer">
  <div className="container">
    <div className="fs-menu__socials-wrapper">
      <span className="fs-menu__socials-title">Follow Us:</span>
      <div className="fs-menu__socials">
        {social_handles.map((item: SocialHandle) => (
          <a
            key={item.choose_media}
            href={item.insert_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.choose_media}
            className="fs-menu__social-link"
          >
            <Icon name={socialIconName(item.choose_media)} size={18} />
          </a>
        ))}
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}