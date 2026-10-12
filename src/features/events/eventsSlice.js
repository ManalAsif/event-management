import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents, getEventById } from "../../api/ticketmaster";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async ({ filters, page }) => {
  return await getEvents(filters, page);
});

export const fetchEventDetails = createAsyncThunk("events/fetchEventDetails", async (id) => {
  return await getEventById(id);
});

const initialState = {
  events: [],
  totalPages: 0,
  page: 0,
  filters: { keyword: "", category: "", city: "", date: "" },
  selectedEvent: null,
  loading: false,
  error: "",
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 0;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.selectedEvent = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setPage } = eventsSlice.actions;
export default eventsSlice.reducer;
