import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Trending = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/events", {
      cache: "no-store"
    })
      .then(res => res.json())
      .then(data => setEvents(data.events))
      .catch(console.error);
  }, []);

  const displayedEvents = showAll ? events : events.slice(0, 4);
  console.log(events);
  return (
    <section className="trending">
      {/* HEADER */}
      <div className="trending-header">
        <div>
          <span className="trending-tag">TRENDING NOW</span>
          <h2>Hottest Events This Week</h2>
          <p>
            Based on bookings, views, and real-time popularity in the last 48
            hours
          </p>
        </div>

        <span
          className="view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less ←" : "View All Trending →"}
        </span>
      </div>

      {/* CARDS */}
      <div className="trending-cards">
        {displayedEvents.map((item) => (
          <div className="event-card" key={item._id}>
            <div
              className="card-img"
              style={{
                backgroundImage: `url(http://localhost:5000${item.bannerImage})`,
              }}
            >
              <span className="category">{item.category}</span>
              {/* <span className="fav">♡</span> */}
              <span className="badge orange">Trending</span>
            </div>

            <div className="card-body">
              <h3>{item.eventName}</h3>
              <div className="info">    <i className="fa-solid fa-calendar" style={{ color: " #ff6a00" }}></i>
                {item.eventDate}</div>
              <div className="info">    <i className="fa-solid fa-location-dot" style={{ color: " #ff6a00" }}></i>
                {item.eventLocation}</div>
              <div className="info"><i className="fa-solid fa-user-group" style={{ color: " #ff6a00" }}></i> {item.stock * 10}+ attending</div>
            </div>

            <div className="card-footer">
              <Link to={`/details/${item._id}`}>
                <button>Get Tickets</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
