import nationalHolidays from "./constants/nationalHolidays.js";
import {
  compareDates,
  splitDate,
  splitDateSpanIntoDayLists,
} from "./dateHelpers.js";
import WorkingHours from "./types/WorkingHours.js";

type DayNumeric = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAILY_HOURS_TO_DAY_MAPPING: Record<
  keyof WorkingHours,
  DayNumeric
> = {
  hoursSun: 0,
  hoursMon: 1,
  hoursTue: 2,
  hoursWed: 3,
  hoursThu: 4,
  hoursFri: 5,
  hoursSat: 6,
};

export const DAY_TO_DAILY_HOURS_MAPPING: Record<
  DayNumeric,
  keyof WorkingHours
> = {
  0: "hoursSun",
  1: "hoursMon",
  2: "hoursTue",
  3: "hoursWed",
  4: "hoursThu",
  5: "hoursFri",
  6: "hoursSat",
};

// TODO: Write a JSdoc for the convertDateSpanToWorkDayList function
export const convertDateSpanToWorkDayList: (
  startDateStr: string,
  endDateStr: string,
  workingHours: WorkingHours
) => string[] = (startDateStr, endDateStr, workingHours) => {
  const dayListing = splitDateSpanIntoDayLists(startDateStr, endDateStr);

  let workDays: string[] = [];
  for (let i = 0; i <= 6; i++) {
    const hoursKey = DAY_TO_DAILY_HOURS_MAPPING[i as DayNumeric];
    if (workingHours[hoursKey] > 0) {
      workDays = [...workDays, ...dayListing[i as DayNumeric]];
    }
  }

  workDays = workDays.sort(compareDates);

  const coveredYears = Array.from(
    new Set(workDays.map((date) => splitDate(date).year))
  );

  const combinedHolidays = coveredYears.reduce((acc, year) => {
    return [...acc, ...nationalHolidays[year].map((date) => `${date}${year}`)];
  }, [] as string[]);

  workDays = workDays.filter((workDay) => !combinedHolidays.includes(workDay));

  return workDays;
};
