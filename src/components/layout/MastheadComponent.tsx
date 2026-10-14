import { Masthead } from "./Masthead";
import { getAds } from "@/lib/api/endpoints";

const MastheadComponent = async () => {
  const allAds = await getAds()
    .then((res) => res.data)
    .catch(() => null);
  const headerAds = allAds?.header_ads ?? null;

  return <Masthead headerAds={headerAds} />;
};

export default MastheadComponent;
