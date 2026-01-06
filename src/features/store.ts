import { configureStore } from "@reduxjs/toolkit";
import blockSliceReducer from "./blockSlice";

export const store = configureStore({
  reducer: {
    blocks: blockSliceReducer,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
