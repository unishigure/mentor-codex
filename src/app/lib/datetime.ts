/**
 * Get date-time format options based on locale
 * @param locale - The locale code (e.g., 'ja', 'na')
 * @returns Intl.DateTimeFormatOptions for the given locale
 */
export function getDateTimeFormatOptions(
  locale: string,
): Intl.DateTimeFormatOptions {
  if (locale === "na") {
    return {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
  }

  return {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
}

/**
 * Format date-time based on locale
 * @param dateTime - Date object or ISO format date-time string
 * @param locale - The locale code
 * @returns Formatted date-time string
 */
export function formatDateTime(
  dateTime: Date | string,
  locale: string,
): string {
  const date = dateTime instanceof Date ? dateTime : new Date(dateTime);
  const options = getDateTimeFormatOptions(locale);

  if (locale === "na") {
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
