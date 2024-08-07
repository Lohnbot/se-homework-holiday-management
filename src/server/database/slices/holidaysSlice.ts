import { createSlice } from "@reduxjs/toolkit";
import { Holiday } from "../../../shared/types/Holiday.js";

export interface HolidaysState {
  storedHolidays: Holiday[];
}

const initialState: HolidaysState = {
  storedHolidays: [],
};

const holidaysSlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    addHoliday: (state, action) => {
      // TODO: Implement the addHoliday reducer
    },
  },
});

export const { addHoliday } = holidaysSlice.actions;

export default holidaysSlice;
