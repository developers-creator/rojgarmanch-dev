/** देश/समाज */
import { CategoryColumn } from "./CategoryColumn";

export function DeshSamaj() {
  return (
    <CategoryColumn
      id="desh-samaj"
      title="देश/समाज"
      href="/category/desh-samaj"
      leadImage="1517245386807-bb43f82c33c4"
      leadTitle="गाउँ फर्केर उद्यम थालेका युवा — केले टिक्छ, केले टुट्छ"
      items={[
        {
          title: "स्थानीय तहमा सेवा प्रवाह सुधार्ने पाँच अभ्यास",
          imageUrl: "1559136555-9303baea8ebd",
        },
        {
          title: "शहर बसाइँसराइले परिवारमा पारेको प्रभाव",
          imageUrl: "1521737711867-e3b97375f902",
        },
        {
          title: "सामुदायिक वनले सिकाएको साझा जिम्मेवारी",
          imageUrl: "1556761175-b413da4baf72",
        },
      ]}
      delay={2}
    />
  );
}
