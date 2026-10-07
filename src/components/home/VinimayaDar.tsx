import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getExchangeRates } from "@/lib/api";

/** ISO currency code → flagcdn country code. */
const FLAGS: Record<string, string> = {
  USD: "us",
  INR: "in",
  EUR: "eu",
  GBP: "gb",
  CHF: "ch",
  AUD: "au",
  CAD: "ca",
  SGD: "sg",
  JPY: "jp",
  CNY: "cn",
  SAR: "sa",
  QAR: "qa",
  THB: "th",
  AED: "ae",
  MYR: "my",
  KRW: "kr",
  SEK: "se",
  DKK: "dk",
  HKD: "hk",
  KWD: "kw",
  BHD: "bh",
  OMR: "om",
};

/** Currencies shown in the sidebar, in display order. */
const SHOWN = ["USD", "INR", "EUR", "GBP", "CHF", "AUD", "CAD", "SGD", "JPY", "CNY", "SAR", "QAR", "THB", "AED", "MYR"];

function formatRate(value: number) {
  return value.toFixed(2);
}

function formatFxDate(isoDate: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [year, month, day] = isoDate.split("-");
  return `${day}-${months[Number(month) - 1]}-${year}`;
}

/** विनिमय दर — official Nepal Rastra Bank rates */
export async function VinimayaDar() {
  const fx = await getExchangeRates();
  if (!fx) return null;

  const rates = SHOWN.flatMap((code) => fx.rates.find((row) => row.code === code) ?? []);
  if (!rates.length) return null;

  return (
    <Reveal className="fx-widget reveal reveal-delay-1">
      <aside id="vinimaya-dar" aria-label="विनिमय दर">
        <SectionTitle href="https://www.nrb.org.np/forex/">विनिमय दर</SectionTitle>

        <div className="fx-widget__card">
          <div className="fx-widget__banner">
            <p className="fx-widget__banner-title">Nepal Exchange Rates</p>
            <span className="fx-widget__banner-date">{formatFxDate(fx.date)}</span>
          </div>

          <div className="fx-widget__table-wrap">
            <table className="fx-widget__table">
              <thead>
                <tr>
                  <th scope="col">Currency</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Buying</th>
                  <th scope="col">Selling</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((row) => (
                  <tr key={row.code}>
                    <th scope="row">
                      <span className="fx-widget__currency">
                        {FLAGS[row.code] ? (
                          <img
                            className="fx-widget__flag"
                            src={`https://flagcdn.com/w40/${FLAGS[row.code]}.png`}
                            alt={`${row.name} flag`}
                            width={20}
                            height={13}
                            loading="lazy"
                          />
                        ) : null}
                        <span className="fx-widget__name">{row.name}</span>
                      </span>
                    </th>
                    <td className="fx-widget__unit">{row.unit}</td>
                    <td>{formatRate(row.buy)}</td>
                    <td>{formatRate(row.sell)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </aside>
    </Reveal>
  );
}
