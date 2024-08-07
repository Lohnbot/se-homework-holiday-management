import {
  compareDates,
  compareSplitDates,
  isValidDate,
  splitDate,
  splitDateSpanIntoDayLists,
} from "./dateHelpers.js";

describe("isValidDate", () => {
  test("returns true for valid date 22.10.1970", () => {
    expect(isValidDate("22.10.1970")).toBe(true);
  });

  test("returns true for valid date 29.02.2024", () => {
    expect(isValidDate("29.02.2024")).toBe(true);
  });

  test("returns false for invalid date 29.02.2023", () => {
    expect(isValidDate("29.02.2023")).toBe(false);
  });

  test("returns false for unpadded dates", () => {
    expect(isValidDate("9.05.2021")).toBe(false);
    expect(isValidDate("12.7.2020")).toBe(false);
  });

  test("returns false for invalid date 44.03.2024", () => {
    expect(isValidDate("44.03.2024")).toBe(false);
  });

  test("returns false for invalid date 12.13.2024", () => {
    expect(isValidDate("12.13.2024")).toBe(false);
  });

  test("returns false for invalid date 12.12.024", () => {
    expect(isValidDate("12.12.024")).toBe(false);
  });
});

describe("splitDate", () => {
  test('works for "22.10.1970"', () => {
    const result = {
      day: 22,
      month: 10,
      year: 1970,
    };
    expect(splitDate("22.10.1970")).toEqual(result);
  });

  test("works for padded date", () => {
    const result = {
      day: 9,
      month: 5,
      year: 2021,
    };
    expect(splitDate("09.05.2021")).toEqual(result);
  });

  test('throws error for invalid input string ("9.05.2021") of date', () => {
    const errorMessage = `Invalid input string '9.05.2021', date must be of format DD.MM.YYYY.`;
    expect(splitDate.bind(this, "9.05.2021")).toThrowError(errorMessage);
  });

  test('throws error for invalid input string ("12.7.2020") of date', () => {
    const errorMessage = `Invalid input string '12.7.2020', date must be of format DD.MM.YYYY.`;
    expect(splitDate.bind(this, "12.7.2020")).toThrowError(errorMessage);
  });
});

describe("[small] compareSplitDates", () => {
  test("works for year of left date > year of right date", () => {
    expect(
      compareSplitDates(
        { day: 1, month: 8, year: 2021 },
        { day: 7, month: 10, year: 2020 }
      )
    ).toBe(1);
  });

  test("works for year of left date < year of right date", () => {
    expect(
      compareSplitDates(
        { day: 16, month: 7, year: 2020 },
        { day: 18, month: 2, year: 2021 }
      )
    ).toBe(-1);
  });

  test("works for month of left date > month of right date", () => {
    expect(
      compareSplitDates(
        { day: 25, month: 4, year: 2020 },
        { day: 25, month: 3, year: 2020 }
      )
    ).toBe(1);
  });

  test("works for month of left date < month of right date", () => {
    expect(
      compareSplitDates(
        { day: 30, month: 6, year: 2021 },
        { day: 1, month: 7, year: 2021 }
      )
    ).toBe(-1);
  });

  test("works for day of left date > day of right date", () => {
    expect(
      compareSplitDates(
        { day: 18, month: 7, year: 2020 },
        { day: 17, month: 7, year: 2020 }
      )
    ).toBe(1);
  });

  test("works for day of left date < day of right date", () => {
    expect(
      compareSplitDates(
        { day: 7, month: 11, year: 2021 },
        { day: 15, month: 11, year: 2021 }
      )
    ).toBe(-1);
  });

  test("works for same date", () => {
    expect(
      compareSplitDates(
        { day: 24, month: 4, year: 2002 },
        { day: 24, month: 4, year: 2002 }
      )
    ).toBe(0);
  });
});

describe("[small] compareDates", () => {
  test("works for year of left date > year of right date", () => {
    expect(compareDates("01.08.2021", "07.10.2020")).toBe(1);
  });

  test("works for year of left date < year of right date", () => {
    expect(compareDates("16.07.2020", "18.02.2021")).toBe(-1);
  });

  test("works for month of left date > month of right date", () => {
    expect(compareDates("25.04.2020", "25.03.2020")).toBe(1);
  });

  test("works for month of left date < month of right date", () => {
    expect(compareDates("30.06.2021", "01.07.2021")).toBe(-1);
  });

  test("works for day of left date > day of right date", () => {
    expect(compareDates("18.07.2020", "17.07.2020")).toBe(1);
  });

  test("works for day of left date < day of right date", () => {
    expect(compareDates("07.11.2021", "15.11.2021")).toBe(-1);
  });

  test("works for same date", () => {
    expect(compareDates("24.04.2002", "24.04.2002")).toBe(0);
  });
});

describe("[small] splitDateSpanIntoDayLists", () => {
  test("returns a structured object for dates in same month and same year", () => {
    const result = {
      0: ["06.06.2021", "13.06.2021"],
      1: ["07.06.2021", "14.06.2021"],
      2: ["01.06.2021", "08.06.2021", "15.06.2021"],
      3: ["02.06.2021", "09.06.2021"],
      4: ["03.06.2021", "10.06.2021"],
      5: ["04.06.2021", "11.06.2021"],
      6: ["05.06.2021", "12.06.2021"],
    };
    expect(splitDateSpanIntoDayLists("01.06.2021", "15.06.2021")).toEqual(
      result
    );
  });

  test("handles dates including February in leap year correctly", () => {
    const result = {
      0: ["23.02.2020", "01.03.2020"],
      1: ["24.02.2020", "02.03.2020"],
      2: ["25.02.2020", "03.03.2020"],
      3: ["26.02.2020", "04.03.2020"],
      4: ["20.02.2020", "27.02.2020", "05.03.2020"],
      5: ["21.02.2020", "28.02.2020"],
      6: ["22.02.2020", "29.02.2020"],
    };
    expect(splitDateSpanIntoDayLists("20.02.2020", "05.03.2020")).toEqual(
      result
    );
  });

  test("handles turn of year correctly", () => {
    const result = {
      0: ["27.12.2020", "03.01.2021"],
      1: ["28.12.2020", "04.01.2021"],
      2: ["29.12.2020", "05.01.2021"],
      3: ["30.12.2020", "06.01.2021"],
      4: ["24.12.2020", "31.12.2020"],
      5: ["25.12.2020", "01.01.2021"],
      6: ["26.12.2020", "02.01.2021"],
    };
    expect(splitDateSpanIntoDayLists("24.12.2020", "06.01.2021")).toEqual(
      result
    );
  });
});
