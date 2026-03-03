import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./singlecat.css"
import card1 from "../images/card1.png";

const Entertainment = () => {

  const [events, setEvents] = useState([]);

  /* FETCH EVENTS */
useEffect(() => {

 fetch("http://localhost:5000/api/events")
  .then(res => res.json())
  .then(data => {

   console.log(data.events); // debug

   const entertainmentEvents = data.events.filter(
    (event) =>
     event.eventType?.name?.toLowerCase() === "entertainment"
   );

   setEvents(entertainmentEvents);

  })
  .catch(console.error);

}, []);

  return (

    <section className="trending">

      {/* HERO */}
      {/* HERO */}
<div className="hero"
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
      backgroundImage: `url(${card1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(7px)",
      transform: "scale(1.1)", // avoids blur edges
    }}
  />

  {/* CONTENT (NOT BLURRED) */}
  <div style={{ position: "relative", zIndex: 1, color: "white" }}>
    <h1
      style={{
        color: "#ff7a18",
        fontSize: "48px",
      }}
    >
      Entertainment Events
    </h1>

    <p style={{ fontSize: "20px" }}>
      Concerts, DJ Nights & Shows
    </p>
  </div>
</div>


      {/* EVENTS */}
      <div className="trending-content">
        <div className="trending-cards">
        {events.length === 0 && (
          <h2 style={{color:"white"}}>
            No Entertainment Events Found
          </h2>
        )}

        {events.map((item) => (

          <div
            className="event-card"
            key={item._id}
          >

            {/* IMAGE */}
            <div
              className="card-img"
              style={{
                backgroundImage:
                  `url(http://localhost:5000${item.bannerImage})`
              }}
            />

            {/* BODY */}
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


            {/* FOOTER */}
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
      </div>

    </section>

  );

};

export default Entertainment;