import { convertDateSpanToWorkDayList } from "./holidayHelpers.js";
import WorkingHours from "./types/WorkingHours.js";

describe("convertDateSpanToWorkDayList", () => {
  const fullTimeContractWorkingHours: WorkingHours = {
    hoursSun: 0,
    hoursMon: 8,
    hoursTue: 8,
    hoursWed: 8,
    hoursThu: 8,
    hoursFri: 8,
    hoursSat: 0,
  };

  test("works for a single working day", () => {
    expect(
      convertDateSpanToWorkDayList(
        "15.01.2024", // A Monday
        "15.01.2024",
        fullTimeContractWorkingHours
      )
    ).toEqual(["15.01.2024"]);
  });

  test("ignores holidays", () => {
    expect(
      convertDateSpanToWorkDayList(
        "01.01.2024", // A Monday, but a holiday
        "01.01.2024",
        fullTimeContractWorkingHours
      )
    ).toEqual([]);
  });

  test("ignores non-working days", () => {
    expect(
      convertDateSpanToWorkDayList(
        "12.01.2024", // A Friday
        "15.01.2024", // The next Monday
        fullTimeContractWorkingHours
      )
    ).toEqual(["12.01.2024", "15.01.2024"]);
  });

  test("works for a regular working week", () => {
    expect(
      convertDateSpanToWorkDayList(
        "08.01.2024", // A Monday
        "14.01.2024", // The next Sunday
        fullTimeContractWorkingHours
      )
    ).toEqual([
      "08.01.2024",
      "09.01.2024",
      "10.01.2024",
      "11.01.2024",
      "12.01.2024",
    ]);
  });

  test("reduces holidays by non-weekend holidays", () => {
    expect(
      convertDateSpanToWorkDayList(
        "29.04.2024", // A Monday
        "12.05.2024", // The next-next Sunday
        fullTimeContractWorkingHours
      )
    ).toEqual([
      "29.04.2024",
      "30.04.2024",
      // 01.05.2024 is a national holiday
      "02.05.2024",
      "03.05.2024",
      "06.05.2024",
      "07.05.2024",
      "08.05.2024",
      // 09.05.2024 is a national holiday
      "10.05.2024",
    ]);
  });
});
