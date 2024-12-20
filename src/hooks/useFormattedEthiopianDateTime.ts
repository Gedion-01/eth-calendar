import { EthiopianDate } from "../lib/ethiopian-date";

export function useFormattedEthiopianDate(
  etDate: EthiopianDate.EtDate,
  format: string = "MMMM dd, yyyy"
): string {
  const gregorianDate = EthiopianDate.toGreg(etDate);
  const dayOfWeek = gregorianDate.getDay();
  const tokenMap = [
    {
      token: "MMMM",
      value: EthiopianDate.getEtMonthName(etDate.Month, true),
    },
    {
      token: "MMM",
      value: EthiopianDate.getEtMonthName(etDate.Month, true).slice(0, 3),
    },
    { token: "MM", value: etDate.Month.toString().padStart(2, "0") },
    { token: "M", value: etDate.Month.toString() },
    { token: "yyyy", value: etDate.Year.toString() },
    { token: "dd", value: etDate.Day.toString().padStart(2, "0") },
    { token: "d", value: etDate.Day.toString() },
    { token: "EEE", value: EthiopianDate.longDays[dayOfWeek] },
    { token: "E", value: EthiopianDate.shortDays[dayOfWeek] },
  ];

  let formatted = format;
  tokenMap.forEach(({ token, value }) => {
    const regex = new RegExp(token, "g");
    formatted = formatted.replace(regex, value);
  });

  return formatted;
}

export function useFormattedEthiopianDateTime(
  etDateTime: EthiopianDate.EtDateTime,
  format: string = "MMMM dd, yyyy HH:mm:ss"
): string {
  const gregorianDate = EthiopianDate.toGreg(etDateTime);
  const daysOfWeek = gregorianDate.getDay();
  const tokenMap = [
    {
      token: "MMMM",
      value: EthiopianDate.getEtMonthName(etDateTime.Month, true),
    },
    {
      token: "MMM",
      value: EthiopianDate.getEtMonthName(etDateTime.Month, true).slice(0, 3),
    },
    { token: "MM", value: etDateTime.Month.toString().padStart(2, "0") },
    { token: "M", value: etDateTime.Month.toString() },
    { token: "yyyy", value: etDateTime.Year.toString() },
    { token: "dd", value: etDateTime.Day.toString().padStart(2, "0") },
    { token: "d", value: etDateTime.Day.toString() },
    { token: "HH", value: etDateTime.hours.toString().padStart(2, "0") },
    { token: "h", value: (etDateTime.hours % 12 || 12).toString() },
    { token: "mm", value: etDateTime.minutes.toString().padStart(2, "0") },
    {
      token: "ss",
      value: (etDateTime.seconds || 0).toString().padStart(2, "0"),
    },
    { token: "a", value: etDateTime.hours >= 12 ? "PM" : "AM" },
    { token: "EEE", value: EthiopianDate.longDays[daysOfWeek] },
    { token: "E", value: EthiopianDate.shortDays[daysOfWeek] },
  ];

  let formatted = format;
  tokenMap.forEach(({ token, value }) => {
    const regex = new RegExp(token, "g");
    formatted = formatted.replace(regex, value);
  });

  return formatted;
}
