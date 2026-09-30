/** एनआरएन + प्रवास */
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const rails = [
  {
    heading: "एनआरएन",
    href: "/category/nrn",
    image: u("1521737711867-e3b97375f902", 640, 420),
    title: "मध्य-करियरमा प्रमोशन खोल्ने पाँच व्यावहारिक कदम",
    items: [
      ["1556761175-5973dc0f32e7", "तलब वार्ताअघि तयार गर्नुपर्ने दस प्रमाण"],
      ["1600880292203-757bb62b4baf", "नयाँ भूमिका चाहिने संकेतहरू कसरी चिन्ने"],
      ["1454165804606-c3d57bc86b40", "रिज्यूमेमा नलेख्नुपर्ने सात सामान्य गल्ती"],
    ],
  },
  {
    heading: "प्रवास",
    href: "/category/pravas",
    image: u("1517245386807-bb43f82c33c4", 640, 420),
    title: "उत्पादन टोलीले रोज्ने सिकाइ स्ट्याक — कहाँबाट सुरु गर्ने",
    items: [
      ["1519389950473-47ba0277781c", "कार्यस्थलमा कोचिङबाट सिकिने चार बानी"],
      ["1486312338219-ce68d2c6f44d", "असिंक टोलीमा पनि सिकाइ कसरी जीवित राख्ने"],
      ["1551836022-d5d88e9218df", "पोर्टफोलियो बनाउँदा छुट्ने साझा कमजोरीहरू"],
    ],
  },
] as const;

export function Pravas() {
  return (
    <section className="duo-rail container" id="pravas" aria-label="एनआरएन र प्रवास">
      <div className="duo-rail__grid">
        {rails.map((rail, index) => (
          <Reveal
            className={`duo-rail__col${index ? " reveal-delay-1" : ""}`}
            key={rail.heading}
          >
            <SectionTitle href={rail.href}>{rail.heading}</SectionTitle>
            <div className="duo-rail__body">
              <article className="duo-rail__lead">
                <Link
                  className="duo-rail__lead-media"
                  href="#article"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    className="img-cover"
                    src={rail.image}
                    alt={rail.title}
                    width={640}
                    height={420}
                    loading="lazy"
                  />
                </Link>
                <h3 className="duo-rail__lead-title line-3">
                  <Link href="#article">{rail.title}</Link>
                </h3>
              </article>
              <ul className="duo-rail__list">
                {rail.items.map(([image, title]) => (
                  <li key={title}>
                    <Link className="duo-rail__item" href="#article">
                      <img
                        src={u(image, 160, 160)}
                        alt={title}
                        width={72}
                        height={72}
                        loading="lazy"
                      />
                      <span className="line-3">{title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
