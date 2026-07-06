import { format as dfFormat } from "date-fns";
import { fromZonedTime, toZonedTime, format as tzFormat } from "date-fns-tz";

export function localToUtc(dateStr, timezone) {
  return fromZonedTime(dateStr, timezone);
}

export function utcToLocal(utcDate, timezone) {
  const date = new Date(utcDate);
  return tzFormat(date, "yyyy-MM-dd'T'HH:mm", { timeZone: timezone });
}

export function formatDate(utcDate, timezone, pattern = "PPP") {
  const date = new Date(utcDate);
  return dfFormat(toZonedTime(date, timezone), pattern);
}

export const TIMEZONES = [
  "Asia/Dhaka",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Pacific/Auckland",
  "UTC",
];
