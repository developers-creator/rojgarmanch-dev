import type { MenuData } from "@/types/menu";
import { Footer } from "./Footer";
import { toFrontItem } from "./SiteNavComponent";
import { getSiteInfo } from "@/data/home";
import { apiFetch } from "@/lib/api/client";
import { ENDPOINTS, MENU_OPTIONS } from "@/lib/api/endpoints";

// Falls back to the static links in Footer when the menu can't be loaded.
const getFooterMenu = () =>
  apiFetch<MenuData>(ENDPOINTS.footerMenu, MENU_OPTIONS)
    .then((res) => res.data.items.map(toFrontItem))
    .catch(() => []);

const FooterComponent = async () => {
  const footerMenu = await getFooterMenu();
  return <Footer site={getSiteInfo()} footerMenu={footerMenu} />;
};

export default FooterComponent;
