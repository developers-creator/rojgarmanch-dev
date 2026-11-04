import type { MenuData } from "@/types/menu";
import { FullscreenMenu } from "./FullscreenMenu";
import { toFrontItem } from "./SiteNavComponent";
import { apiFetch } from "@/lib/api/client";
import { ENDPOINTS, MENU_OPTIONS } from "@/lib/api/endpoints";


const FullscreenMenuComponent = async () => {
  const [headerMenu, additionalMenu] = await Promise.all([
    getHeaderMenu(),
    getAdditionalMenu(),
  ]);

  return (
    <FullscreenMenu headerMenu={headerMenu} additionalMenu={additionalMenu} />
  );
};

export default FullscreenMenuComponent;

export const getHeaderMenu = () =>
    apiFetch<MenuData>(ENDPOINTS.headerMenu, MENU_OPTIONS)
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []);
  
export const getAdditionalMenu = () =>
    apiFetch<MenuData>(ENDPOINTS.additionalMenu, MENU_OPTIONS)
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []);