import { useEffect, useState } from "react";
import "./style.css";

const Trending = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.products);
      });
  }, []);

  const displayedEvents = showAll ? events : events.slice(0, 4);

  return (
    <section className="trending">
      {/* HEADER */}
      <div className="trending-header">
        <div>
          <span className="trending-tag">🔥 TRENDING NOW</span>
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
          <div className="event-card" key={item.id}>
            <div
              className="card-img"
              style={{
                backgroundImage: `url(${item.thumbnail})`,
              }}
            >
              <span className="category">{item.category}</span>
              {/* <span className="fav">♡</span> */}
              <span className="badge orange">Trending</span>
            </div>

            <div className="card-body">
              <h3>{item.title}</h3>
              <div className="info">    <i className="fa-solid fa-calendar" style={{color:" #ff6a00"}}></i>
 Coming Soon</div>
              <div className="info">    <i className="fa-solid fa-location-dot" style={{color:" #ff6a00"}}></i>
 Online Event</div>
              <div className="info"><i class="fa-solid fa-user-group" style={{color:" #ff6a00"}}></i> {item.stock * 10}+ attending</div>
            </div>

            <div className="card-footer">
              <span className="price">${item.price}</span>
              <button>Get Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
