import Link from "next/link";
import { publicationSlug } from "@/lib/publication";
import { decodeEntities } from "@/lib/text";
import { Pagination } from "@/components/ui/Pagination";
import { toNepaliDigits } from "@/lib/dates";
import type { Pagination as PaginationData, Publication } from "@/types/news";

type PublicationIndexProps = {
  issues: Publication[];
  pagination?: PaginationData;
};

/** Archive of all magazine issues */
export function PublicationIndex({ issues, pagination }: PublicationIndexProps) {
  return (
    <main id="main" className="pub-index">
      <div className="container">
        <header className="pub-index__head">
          <h1>प्रकाशन</h1>
          <p>{toNepaliDigits(pagination?.total ?? issues.length)} अंक · शीर्षकमा क्लिक गरी फ्लिपबुक खोल्नुहोस्</p>
        </header>
        <ul className="pub-index__grid">
          {issues.map((issue) => (
            <li key={issue.id}>
              <article className="pub-index__card">
                <div className="pub-index__media">
                  {issue.featured_image ? (
                    <img
                      src={issue.featured_image}
                      alt={decodeEntities(issue.title)}
                      width={360}
                      height={480}
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <em>
                  {issue.sub_title
                    ? `${decodeEntities(issue.sub_title)} · ${issue.date}`
                    : issue.date}
                </em>
                <h2>
                  <Link href={`/publication/${encodeURIComponent(publicationSlug(issue.slug))}`}>
                    {decodeEntities(issue.title)}
                  </Link>
                </h2>
              </article>
            </li>
          ))}
        </ul>
        <Pagination pagination={pagination} basePath="/publication" />
      </div>
    </main>
  );
}
