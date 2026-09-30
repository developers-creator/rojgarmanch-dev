/** कला + साहित्य */
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const rails = [
  {
    heading: "कला",
    href: "/category/kala",
    image: u("1513364776144-60967b0f800f", 640, 420),
    title: "रङ्गमञ्चमा नयाँ पुस्ताले फेरेको कथा भन्ने तरिका",
    items: [
      ["1460661419201-fd4cecdf8a8b", "स्थानीय कलाकारलाई मञ्च दिने साना ग्यालरीहरू"],
      ["1460661419201-fd4cecdf8a8b", "डिजिटल कलामा नेपाली हस्ताक्षर कसरी बलियो हुँदैछ"],
      ["1513475382585-d06e58bcb0e0", "संगीत अभ्यास कक्षबाट स्टुडियोसम्मको बाटो"],
    ],
  },
  {
    heading: "साहित्य",
    href: "/category/sahitya",
    image: u("1481627834876-b7833e8f5570", 640, 420),
    title: "नयाँ नेपाली उपन्यासले उठाएका तीन साझा प्रश्न",
    items: [
      ["1481627834876-b7833e8f5570", "कविता पढ्ने बानी फर्काउने साना उपाय"],
      ["1519681393784-d120267933ba", "अनुवादले खोल्ने विश्व साहित्यको झ्याल"],
      ["1507842217343-583bb7270b66", "लेखन कार्यशालाले सिकाउने अनुशासन"],
    ],
  },
] as const;

export function Kala() {
  return (
    <section className="duo-rail container" id="kala" aria-label="कला र साहित्य">
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
