import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelRegistration } from "../features/registrations/registrationsSlice";
import { isPast } from "../utils/format";
import EventCard from "../components/EventCard";

function MyEventsPage() {
  const user = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations.list);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("upcoming");

  const myEvents = registrations.filter((r) => r.userEmail === user.email);
  const upcoming = myEvents.filter((r) => !isPast(r.event.date));
  const completed = myEvents.filter((r) => isPast(r.event.date));
  const shownEvents = tab === "upcoming" ? upcoming : completed;

  function handleCancel(eventId) {
    if (window.confirm("Are you sure you want to cancel your registration?")) {
      dispatch(cancelRegistration({ userEmail: user.email, eventId }));
    }
  }

  return (
    <div>
      <h1>My Events</h1>

      <div className="tabs">
        <button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>
          Upcoming ({upcoming.length})
        </button>
        <button className={tab === "completed" ? "active" : ""} onClick={() => setTab("completed")}>
          Completed ({completed.length})
        </button>
      </div>

      {shownEvents.length === 0 ? (
        <p>
          No {tab} events. <Link to="/events">Browse events</Link>
        </p>
      ) : (
        <div className="event-grid">
          {shownEvents.map((r) => (
            <EventCard key={r.event.id} event={r.event}>
              <p className="small">Registered on {r.registeredOn}</p>
              {tab === "upcoming" && (
                <button className="danger" onClick={() => handleCancel(r.event.id)}>
                  Cancel Registration
                </button>
              )}
            </EventCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEventsPage;
