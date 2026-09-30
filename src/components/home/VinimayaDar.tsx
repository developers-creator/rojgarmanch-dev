"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type RateRow = {
  code: string;
  name: string;
  flag: string;
  unit: number;
  buy: number;
  sell: number;
};

const WATCH = [
  { code: "USD", name: "US Dollar", flag: "us", unit: 1, buy: 136.31, sell: 136.91 },
  { code: "INR", name: "Indian Rupee", flag: "in", unit: 100, buy: 163.2, sell: 163.45 },
  { code: "EUR", name: "Euro", flag: "eu", unit: 1, buy: 152.31, sell: 152.91 },
  { code: "GBP", name: "Pound Sterling", flag: "gb", unit: 1, buy: 176.31, sell: 176.91 },
  { code: "CHF", name: "Swiss Franc", flag: "ch", unit: 1, buy: 155.12, sell: 155.72 },
  { code: "AUD", name: "Australian Dollar", flag: "au", unit: 1, buy: 86.31, sell: 86.91 },
  { code: "CAD", name: "Canadian Dollar", flag: "ca", unit: 1, buy: 96.31, sell: 96.91 },
  { code: "SGD", name: "Singapore Dollar", flag: "sg", unit: 1, buy: 102.31, sell: 102.91 },
  { code: "JPY", name: "Japanese Yen", flag: "jp", unit: 10, buy: 90.31, sell: 90.91 },
  { code: "CNY", name: "Chinese Yuan", flag: "cn", unit: 1, buy: 18.81, sell: 18.91 },
  { code: "SAR", name: "Saudi Riyal", flag: "sa", unit: 1, buy: 36.31, sell: 36.91 },
  { code: "QAR", name: "Qatari Riyal", flag: "qa", unit: 1, buy: 37.31, sell: 37.91 },
  { code: "THB", name: "Thai Baht", flag: "th", unit: 1, buy: 4.01, sell: 4.11 },
  { code: "AED", name: "UAE Dirham", flag: "ae", unit: 1, buy: 37.07, sell: 37.17 },
  { code: "MYR", name: "Malaysian Ringgit", flag: "my", unit: 1, buy: 30.42, sell: 30.72 },
] as const;

const FALLBACK: RateRow[] = WATCH.map((row) => ({ ...row }));

function formatRate(value: number) {
  return value.toFixed(2);
}

function formatFxDate(date: Date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${String(date.getDate()).padStart(2, "0")}-${months[date.getMonth()]}-${date.getFullYear()}`;
}

function flagSrc(code: string) {
  return `https://flagcdn.com/w40/${code}.png`;
}

/** विनिमय दर — NPR sidebar */
export function VinimayaDar() {
  const [rates, setRates] = useState<RateRow[]>(FALLBACK);
  const [asOf, setAsOf] = useState("—");

  useEffect(() => {
    let cancelled = false;
    setAsOf(formatFxDate(new Date()));

    async function load() {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) return;
        const data = (await response.json()) as {
          result?: string;
          time_last_update_utc?: string;
          rates?: Record<string, number>;
        };
        const npr = data.rates?.NPR;
        if (data.result !== "success" || !npr) return;

        const next = WATCH.flatMap((item) => {
          const foreign = item.code === "USD" ? 1 : data.rates?.[item.code];
          if (!foreign) return [];
          const mid = (npr / foreign) * item.unit;
          return [
            {
              ...item,
              buy: Math.round(mid * 0.997 * 100) / 100,
              sell: Math.round(mid * 1.003 * 100) / 100,
            },
          ];
        });

        if (!cancelled && next.length) {
          setRates(next);
          if (data.time_last_update_utc) {
            setAsOf(formatFxDate(new Date(data.time_last_update_utc)));
          }
        }
      } catch {
        /* keep fallback */
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Reveal className="fx-widget reveal reveal-delay-1">
      <aside id="vinimaya-dar" aria-label="विनिमय दर">
        <SectionTitle href="https://www.nrb.org.np/forex/">विनिमय दर</SectionTitle>

        <div className="fx-widget__card">
          <div className="fx-widget__banner">
            <p className="fx-widget__banner-title">Nepal Exchange Rates</p>
            <span className="fx-widget__banner-date">{asOf}</span>
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
                        <img
                          className="fx-widget__flag"
                          src={flagSrc(row.flag)}
                          alt=""
                          width={20}
                          height={13}
                          loading="lazy"
                        />
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
