/** खेल — Sports */
import { CategoryColumn } from "./CategoryColumn";

export function Khel() {
  return (
    <CategoryColumn
      id="khel"
      title="खेल"
      href="/category/khel"
      leadImage="1507679799987-c73779587ccf"
      leadTitle="दस प्रसिद्ध टोली असफलता कसरी रोक्न सकिन्थ्यो"
      items={[
        {
          title: "नयाँ प्लेबुक चाहिने संकेतहरू",
          imageUrl: "1461896836934-ffe607ba8211",
        },
        {
          title: "विश्वासिलो लकर रूम र उत्कृष्ट टोलीको साझा कुरा",
          imageUrl: "1517245386807-bb43f82c33c4",
        },
      ]}
    />
  );
}
