import { LeadListColumn } from "./LeadListColumn";
import { getEnglishHeadline } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

/** English Headline */
export async function EnglishHeadline() {
  const res = await getEnglishHeadline().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;

  return (
    <LeadListColumn
      id="english-headline"
      title={category.name}
      href={`/${category.slug}`}
      lead={items[0]}
      posts={items.slice(1, 4)}
      delay={2}
    />
  );
}
