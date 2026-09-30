import { LeadListColumn } from "./LeadListColumn";

/** विश्व */
export function Bishwa() {
  return (
    <LeadListColumn
      id="bishwa"
      title="विश्व"
      href="/category/bishwa"
      metaByline="कबीर सेन"
      leadTitle="विश्व श्रम बजारमा नेपाली सीप कहाँ बढी मागिँदैछ"
      image="1486406146926-c627a92ad1ab"
      items={[
        ["युरोपमा कामदार नीति फेरिँदा के हेर्ने", "प्रिया नायर"],
        ["एआईले विश्व रोजगारमा ल्याएको नयाँ रेखा", "रवि थापा"],
        ["खाडी मुलुकको नयाँ करार मोडेल बुझ्ने तरिका", "मोहन सुवेदी"],
      ]}
      delay={1}
    />
  );
}
