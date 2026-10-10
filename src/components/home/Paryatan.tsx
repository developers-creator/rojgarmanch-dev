/** पर्यटन — Tourism */
import { CategoryColumn } from "./CategoryColumn";
import { getTravel } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

export async function Paryatan() {
  const res = await getTravel().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;

  return (
    <CategoryColumn
      id="paryatan"
      title={category.name}
      href={`/${category.slug}`}
      lead={items[0]}
      posts={items.slice(1, 3)}
      delay={1}
    />
  );
}
