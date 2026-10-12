# EventHub - Event Management System

Web Programming Assignment 2. A React app where users can browse events from the Ticketmaster API, register for them and see their registered events.

## Features

- Register, login and logout (data saved in localStorage, so login stays after refresh)
- Browse upcoming events
- Search events by keyword
- Filter by category, city and date
- Category buttons (Music, Sports, Arts & Theatre, Film, Miscellaneous)
- Event details page (name, date, time, venue, location, category, image, price, info)
- Register for an event (cannot register twice)
- Cancel a registration
- My Events page with Upcoming and Completed tabs
- My Events page is protected (login required)

## Technologies

- React (Vite)
- Redux Toolkit
- React Router
- Ticketmaster Discovery API

## Setup

1. Clone the repository and install packages:

```
git clone https://github.com/<your-username>/event-management-system.git
cd event-management-system
npm install
```

2. Get an API key from https://developer.ticketmaster.com/ (the "Consumer Key").

3. Create a `.env` file in the project folder:

```
VITE_TM_API_KEY=your_api_key_here
```

4. Run the project:

```
npm run dev
```

Then open http://localhost:5173

## Project Structure

```
src/
  api/ticketmaster.js         API calls
  app/store.js                Redux store
  features/auth/              auth slice (register, login, logout)
  features/events/            events slice (fetch events, event details, filters)
  features/registrations/     registrations slice (register, cancel)
  components/                 Navbar, EventCard, SearchFilters, ProtectedRoute, Loader, ErrorMessage
  pages/                      Login, Register, Events, EventDetails, MyEvents, NotFound
  utils/format.js             helper functions
```

## Note

This is a frontend only project, so the login system is a simulation using localStorage.
