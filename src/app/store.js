import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventsReducer from "../features/events/eventsSlice";
import registrationsReducer from "../features/registrations/registrationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("users", JSON.stringify(state.auth.users));
  localStorage.setItem("currentUser", JSON.stringify(state.auth.currentUser));
  localStorage.setItem("registrations", JSON.stringify(state.registrations.list));
});
