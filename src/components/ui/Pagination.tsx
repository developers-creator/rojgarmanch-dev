import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { toNepaliDigits } from "@/lib/dates";
import type { Pagination as PaginationData } from "@/types/news";

type PaginationProps = {
  pagination?: PaginationData;
  /** Path the `?page=N` query is added to, e.g. "/publication". */
  basePath: string;
};

/** First, last and a window around the current page; `null` marks a gap. */
function visiblePages(page: number, total: number): (number | null)[] {
  const keep = new Set([1, total]);
  for (let n = page - 2; n <= page + 2; n++) {
    if (n > 1 && n < total) keep.add(n);
  }
  const sorted = [...keep].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((n, i) => {
    if (i && n - sorted[i - 1] > 1) out.push(null);
    out.push(n);
  });
  return out;
}

export function Pagination({ pagination, basePath }: PaginationProps) {
  if (!pagination || pagination.total_pages <= 1) return null;

  const { current_page: page, total_pages: totalPages } = pagination;
  const href = (n: number) => (n <= 1 ? basePath : `${basePath}?page=${n}`);

  const arrow = (dir: "prev" | "next", target: number | null) => {
    const icon = (
      <Icon name={dir === "prev" ? "chevron-left" : "chevron-right"} size={14} />
    );
    return target === null ? (
      <span className="category-pagination__arrow is-disabled" aria-disabled="true">
        {icon}
      </span>
    ) : (
      <Link
        className="category-pagination__arrow"
        href={href(target)}
        rel={dir}
        aria-label={dir === "prev" ? "अघिल्लो पृष्ठ" : "अर्को पृष्ठ"}
      >
        {icon}
      </Link>
    );
  };

  return (
    <nav className="category-pagination" aria-label="पृष्ठहरू">
      {arrow("prev", pagination.has_previous ? page - 1 : null)}
      <ol className="category-pagination__pages">
        {visiblePages(page, totalPages).map((n, i) => (
          <li key={n ?? `gap-${i}`}>
            {n === null ? (
              <span className="category-pagination__num" aria-hidden="true">
                …
              </span>
            ) : n === page ? (
              <span className="category-pagination__num is-current" aria-current="page">
                {toNepaliDigits(n)}
              </span>
            ) : (
              <Link className="category-pagination__num" href={href(n)}>
                {toNepaliDigits(n)}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {arrow("next", pagination.has_next ? page + 1 : null)}
    </nav>
  );
}
