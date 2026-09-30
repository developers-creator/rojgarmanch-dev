import { LeadListColumn } from "./LeadListColumn";

/** English Headline */
export function EnglishHeadline() {
  return (
    <LeadListColumn
      id="english-headline"
      title="English Headline"
      href="/category/english-headline"
      metaByline="Anya Sharma"
      leadTitle="What global hiring managers now ask Nepali candidates first"
      image="1521737604893-d14cc237f11d"
      items={[
        ["Five signals your remote role will last", "Samuel Rao"],
        ["How diaspora networks change a job search", "Lori West"],
        ["A plain guide to cross-border contracts", "Joan Wallace"],
      ]}
      delay={2}
    />
  );
}
