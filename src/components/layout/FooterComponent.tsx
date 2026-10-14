import { MenuItem } from "@/types/menu"
import { Footer } from "./Footer"
import { getSiteInfo } from "@/data/home"
import { apiFetch } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"


const FooterComponent = async () => {
  const footerMenu = await getFooterMenu();
  return (
    <Footer site={getSiteInfo()} footerMenu={footerMenu.items} />
  )
}

export default FooterComponent


export const getFooterMenu = () =>
    apiFetch<{ items: MenuItem[] }>(
      ENDPOINTS.footerMenu,
      {
        revalidate: 300,
        tags: ["footer-menu"],
      },
    );