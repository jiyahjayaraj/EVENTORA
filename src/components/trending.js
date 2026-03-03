import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Trending = ({ filters }) => {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data.events);
        setFilteredEvents(data.events);
      })
      .catch(console.error);
  }, []);

  /* FILTER EVENTS */
  useEffect(() => {

    if (!filters) return;

    const filtered = events.filter((event) => {

      return (
        event.eventName
          .toLowerCase()
          .includes(filters.searchText?.toLowerCase() || "")
        &&

        event.eventLocation
          .toLowerCase()
          .includes(filters.location?.toLowerCase() || "")
        &&

        (filters.date
          ? event.eventDate.includes(filters.date)
          : true)

      );

    });

    setFilteredEvents(filtered);

  }, [filters, events]);


  const displayedEvents = showAll
    ? filteredEvents
    : filteredEvents.slice(0, 4);

  return (

    <section className="trending">

      <div className="trending-header">

        <div>
          <span className="trending-tag">
            TRENDING NOW
          </span>

          <h2>
            Hottest Events This Week
          </h2>

          <p>
            Based on bookings, views, and real-time popularity
          </p>

        </div>

        <span
          className="view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less ←" : "View All Trending →"}
        </span>

      </div>


      <div className="trending-cards">

        {displayedEvents.map((item) => (

          <div
            className="event-card"
            key={item._id}
          >

            <div
              className="card-img"
              style={{
                backgroundImage:
                  `url(http://localhost:5000${item.bannerImage})`
              }}
            />

            <div className="card-body">

              <h3>{item.eventName}</h3>

              <div className="info">
                <i className="fa-solid fa-calendar"
                   style={{color:"#ff6a00"}} /> {item.eventDate}
              </div>

              <div className="info">
                <i className="fa-solid fa-location-dot"
                   style={{color:"#ff6a00"}} /> {item.eventLocation}
              </div>

            </div>

            <div className="card-footer">

              <Link to={`/details/${item._id}`}>
                <button>
                  Get Tickets
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
};

export default Trending;