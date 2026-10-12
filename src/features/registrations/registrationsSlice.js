import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(localStorage.getItem("registrations")) || [],
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    registerEvent: (state, action) => {
      const { userEmail, event } = action.payload;
      const alreadyRegistered = state.list.find(
        (r) => r.userEmail === userEmail && r.event.id === event.id
      );
      if (!alreadyRegistered) {
        state.list.push({ userEmail, event, registeredOn: new Date().toLocaleDateString() });
      }
    },
    cancelRegistration: (state, action) => {
      const { userEmail, eventId } = action.payload;
      state.list = state.list.filter(
        (r) => !(r.userEmail === userEmail && r.event.id === eventId)
      );
    },
  },
});

export const { registerEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;
