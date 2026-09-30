/** ताजा समाचार — Fresh News */
import type { Post } from "@/types/content";
import { ADS } from "@/lib/ads";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

type TajaSamacharProps = {
  items: Post[];
};

export function TajaSamachar({ items }: TajaSamacharProps) {
  return (
    <Reveal className="recent">
      <div>
        <SectionTitle more={false}>ताजा समाचार</SectionTitle>
        <ul className="recent__list">
          {items.map((item) => (
            <li className="recent__item" key={item.id}>
              <h3 className="recent__title line-2">
                <Link href={item.href}>{item.title}</Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
      <AdUnit ad={ADS.belaco} variant="aside" />
    </Reveal>
  );
}
