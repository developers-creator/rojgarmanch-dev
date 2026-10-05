/** खेल — Sports */
import { CategoryColumn } from "./CategoryColumn";
import { getSports } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

export async function Khel() {
  const res = await getSports().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;

  return (
    <CategoryColumn
      id="khel"
      title={category.name}
      href={`/category/${category.slug}`}
      lead={items[0]}
      posts={items.slice(1, 3)}
    />
  );
}
