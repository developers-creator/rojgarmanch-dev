"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Post } from "@/types/content";
import { getNavBarLinks } from "@/lib/nav";
import { formatAdBadge, formatBsBadge } from "@/lib/dates";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useUi } from "@/components/providers/UiProvider";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";

type SiteNavProps = {
  flashNews: Post[];
  trending: Post[];
};

type NotifyTab = "taja" | "trending";

export function SiteNav({ flashNews, trending }: SiteNavProps) {
  const { dark_logo, white_logo } = useSettings();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const {
    menuOpen,
    notifyOpen,
    toggleMenu,
    toggleNotify,
    toggleSearch,
    openNotify,
    closeNotify,
    openShorts,
  } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [notifyTab, setNotifyTab] = useState<NotifyTab>("taja");
  const [dates, setDates] = useState({ ad: "—", bs: "—" });
  const [showBs, setShowBs] = useState(true);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const dateRowRef = useRef<HTMLDivElement>(null);
  const notifyBtnRef = useRef<HTMLButtonElement>(null);
  const [deskPos, setDeskPos] = useState<CSSProperties>({});
  const [isDesktop, setIsDesktop] = useState(false);
  const [notifyMounted, setNotifyMounted] = useState(false);
  const [notifyShown, setNotifyShown] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (notifyOpen) {
      setNotifyMounted(true);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setNotifyShown(true));
      });
      return () => window.cancelAnimationFrame(id);
    }

    setNotifyShown(false);
    const timeout = window.setTimeout(() => setNotifyMounted(false), 320);
    return () => window.clearTimeout(timeout);
  }, [notifyOpen]);

  useEffect(() => {
    const onScroll = () => {
      const masthead = document.querySelector(".masthead");
      if (masthead) {
        setScrolled(masthead.getBoundingClientRect().bottom <= 0);
        return;
      }
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setDates({ ad: formatAdBadge(), bs: formatBsBadge() });
    const id = window.setInterval(() => {
      setShowBs((current) => !current);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const placeDate = () => {
      const logo = logoRef.current;
      const row = dateRowRef.current;
      const track = row?.querySelector<HTMLElement>(".sticky-date__track");
      if (!logo || !track || !scrolled) return;
      if (window.matchMedia("(max-width: 991.98px)").matches) {
        track.style.removeProperty("--date-left");
        return;
      }
      const left =
        logo.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.style.setProperty("--date-left", `${Math.max(0, Math.round(left))}px`);
    };

    placeDate();
    const raf = window.requestAnimationFrame(placeDate);
    window.addEventListener("resize", placeDate);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", placeDate);
    };
  }, [scrolled]);

  useEffect(() => {
    const root = document.documentElement;
    const syncStickyH = () => {
      const nav = document.getElementById("site-nav");
      if (!nav) return;
      root.style.setProperty("--site-sticky-h", `${nav.offsetHeight}px`);
    };

    const raf = window.requestAnimationFrame(syncStickyH);
    window.addEventListener("resize", syncStickyH);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", syncStickyH);
    };
  }, [scrolled, pathname]);

  const openNotifyTab = (tab: NotifyTab) => {
    setNotifyTab(tab);
    if (notifyOpen && notifyTab === tab) {
      toggleNotify();
      return;
    }
    openNotify();
  };

  useEffect(() => {
    if (!notifyOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!window.matchMedia("(min-width: 992px)").matches) return;
      const target = event.target as Node;
      const root = document.querySelector(".notify");
      const panel = document.getElementById("notify-panel-desk");
      if (root?.contains(target) || panel?.contains(target)) return;
      closeNotify();
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [notifyOpen, closeNotify]);

  useEffect(() => {
    if (!notifyOpen || !isDesktop) return;

    const placeDropdown = () => {
      const btn = notifyBtnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const width = Math.min(420, window.innerWidth - 24);
      let left = Math.round(rect.right - width);
      left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
      const top = Math.round(rect.bottom + 10);
      const height = Math.min(600, window.innerHeight - top - 16);
      setDeskPos((prev) => {
        const next: CSSProperties = {
          position: "fixed",
          top,
          left,
          width,
          height,
          maxHeight: height,
        };
        if (
          prev.top === next.top &&
          prev.left === next.left &&
          prev.width === next.width &&
          prev.height === next.height
        ) {
          return prev;
        }
        return next;
      });
    };

    placeDropdown();
    window.addEventListener("resize", placeDropdown);
    window.addEventListener("scroll", placeDropdown, true);
    return () => {
      window.removeEventListener("resize", placeDropdown);
      window.removeEventListener("scroll", placeDropdown, true);
    };
  }, [notifyOpen, isDesktop]);

  const renderNotifyPanel = (mode: "dropdown" | "fullscreen") => {
    const activeList = flashNews && flashNews.length > 0 ? flashNews : trending;

    return (
      <div
        className={`notify__panel notify__panel--${mode}`}
        id={mode === "fullscreen" ? "notify-panel" : "notify-panel-desk"}
        role="dialog"
        aria-modal={mode === "fullscreen" ? true : undefined}
        style={mode === "dropdown" ? deskPos : undefined}
      >
        {/* Card Header Title */}
        <div className="notify__header">
          {mode === "fullscreen" && (
            <button
              className="notify__close"
              type="button"
              aria-label="बन्द गर्नुहोस्"
              onClick={closeNotify}
            >
              <Icon name="xmark" size={18} />
            </button>
          )}
        </div>

        <div className="notify__content">
          {/* Segmented Red Pill Tabs */}
          <div className="notify__pills-wrapper">
            <div className="notify__pills" role="tablist">
              <button
                type="button"
                role="tab"
                className={`notify__pill-btn${
                  notifyTab === "taja" ? " is-active" : ""
                }`}
                aria-selected={notifyTab === "taja"}
                onClick={() => setNotifyTab("taja")}
              >
                ताजा
              </button>
              <button
                type="button"
                role="tab"
                className={`notify__pill-btn${
                  notifyTab === "trending" ? " is-active" : ""
                }`}
                aria-selected={notifyTab === "trending"}
                onClick={() => setNotifyTab("trending")}
              >
                लोकप्रिय
              </button>
            </div>
          </div>

          {/* News List */}
          <div className="notify__list-scroll">
            <ul className="notify__list">
              {activeList && activeList.length > 0 ? (
                activeList.map((item) => (
                  <li key={item.id} className="notify__item">
                    <Link className="notify__link" href={item.href || "#"}>
                      {item.imageUrl ? (
                        <img
                          className="notify__thumb"
                          src={item.imageUrl}
                          alt={item.imageAlt || item.title || ""}
                          width={70}
                          height={70}
                          loading="lazy"
                        />
                      ) : null}
                      <div className="notify__item-body">
                        <h3 className="notify__item-title">{item.title}</h3>
                        {/* Only display date if the current tab is NOT "trending" */}
                        {notifyTab !== "trending" && item.dateLabel && (
                          <span className="notify__time">
                            <Icon name="clock" size={12} />
                            {item.dateLabel}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: "16px", textAlign: "center", color: "#666" }}>
                  कुनै समाचार उपलब्ध छैन।
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Link */}
        <div className="notify__footer">
          <Link href="/news" className="notify__footer-link">
            सबै समाचार हेर्नुहोस् <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    );
  };

  const notifyFullscreen =
    !isDesktop && notifyMounted ? (
      <div
        className={`notify-overlay${notifyShown ? " is-open" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeNotify();
        }}
      >
        {renderNotifyPanel("fullscreen")}
      </div>
    ) : null;

  const renderDateBadge = () => (
    <div className="sticky-date__badge">
      <span className="sticky-date__sizer" aria-hidden="true">
        {dates.bs.length >= dates.ad.length ? dates.bs : dates.ad}
      </span>
      <span
        className={`sticky-date__slide${showBs ? " is-active" : ""}`}
        aria-hidden={!showBs}
      >
        {dates.bs}
      </span>
      <span
        className={`sticky-date__slide${!showBs ? " is-active" : ""}`}
        aria-hidden={showBs}
      >
        {dates.ad}
      </span>
    </div>
  );

  return (
    <>
      <div
        className={`site-sticky${scrolled ? " is-scrolled" : ""}`}
        id="site-nav"
      >
        <div className="nav-bar">
          <div className="container">
            <div className="nav-bar__shell">
              <div className="nav-brand">
                <Link
                  className="nav-logo"
                  href="/"
                  aria-label="रोजगार मञ्च"
                  ref={logoRef}
                >
                  <img
                    className="logo logo--color"
                    src={dark_logo ? dark_logo : "/images/rojgar-manch-logo.svg"}
                    alt="रोजगार मञ्च"
                    width={283}
                    height={87}
                  />
                  <img
                    className="logo logo--white"
                    src={white_logo ? white_logo : "/images/rojgar-manch-whitelogo.svg"}
                    alt="रोजगार मञ्च"
                    width={283}
                    height={87}
                  />
                </Link>

                <div
                  className="sticky-date sticky-date--nav"
                  aria-label="मिति"
                >
                  <div className="sticky-date__track">{renderDateBadge()}</div>
                </div>
              </div>

              <nav className="nav" aria-label="मुख्य मेनु">
                {getNavBarLinks().map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href ||
                        pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      className={`nav__link${isActive ? " is-active" : ""}`}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      key={link.href}
                    >
                      {link.labelNe}
                    </Link>
                  );
                })}
              </nav>

              <div className="nav-actions">
                <div className="notify nav-actions__desk">
                  <button
                    ref={notifyBtnRef}
                    className="icon-btn notify__btn"
                    type="button"
                    aria-label="सूचना"
                    aria-expanded={notifyOpen}
                    aria-controls="notify-panel-desk"
                    onClick={() => {
                      setNotifyTab("taja");
                      toggleNotify();
                    }}
                  >
                    <Icon name="bell" size={18} />
                    <span className="notify__dot" aria-hidden="true" />
                  </button>
                  {isDesktop && notifyOpen
                    ? renderNotifyPanel("dropdown")
                    : null}
                </div>

                <button
                  className="icon-btn nav-actions__mobile"
                  type="button"
                  aria-label="सूचना"
                  aria-expanded={notifyOpen}
                  aria-controls="notify-panel"
                  onClick={() => {
                    setNotifyTab("taja");
                    toggleNotify();
                  }}
                >
                  <Icon name="bell" size={18} />
                  {flashNews.length > 0 ? (
                    <span className="icon-badge" aria-hidden="true">
                      {flashNews.length > 9
                        ? "९+"
                        : ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"][
                            flashNews.length
                          ]}
                    </span>
                  ) : null}
                </button>

                <button
                  className={`icon-btn theme-toggle${
                    theme === "dark" ? " is-dark" : ""
                  }`}
                  type="button"
                  aria-label={theme === "dark" ? "लाइट मोड" : "डार्क मोड"}
                  onClick={toggleTheme}
                >
                  <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
                </button>

                <button
                  className="icon-btn menu-toggle hamburger"
                  type="button"
                  aria-label={
                    menuOpen ? "मेनु बन्द गर्नुहोस्" : "मेनु खोल्नुहोस्"
                  }
                  aria-expanded={menuOpen}
                  aria-controls="fullscreen-menu"
                  onClick={toggleMenu}
                >
                  <svg
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    width="32"
                    height="32"
                    stroke="currentColor"
                    className="hamburger-mobile"
                  >
                    <rect x="2" y="9" width="12" height="2" rx="1" />
                    <rect x="2" y="15" width="12" height="2" rx="1" />
                    <rect x="2" y="21" width="12" height="2" rx="1" />
                    <circle
                      cx="23"
                      cy="16"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="27.5"
                      y1="20.5"
                      x2="30"
                      y2="23"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="sticky-date sticky-date--desk"
          ref={dateRowRef}
          aria-label="मिति"
        >
          <div className="container">
            <div className="sticky-date__track">{renderDateBadge()}</div>
          </div>
        </div>
      </div>

      <nav className="mobile-dock" aria-label="मोबाइल नेभिगेसन">
        <div className="mobile-dock__shell">
          <div className="mobile-dock__surface" aria-hidden="true" />

          <div className="mobile-dock__rail">
            <button
              type="button"
              className={`mobile-dock__item${notifyOpen ? " is-active" : ""}`}
              aria-label="सूचना"
              aria-expanded={notifyOpen}
              aria-controls="notify-panel"
              onClick={() => openNotifyTab("taja")}
            >
              <span className="mobile-dock__icon">
                <Icon name="bell" size={20} />
                {flashNews.length > 0 ? (
                  <em className="mobile-dock__badge" aria-hidden="true">
                    {flashNews.length > 9
                      ? "९+"
                      : ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"][
                          flashNews.length
                        ]}
                  </em>
                ) : null}
              </span>
              <span className="mobile-dock__label">सूचना</span>
            </button>

            <button
              type="button"
              className="mobile-dock__item"
              aria-label="रिल्स"
              onClick={() => {
                openShorts();
                if (pathname !== "/") {
                  router.push("/");
                }
              }}
            >
              <span className="mobile-dock__icon">
                <Icon name="clapperboard" size={20} />
              </span>
              <span className="mobile-dock__label">रिल्स</span>
            </button>

            <span className="mobile-dock__slot" aria-hidden="true" />

            <Link
              className={`mobile-dock__item${
                pathname.startsWith("/category/rojgar") ? " is-active" : ""
              }`}
              href="/category/rojgar"
            >
              <span className="mobile-dock__icon">
                <Icon name="briefcase" size={20} />
              </span>
              <span className="mobile-dock__label">अवसर</span>
            </Link>

            <button
              type="button"
              className="mobile-dock__item"
              aria-label="सर्च"
              onClick={toggleSearch}
            >
              <span className="mobile-dock__icon">
                <Icon name="magnifying-glass" size={20} />
              </span>
              <span className="mobile-dock__label">सर्च</span>
            </button>
          </div>

          <Link
            className={`mobile-dock__brand${
              pathname === "/" ? " is-active" : ""
            }`}
            href="/"
            aria-label="गृहपृष्ठ"
          >
            <Icon name="house" size={22} />
          </Link>
        </div>
      </nav>

      {notifyFullscreen}
    </>
  );
}