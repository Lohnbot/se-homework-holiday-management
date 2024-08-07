import { combineReducers, configureStore } from "@reduxjs/toolkit";
import holidaysSlice from "./slices/holidaysSlice.js";
import workingHoursSlice from "./slices/workingHoursSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { resolve } from "path";
import NodeStorage from "./NodeStorage.js";

const persistConfig = {
  key: "root",
  storage: new NodeStorage(resolve("./store.json")),
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    holidays: holidaysSlice.reducer,
    workingHours: workingHoursSlice.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  // Ignore the serializable check for the persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
