import type { ExchangeRates, NrbRatesResponse } from "@/types/forex";

const NRB_RATES_URL = "https://www.nrb.org.np/api/forex/v1/rates";

/** NRB doesn't publish every day, so look back a week for the newest entry. */
const LOOKBACK_DAYS = 7;

// Refetch at most every 3 hours; rates are published once a day.
const REVALIDATE_SECONDS = 60 * 60 * 3;

/** YYYY-MM-DD in Nepal time, `daysAgo` days before today. */
function nepalDate(daysAgo = 0) {
  const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu" }).format(date);
}

/**
 * Latest official Nepal Rastra Bank rates, or null if NRB is unreachable,
 * returns an error body, or has nothing published in the lookback window.
 */
export async function getExchangeRates(): Promise<ExchangeRates | null> {
  const params = new URLSearchParams({
    from: nepalDate(LOOKBACK_DAYS),
    to: nepalDate(),
    per_page: "100",
    page: "1",
  });

  try {
    const res = await fetch(`${NRB_RATES_URL}?${params}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    // NRB answers HTTP 200 even for errors; the real status is in the body.
    const body = (await res.json()) as NrbRatesResponse;
    if (body.status?.code !== 200) return null;

    // Results are oldest first, so the newest published day is last.
    const latest = body.data?.payload?.at(-1);
    if (!latest?.rates?.length) return null;

    const rates = latest.rates.flatMap((item) => {
      const buy = Number(item.buy);
      const sell = Number(item.sell);
      if (!Number.isFinite(buy) || !Number.isFinite(sell)) return [];
      return [
        {
          code: item.currency.iso3,
          name: item.currency.name,
          unit: item.currency.unit,
          buy,
          sell,
        },
      ];
    });

    return rates.length ? { date: latest.date, rates } : null;
  } catch {
    return null;
  }
}
