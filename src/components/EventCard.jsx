import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../utils/format";

function EventCard({ event, children }) {
  return (
    <div className="event-card">
      {event.image && <img src={event.image} alt={event.name} />}
      <div className="event-card-body">
        <span className="category">{event.category}</span>
        <h3>{event.name}</h3>
        <p>{formatDate(event.date)} at {formatTime(event.time)}</p>
        <p>{event.venue}{event.city && `, ${event.city}`}</p>
        <Link to={`/events/${event.id}`}>View details</Link>
        {children}
      </div>
    </div>
  );
}

export default EventCard;
