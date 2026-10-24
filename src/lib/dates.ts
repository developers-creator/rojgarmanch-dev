import NepaliDate from "nepali-date-converter";

const NE_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const EN_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const EN_AD_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const toNepaliDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => NE_DIGITS[Number(digit)]);

export function adToBs(date: Date) {
  const bs = NepaliDate.fromAD(date).getBS();
  return { year: bs.year, month: bs.month + 1, day: bs.date };
}

export const formatAd = (date = new Date()) =>
  `${EN_WEEKDAYS[date.getDay()]}, ${EN_AD_MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

export const formatBs = (date = new Date()) => {
  return NepaliDate.fromAD(date).format("YYYY MMMM DD, ddd", "np");
};

/** Compact badge: "२० साउन २०८३, बुधबार" */
export const formatBsBadge = (date = new Date()) => {
  return NepaliDate.fromAD(date).format("DD MMMM YYYY, ddd", "np");
};

/** Compact badge: "6 August 2026, Friday" */
export const formatAdBadge = (date = new Date()) =>
  `${date.getDate()} ${EN_AD_MONTHS[date.getMonth()]} ${date.getFullYear()}, ${EN_WEEKDAYS[date.getDay()]}`;
