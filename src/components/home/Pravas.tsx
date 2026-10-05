/** एनआरएन + प्रवास */
import { getNRN, getPravas } from "@/lib/api/endpoints";
import { DuoRail } from "./DuoRail";

export async function Pravas() {
  const columns = await Promise.all([
    getNRN().catch(() => null),
    getPravas().catch(() => null),
  ]);

  return <DuoRail id="pravas" label="एनआरएन र प्रवास" columns={columns} />;
}
