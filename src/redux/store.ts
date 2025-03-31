import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enables DevTools only in development mode
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
