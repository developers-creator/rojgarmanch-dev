import { LeadListColumn } from "./LeadListColumn";
import { getWorld } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

/** विश्व */
export async function Bishwa() {
  const res = await getWorld().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;

  return (
    <LeadListColumn
      id="bishwa"
      title={category.name}
      href={`/${category.slug}`}
      lead={items[0]}
      posts={items.slice(1, 4)}
      delay={1}
    />
  );
}
