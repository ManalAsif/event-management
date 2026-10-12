import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventDetails } from "../features/events/eventsSlice";
import { registerEvent, cancelRegistration } from "../features/registrations/registrationsSlice";
import { formatDate, formatTime, getImage, getVenue, isPast, simplifyEvent } from "../utils/format";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function EventDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEvent: event, loading, error } = useSelector((state) => state.events);
  const user = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations.list);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchEventDetails(id));
  }, [dispatch, id]);

  if (error) return <ErrorMessage message={error} />;
  if (loading || !event) return <Loader />;

  const venue = getVenue(event);
  const classification = event.classifications ? event.classifications[0] : null;
  const price = event.priceRanges ? event.priceRanges[0] : null;
  const eventDate = event.dates.start.localDate;
  const isRegistered =
    user && registrations.some((r) => r.userEmail === user.email && r.event.id === event.id);

  function handleRegister() {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isRegistered) {
      setMessage("You are already registered for this event.");
      return;
    }
    dispatch(registerEvent({ userEmail: user.email, event: simplifyEvent(event) }));
    setMessage("You have successfully registered for this event!");
  }

  function handleCancel() {
    if (window.confirm("Are you sure you want to cancel your registration?")) {
      dispatch(cancelRegistration({ userEmail: user.email, eventId: event.id }));
      setMessage("Your registration has been cancelled.");
    }
  }

  return (
    <div className="details">
      <Link to="/events">&larr; Back to events</Link>

      <img className="details-image" src={getImage(event)} alt={event.name} />
      <h1>{event.name}</h1>

      <div className="details-info">
        <p><strong>Date:</strong> {formatDate(eventDate)}</p>
        <p><strong>Time:</strong> {formatTime(event.dates.start.localTime)}</p>
        <p><strong>Venue:</strong> {venue ? venue.name : "TBA"}</p>
        {venue && (
          <p>
            <strong>Location:</strong> {venue.address ? venue.address.line1 + ", " : ""}
            {venue.city ? venue.city.name : ""}, {venue.country ? venue.country.name : ""}
          </p>
        )}
        {classification && (
          <p>
            <strong>Category:</strong> {classification.segment ? classification.segment.name : ""}
            {classification.genre ? " / " + classification.genre.name : ""}
          </p>
        )}
        {price && (
          <p>
            <strong>Price:</strong> {price.min} - {price.max} {price.currency}
          </p>
        )}
        <p><strong>Status:</strong> {event.dates.status ? event.dates.status.code : "N/A"}</p>
        {event.info && <p><strong>Info:</strong> {event.info}</p>}
        {event.pleaseNote && <p><strong>Please note:</strong> {event.pleaseNote}</p>}
      </div>

      {message && <p className="success">{message}</p>}

      <div className="details-actions">
        {isPast(eventDate) ? (
          <p>This event has already happened.</p>
        ) : isRegistered ? (
          <button className="danger" onClick={handleCancel}>Cancel Registration</button>
        ) : (
          <button onClick={handleRegister}>
            {user ? "Register for this event" : "Login to register"}
          </button>
        )}
        {event.url && (
          <a href={event.url} target="_blank" rel="noreferrer">
            View on Ticketmaster
          </a>
        )}
      </div>
    </div>
  );
}

export default EventDetailsPage;
