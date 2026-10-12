const API_KEY = import.meta.env.VITE_TM_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function getEvents(filters, page) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    size: 12,
    page: page,
    sort: "date,asc",
  });

  if (filters.keyword) params.append("keyword", filters.keyword);
  if (filters.category) params.append("classificationName", filters.category);
  if (filters.city) params.append("city", filters.city);

  if (filters.date) {
    params.append("startDateTime", filters.date + "T00:00:00Z");
  } else {
    params.append("startDateTime", new Date().toISOString().slice(0, 19) + "Z");
  }

  const response = await fetch(`${BASE_URL}/events.json?${params}`);
  if (!response.ok) {
    throw new Error("Could not load events. Please try again.");
  }

  const data = await response.json();
  return {
    events: data._embedded ? data._embedded.events : [],
    totalPages: Math.min(data.page.totalPages, 50),
  };
}

export async function getEventById(id) {
  const response = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Could not load this event.");
  }
  return response.json();
}
