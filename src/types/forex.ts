export interface NrbCurrency {
  iso3: string;
  name: string;
  unit: number;
}

export interface NrbRate {
  currency: NrbCurrency;
  buy: string;
  sell: string;
}

export interface NrbDailyRates {
  date: string;
  published_on: string;
  modified_on: string;
  rates: NrbRate[];
}

export interface NrbRatesResponse {
  status: { code: number };
  errors: { validation: Record<string, string[]> | null };
  data: { payload: NrbDailyRates[] | null };
}

export interface ExchangeRateRow {
  code: string;
  name: string;
  unit: number;
  buy: number;
  sell: number;
}

export interface ExchangeRates {
  /** Publish date of the rates, YYYY-MM-DD (NRB's own date). */
  date: string;
  rates: ExchangeRateRow[];
}
