import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import WorkingHours from "../../../shared/types/WorkingHours.js";

const initialState: WorkingHours = {
  hoursSun: 0,
  hoursMon: 8,
  hoursTue: 8,
  hoursWed: 8,
  hoursThu: 8,
  hoursFri: 8,
  hoursSat: 0,
};

const workingHoursSlice = createSlice({
  name: "workingHours",
  initialState,
  reducers: {
    setWorkingHours: (state, action: PayloadAction<WorkingHours>) => {
      return action.payload;
    },
  },
});

export const { setWorkingHours } = workingHoursSlice.actions;

export default workingHoursSlice;
