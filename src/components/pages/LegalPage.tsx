import { notFound } from "next/navigation";
import { fillImgAlt } from "@/lib/cmsHtml";
import { Reveal } from "@/components/motion/Reveal";
import type { DefaultPageResponse } from "@/types/page";

type LegalPageProps = {
  eyebrow: string;
  load: () => Promise<DefaultPageResponse>;
};

export async function LegalPage({ eyebrow, load }: LegalPageProps) {
  const page = (await load().catch(() => null))?.data;
  if (!page) notFound();

  const title = page.payload?.title || page.title;
  const content = page.payload?.content ?? "";

  return (
    <main id="main" className="site-page legal-page">
      <div className="container">
        <header className="site-page__head">
          <p className="site-page__en">{eyebrow}</p>
          <h1 id="legal-title">{title}</h1>
        </header>

        <Reveal className="legal-content">
          <div dangerouslySetInnerHTML={{ __html: fillImgAlt(content, title) }} />
        </Reveal>
      </div>
    </main>
  );
}
