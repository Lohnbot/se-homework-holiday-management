# Software Engineering Homework Assignment - Minimal Holiday Management

**Assumed effort:** 2-4 hours, depending on previous experience with TypeScript, Node.js, Express, React and Redux

**Goal:** Evaluate technical competency on a variety of factors.

# Introduction

In this assignment, we ask you to design and implement a service that allows a user to plan their vacation day consumption. To this end, we have already implemented a form for setting up the users weekly working hours.

Please extend the existing app with functionality to:

1. View their currently stored holidays.
2. View the sum of vacation days consumed by their currently stored holidays.
3. Add new holidays, by specifying a start and end date in the format DD.MM.YYYY

To simulate that this is a hosted service, a Vite + Express framework was used, which serves static React code as well as an api on port 3000 on localhost.

## Problem description

In Austrian payrolling, employees have a set number of yearly allocated vacation days. Typically, this number is 25 days for full time employees, per year.

Not every calendar day on vacation reduces this number. Only days that:

- the employee actually works, and
- that are not national holidays

reduce the number of free vacation days.

Please create an app that allows a user to properly plan their holidays, based on these rules.

### Existing helpers

You will find a helper function that converts a date span to a work day list, taking these rules into consideration, in `src/shared/holidayHelpers.ts`. Accompanying tests are defined in `src/shared/holidayHelpers.test.ts`.

You will find additional helpers for dealing with the DD.MM.YYYY format in `src/shared/dateHelpers.ts`. The tests to these helpers are in `src/shared/dateHelpers.test.ts`.

### Frameworks and Tech Stack

Feel free to use any library and any development methodology of your choosing and to replace any part of the currently set up tech-stack except for:

- Express
- React
- TypeScript

The “database” for the server is currently set up to be a file based (`store.json`) redux store, mostly for it’s simplicity of getting you started. Feel free to use something else, or to keep this.

The `WorkingHoursForm` uses react-hook-form, feel free to use a different library should you have a preferred one.

# Expected implementation steps

There are a total of 6 `TODO` comments in the code, please implement the required changes.

- `src/shared/types/Holiday.ts` Define the Holiday interface
- `src/server/database/slices/holidaysSlice.ts` Implement the addHoliday reducer.
  Feel free to ignore this one should you replace the database
- `src/server/main.ts` Implement the POST /api/holiday route
- `src/shared/holidayHelpers.ts` Write a doc string for the convertDateSpanToWorkDayList function
- `src/client/components/HolidayList.tsx` Implement the HolidayList component
- `src/client/components/NewHolidayForm.tsx` Implement the NewHolidaysForm component

Additionally, the styling of the application is extremely minimal and even questionable. Please come up with a concept for displaying these two forms and the list.

# How we evaluate the result

What we care about is to understand your current experience with both writing code and the principles of Software Engineering in general. To that end, we will try to evaluate your solution based on:

- readability,
- testability,
- error handling,
- modularity and extensibility of the solution,
- documentation,
- maintainability

Since this is a very minimal example, we don’t expect you to optimize your solution in terms of:

- performance and scaling concerns,
- monitoring and logging

But we do expect you to be able to discuss these points for the assumption that we were to make this app a real product.

# Example questions we might ask

- What edge cases does your implemented logic have? How have you tested them?
- How would you approach this problem if you were to solve it for real?
- What are some of the things you like/dislike about the project setup?
- What would be your biggest concern in terms of failure modes of your implementation?
