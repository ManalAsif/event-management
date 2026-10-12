export function getImage(event) {
  if (!event.images || event.images.length === 0) return "";
  const image = event.images.find((img) => img.ratio === "16_9" && img.width > 500);
  return image ? image.url : event.images[0].url;
}

export function getVenue(event) {
  return event._embedded && event._embedded.venues ? event._embedded.venues[0] : null;
}

export function getCategory(event) {
  if (!event.classifications) return "Other";
  return event.classifications[0].segment ? event.classifications[0].segment.name : "Other";
}

export function formatDate(date) {
  if (!date) return "Date TBA";
  return new Date(date + "T00:00:00").toDateString();
}

export function formatTime(time) {
  if (!time) return "Time TBA";
  return time.slice(0, 5);
}

export function isPast(date) {
  if (!date) return false;
  return new Date(date + "T23:59:59") < new Date();
}

export function simplifyEvent(event) {
  const venue = getVenue(event);
  return {
    id: event.id,
    name: event.name,
    date: event.dates.start.localDate,
    time: event.dates.start.localTime,
    image: getImage(event),
    category: getCategory(event),
    venue: venue ? venue.name : "Venue TBA",
    city: venue && venue.city ? venue.city.name : "",
  };
}
