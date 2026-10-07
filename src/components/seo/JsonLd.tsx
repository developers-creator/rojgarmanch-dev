import { loadSeo, schemaJson } from "@/lib/seo";

/** Renders the CMS-provided schema.org JSON-LD for a page path. */
export async function JsonLd({ path }: { path: string }) {
  const json = schemaJson(await loadSeo(path));
  if (!json) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
