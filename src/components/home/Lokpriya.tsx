/** लोकप्रिय — Popular */
import type { Post } from "@/types/content";
import { ADS } from "@/lib/ads";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

type LokpriyaProps = {
  items: Post[];
};

export function Lokpriya({ items }: LokpriyaProps) {
  return (
    <section id="popular" aria-labelledby="popular-title">
      <SectionTitle more={false}>
        <span id="popular-title">लोकप्रिय</span>
      </SectionTitle>
      <Reveal className="ranked reveal-delay-2">
        <ol className="ranked__list">
          {items.map((item, index) => (
            <li className="ranked__item" key={item.id}>
              <span className="ranked__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="ranked__title line-2">
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                {item.excerpt ? (
                  <p className="ranked__excerpt line-2">{item.excerpt}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        <AdUnit ad={ADS.hbl} variant="aside" />
      </Reveal>
    </section>
  );
}
