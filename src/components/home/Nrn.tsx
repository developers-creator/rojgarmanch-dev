/** एनआरएन — NRN (2-col stack list) */
import { unsplash as u } from "@/lib/media";
import Link from "next/link";

const left = [
  ["1559136555-9303baea8ebd", "आन्तरिक परियोजना पिच गर्दा हुने गल्तीहरू"],
  ["1519389950473-47ba0277781c", "उच्च प्रदर्शन टोलीले कोचिङबाट सिक्ने कुरा"],
  ["1486312338219-ce68d2c6f44d", "क्राफ्टमा चासो राख्नेले फलो गर्नुपर्ने स्रोतहरू"],
] as const;

const right = [
  ["1556761175-b413da4baf72", "एजेन्सीबाट इन-हाउस जाँदा फाइदा–बेफाइदा"],
  ["1600880292203-757bb62b4baf", "स्टार्टअप भूमिका वर्ष दिनमै किन अड्किन्छ"],
  ["1497366216548-37526070297c", "नयाँ टोलीमा जोडिने अघि सोध्नुपर्ने दस प्रश्न"],
] as const;

function StackColumn({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  return (
    <ul className="stack-list">
      {items.map(([image, title]) => (
        <li className="stack-item" key={title}>
          <Link
            className="stack-item__thumb"
            href="#article"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              className="img-cover"
              src={u(image, 200, 160)}
              alt={title}
              width={84}
              height={68}
              loading="lazy"
            />
          </Link>
          <div>
            <h3 className="stack-item__title line-2">
              <Link href="#article">{title}</Link>
            </h3>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Nrn() {
  return (
    <div className="nrn-stacks" id="nrn" aria-label="एनआरएन">
      <StackColumn items={left} />
      <StackColumn items={right} />
    </div>
  );
}
