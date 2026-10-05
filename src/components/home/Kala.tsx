/** कला + साहित्य */
import { getKala, getSahitya } from "@/lib/api/endpoints";
import { DuoRail } from "./DuoRail";

export async function Kala() {
  const columns = await Promise.all([
    getKala().catch(() => null),
    getSahitya().catch(() => null),
  ]);

  return <DuoRail id="kala" label="कला र साहित्य" columns={columns} />;
}
