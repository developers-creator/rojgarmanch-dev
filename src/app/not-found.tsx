import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "पृष्ठ फेला परेन — रोजगार मञ्च",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { label: "रोजगार", href: "/employment/" },
  { label: "अन्तर्वार्ता", href: "/interview/" },
  { label: "व्यवसाय", href: "/business/" },
  { label: "वैदेशिक रोजगार", href: "/abroad/" },
  { label: "विचार", href: "/opinion/" },
];

export default function NotFound() {
  return (
    <SiteChrome flashNews={[]} trending={[]}>
      <main id="main" className="not-found">
        <div className="container not-found__inner">
          <p className="not-found__code" aria-hidden="true">
            ४०४
          </p>
          <h1 className="not-found__title">पृष्ठ फेला परेन</h1>
          <p className="not-found__text">
            तपाईंले खोजेको पृष्ठ सारिएको, हटाइएको वा ठेगाना गलत हुन सक्छ। खोज्नुहोस्
            वा तलका लिंकबाट अगाडि बढ्नुहोस्।
          </p>

          <form className="not-found__search" action="/search/" method="get" role="search">
            <input
              type="search"
              name="q"
              placeholder="समाचार, विषय वा लेखक खोज्नुहोस्"
              aria-label="खोज्नुहोस्"
              required
            />
            <button type="submit" className="btn btn--dark">
              खोज्नुहोस्
            </button>
          </form>

          <div className="not-found__actions">
            <Link href="/" className="btn btn--dark">
              गृहपृष्ठमा फर्कनुहोस्
            </Link>
          </div>

          <ul className="not-found__chips" aria-label="लोकप्रिय श्रेणी">
            {SUGGESTIONS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </SiteChrome>
  );
}
