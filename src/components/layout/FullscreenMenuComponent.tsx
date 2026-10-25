import type { MenuData } from "@/types/menu";
import { FullscreenMenu } from "./FullscreenMenu";
import { toFrontItem } from "./SiteNavComponent";
import { apiFetch } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";


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
    apiFetch<MenuData>(ENDPOINTS.headerMenu, {
      revalidate: 1800,
      tags: ["header-menu"],
    })
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []);
  
export const getAdditionalMenu = () =>
    apiFetch<MenuData>(ENDPOINTS.additionalMenu, {
      revalidate: 1800,
      tags: ["additional-menu"],
    })
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []);