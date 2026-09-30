import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
const episodes = [["1598550476439-6847785fcea6","एपिसोड १२ — तलब वार्ताको वास्तविकता"],["1478737270239-2f02b77fc618","एपिसोड ११ — रिमोट टोलीको दिनचर्या"],["1559136555-9303baea8ebd","एपिसोड १० — पहिलो जागिरका पाठ"]];
/** टि. भी. — TV */
export function TV() {
 return <section className="container more-band" id="tv" aria-labelledby="tv-title"><SectionTitle href="/category/tv"><span id="tv-title">टि. भी.</span></SectionTitle><div className="tv-rail"><Reveal className="duo-rail__lead reveal"><Link className="duo-rail__lead-media" href="#article" tabIndex={-1} aria-hidden="true"><img className="img-cover" src={u("1574717024653-61fd2cf4d44d",640,420)} alt="भिडियो स्टुडियो" width="640" height="420" loading="lazy" /></Link><h3 className="duo-rail__lead-title line-3"><Link href="#article">करियर कुराकानी: प्रबन्धकहरूले भर्नामा के खोज्छन्</Link></h3></Reveal><Reveal className="duo-rail__list reveal reveal-delay-1"><ul>{episodes.map(([image,title]) => <li key={title}><Link className="duo-rail__item" href="#article"><img src={u(image,160,160)} alt={title} width="72" height="72" loading="lazy" /><span className="line-3">{title}</span></Link></li>)}</ul></Reveal></div></section>;
}
