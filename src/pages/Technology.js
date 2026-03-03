import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./singlecat.css";
import card3 from "../images/card3.png"; 

const Technology = () => {
  const [events, setEvents] = useState([]);

  /* FETCH EVENTS */
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.events); // debug

        const technologyEvents = data.events.filter(
          (event) =>
            event.eventType?.name?.toLowerCase() === "technology"
        );

        setEvents(technologyEvents);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="trending">
      {/* HERO */}
      <div
        className="hero"
        style={{
          position: "relative",
          height: "320px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* BLURRED BACKGROUND */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${card3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(7px)",
            transform: "scale(1.1)",
          }}
        />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 1, color: "white" }}>
          <h1
            style={{
              color: "#ff7a18",
              fontSize: "48px",
            }}
          >
            Technology Events
          </h1>

          <p style={{ fontSize: "20px" }}>
            Tech Talks, Hackathons & Innovation Meetups
          </p>
        </div>
      </div>

      {/* EVENTS */}
      <div className="trending-content">
        <div className="trending-cards">
          {events.length === 0 && (
            <h2 style={{ color: "white" }}>
              No Technology Events Found
            </h2>
          )}

          {events.map((item) => (
            <div className="event-card" key={item._id}>
              {/* IMAGE */}
              <div
                className="card-img"
                style={{
                  backgroundImage: `url(http://localhost:5000${item.bannerImage})`,
                }}
              />

              {/* BODY */}
              <div className="card-body">
                <h3>{item.eventName}</h3>

                <div className="info">
                  <i
                    className="fa-solid fa-calendar"
                    style={{ color: "#ff6a00" }}
                  />{" "}
                  {item.eventDate}
                </div>

                <div className="info">
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ color: "#ff6a00" }}
                  />{" "}
                  {item.eventLocation}
                </div>
              </div>

              {/* FOOTER */}
              <div className="card-footer">
                <Link to={`/details/${item._id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;