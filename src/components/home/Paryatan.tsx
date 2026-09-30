/** पर्यटन — Tourism */
import { CategoryColumn } from "./CategoryColumn";

export function Paryatan() {
  return (
    <CategoryColumn
      id="paryatan"
      title="पर्यटन"
      href="/category/paryatan"
      leadImage="1506905925346-21bda4d32df4"
      leadTitle="आधुनिक कार्यस्थलबारे बीस आकर्षक चार्ट"
      items={[
        {
          title: "उद्योगले छोड्नुपर्ने नराम्रा बानी",
          imageUrl: "1552664730-d307ca884978",
        },
        {
          title: "कामका लागि यात्रा गर्दा हुने सामान्य गल्ती",
          imageUrl: "1486312338219-ce68d2c6f44d",
        },
      ]}
      delay={1}
    />
  );
}
