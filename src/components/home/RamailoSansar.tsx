/** रमाइलो संसार */
import { toPost } from "@/lib/posts";
import { LeadListColumn } from "./LeadListColumn";
import { getRamailoSansar } from "@/lib/api/endpoints";

export async function RamailoSansar() {
  const res = await getRamailoSansar().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;

  return (
    <LeadListColumn
      id="ramailo-sansar"
      title={category.name}
      href={`/${category.slug}`}
      lead={items[0]}
      posts={items.slice(1, 4)}
    />
  );
}
