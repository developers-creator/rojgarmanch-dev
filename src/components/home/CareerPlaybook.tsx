import { CAREER_PLAYBOOK_ADS } from "@/lib/ads";
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

const tips = [
  {
    text: "करियर यात्रामा एकपटकमा एउटा स्पष्ट कदम मात्र लिनुहोस्।",
    image: "1521737711867-e3b97375f902",
    featured: true,
  },
  {
    text: "प्रतिक्रिया माग्नुहोस् — आफ्नो प्रगति बाहिरबाट पनि हेर्नुहोस्।",
  },
  {
    text: "रातमा भारी काम घटाउनुहोस्; दिनको मुख्य घण्टामा  काम गर्नुहोस्।",
  },
  {
    text: "साना लक्ष्य राख्नुहोस्, तर नियमित समीक्षा नछोड्नुहोस्।",
  },
  {
    text: "प्रतिक्रिया माग्नुहोस् — आफ्नो प्रगति बाहिरबाट पनि हेर्नुहोस्।",
  },
] as const;

/** करियर प्लेबुक — tip column + stacked ads */
export function CareerPlaybook() {
  return (
    <Reveal className="career-playbook reveal reveal-delay-2">
      <aside>
        <div className="career-playbook__panel">
          <SectionTitle href="#article" more={false}>
            करियर प्लेबुक
          </SectionTitle>
          <ul className="career-playbook__list">
            {tips.map((tip, index) =>
              "featured" in tip && tip.featured ? (
                <li
                  key={index}
                  className="career-playbook__item career-playbook__item--feature"
                >
                  <Link className="career-playbook__feature" href="#article">
                    <span className="career-playbook__feature-media">
                      <img
                        src={u(tip.image, 640, 360)}
                        alt=""
                        width={640}
                        height={360}
                        loading="lazy"
                      />
                    </span>
                    <p>{tip.text}</p>
                  </Link>
                </li>
              ) : (
                <li key={index} className="career-playbook__item">
                  <p>{tip.text}</p>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="career-playbook__ads" aria-label="विज्ञापन">
          {CAREER_PLAYBOOK_ADS.map((ad) => (
            <AdUnit
              key={ad.src}
              ad={ad}
              variant="aside"
              useMobileImage={false}
            />
          ))}
        </div>
      </aside>
    </Reveal>
  );
}
