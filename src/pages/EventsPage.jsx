import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, setFilters, setPage } from "../features/events/eventsSlice";
import { simplifyEvent } from "../utils/format";
import SearchFilters from "../components/SearchFilters";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const categories = ["Music", "Sports", "Arts & Theatre", "Film", "Miscellaneous"];

function EventsPage() {
  const { events, totalPages, page, filters, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents({ filters, page }));
  }, [dispatch, filters, page]);

  function handleSearch(newFilters) {
    dispatch(setFilters(newFilters));
  }

  function handleCategory(category) {
    dispatch(setFilters({ ...filters, category }));
  }

  function changePage(newPage) {
    dispatch(setPage(newPage));
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <h1>Upcoming Events</h1>

      <SearchFilters key={JSON.stringify(filters)} filters={filters} onSearch={handleSearch} />

      <div className="categories">
        <button
          className={filters.category === "" ? "active" : ""}
          onClick={() => handleCategory("")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={filters.category === c ? "active" : ""}
            onClick={() => handleCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && events.length === 0 && <p>No events found.</p>}

      {!loading && !error && (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={simplifyEvent(event)} />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => changePage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button disabled={page + 1 >= totalPages} onClick={() => changePage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
