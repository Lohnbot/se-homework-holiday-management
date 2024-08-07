import SplitDate from "./types/SplitDate.js";
import { WeekDayList } from "./types/WeekDayList.js";

// Regex for the date format DD.MM.YYYY, handling leap years.
const fullDateRegexp =
  /(^(((0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[012]))|((29|30|31)[.](0[13578]|1[02]))|((29|30)[.](0[4,6,9]|11)))[.](19|[2-9][0-9])\d\d$)|(^29[.]02[.](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/i;

/**
 * Returns whether the given date is valid or not.
 * @param dateStr in the DD.MM.YYYY format
 */
export const isValidDate: (dateStr: string) => boolean = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string" || dateStr.length !== 10) {
    return false;
  }

  return fullDateRegexp.test(dateStr);
};

/**
 * Returns a structured object containing day, month and year, for a passed date string.
 * @param date in the DD.MM.YYYY format
 */
export const splitDate: (date: string) => SplitDate = (date) => {
  if (isValidDate(date)) {
    const day = parseInt(date.substr(0, 2), 10);
    const month = parseInt(date.substr(3, 2), 10);
    const year = parseInt(date.substr(-4), 10);

    return { day, month, year };
  } else {
    throw new Error(
      `Invalid input string '${date}', date must be of format DD.MM.YYYY.`
    );
  }
};

/**
 * Expects two valid SplitDate date objects. Returns
 * * -1 if the first date is before the second date
 * * 0 if the dates are equal
 * * 1 if the first date is after the second date.
 * @param leftDate First date in SplitDate format
 * @param rightDate Second date in SplitDate format
 */
export const compareSplitDates: (
  leftDate: SplitDate,
  rightDate: SplitDate
) => number = (leftDate, rightDate) => {
  const sameYear = leftDate.year === rightDate.year;
  const sameMonth = leftDate.month === rightDate.month;

  if (
    leftDate.year < rightDate.year ||
    (sameYear && leftDate.month < rightDate.month) ||
    (sameYear && sameMonth && leftDate.day < rightDate.day)
  ) {
    return -1;
  }
  if (
    leftDate.year > rightDate.year ||
    (sameYear && leftDate.month > rightDate.month) ||
    (sameYear && sameMonth && leftDate.day > rightDate.day)
  ) {
    return 1;
  }
  return 0;
};

/**
 * Expects two valid date strings. Returns
 * * -1 if the first date is before the second date
 * * 0 if the dates are equal
 * * 1 if the first date is after the second date.
 * @param leftDateStr First date in DD.MM.YYYY format
 * @param rightDateStr Second date in DD.MM.YYYY format
 */
export const compareDates: (
  leftDateStr: string,
  rightDateStr: string
) => number = (leftDateStr, rightDateStr) => {
  const leftDate = splitDate(leftDateStr);
  const rightDate = splitDate(rightDateStr);

  return compareSplitDates(leftDate, rightDate);
};

/**
 * Returns a structured object with a key for the days of a week (Monday till Sunday) and
 * the date strings between the two given dates as values.
 * Key for Sunday is 0 and for Saturday 6.
 * @param startDateStr in DD.MM.YYYY format
 * @param endDateStr in DD.MM.YYYY format
 */
export const splitDateSpanIntoDayLists: (
  startDateStr: string,
  endDateStr: string
) => WeekDayList = (startDateStr, endDateStr) => {
  const startDate = splitDate(startDateStr);
  const endDate = splitDate(endDateStr);
  const firstDay = new Date(startDate.year, startDate.month - 1, startDate.day);
  const lastDay = new Date(endDate.year, endDate.month - 1, endDate.day);
  let curDay = firstDay;
  const dayListing = {
    0: [] as Array<string>,
    1: [] as Array<string>,
    2: [] as Array<string>,
    3: [] as Array<string>,
    4: [] as Array<string>,
    5: [] as Array<string>,
    6: [] as Array<string>,
  };
  while (curDay <= lastDay) {
    dayListing[curDay.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6].push(
      `${curDay.getDate()}`.padStart(2, "0") +
        "." +
        `${curDay.getMonth() + 1}`.padStart(2, "0") +
        "." +
        `${curDay.getFullYear()}`
    );
    curDay = new Date(
      curDay.getFullYear(),
      curDay.getMonth(),
      curDay.getDate() + 1
    );
  }
  return dayListing;
};
