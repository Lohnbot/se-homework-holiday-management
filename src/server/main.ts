import express from "express";
import ViteExpress from "vite-express";
import { store } from "./database/store.js";
import { setWorkingHours } from "./database/slices/workingHoursSlice.js";
import { isValidWorkingHoursObject } from "../shared/validationHelpers.js";

const app = express();

app.get("/api/workingHours", (_, res) => {
  const state = store.getState();
  res.send(state.workingHours);
});

app.post("/api/workingHours", express.json(), (req, res) => {
  if (!req.body) {
    res.status(400).send("Request body is missing.");
    return;
  }

  if (!isValidWorkingHoursObject(req.body)) {
    res.status(400).send("Request body is not a valid WorkingHours object.");
    return;
  }

  store.dispatch(setWorkingHours(req.body));
  res.send(store.getState().workingHours);
});

app.get("/api/holidays", (_, res) => {
  const state = store.getState();
  res.send(state.holidays.storedHolidays);
});

app.post("/api/holiday", express.json(), (req, res) => {
  // TODO: Implement the POST /api/holiday route
  res.status(500).send("Not implemented yet.");
});

// Serve the web app
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
