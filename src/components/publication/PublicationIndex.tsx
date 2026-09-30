import Link from "next/link";
import type { PublicationIssue } from "@/data/publications";

type PublicationIndexProps = {
  issues: PublicationIssue[];
};

/** Archive of all magazine issues */
export function PublicationIndex({ issues }: PublicationIndexProps) {
  return (
    <main id="main" className="pub-index">
      <div className="container">
        <header className="pub-index__head">
          <h1>प्रकाशन</h1>
          <p>{issues.length} अंक · शीर्षकमा क्लिक गरी फ्लिपबुक खोल्नुहोस्</p>
        </header>
        <ul className="pub-index__grid">
          {issues.map((issue) => (
            <li key={issue.slug}>
              <article className="pub-index__card">
                <div className="pub-index__media">
                  <img
                    src={issue.cover}
                    alt=""
                    width={360}
                    height={480}
                    loading="lazy"
                  />
                </div>
                <em>
                  {issue.kicker} · {issue.date}
                </em>
                <h2>
                  <Link href={`/publication/${issue.slug}`}>{issue.title}</Link>
                </h2>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
