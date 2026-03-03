import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link } from "react-router-dom";

const Trending = ({ filters }) => {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);


  /* FETCH EVENTS */

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



  const displayedEvents =
    showAll ? filteredEvents : filteredEvents.slice(0, 4);



  return (

    <Box
      sx={{
        background:
          "radial-gradient(circle at top, #0c0c11, #07080f)",
        color: "white",
        px: 6,
        py: 8
      }}
    >


      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 5,
          p:0
        }}
      >

        <Box>

          <Typography
            sx={{
              color: "#ff7a18",
              fontSize: 14,
              fontWeight: 600,
              mb: 1
            }}
          >
            TRENDING NOW
          </Typography>


          <Typography
            sx={{
              fontSize: 36,
              fontWeight: 700
            }}
          >
            Hottest Events This Week
          </Typography>


          <Typography
            sx={{
              color: "#9ca3af",
              mt: 1
            }}
          >
            Based on bookings, views, and real-time popularity
          </Typography>

        </Box>



        <Typography
          onClick={() => setShowAll(!showAll)}
          sx={{
            color: "#ff7a18",
            cursor: "pointer",
            fontWeight: 500
          }}
        >
          {showAll
            ? "Show Less ←"
            : "View All Trending →"}
        </Typography>


      </Box>



      {/* CARDS */}

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap"
        }}
      >


        {displayedEvents.map((item) => (

          <Card
            key={item._id}
            sx={{
              width: 320,
              borderRadius: "18px",
              background: "#0c0f1a",
              color: "white",
              overflow: "hidden",

              display: "flex",
              flexDirection: "column",
              height: 420   // fixed height keeps buttons aligned
            }}
          >


            {/* IMAGE */}

            <Box
              sx={{
                height: 200,
                backgroundImage:
                  `url(http://localhost:5000${item.bannerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />


            {/* BODY */}

            {/* BODY */}

            <Box
              sx={{
                p: 3,
                flexGrow: 1,   // pushes footer down
                display: "flex",
                flexDirection: "column"
              }}
            >

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  mb: 2,

                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {item.eventName}
              </Typography>



              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1
                }}
              >

                <CalendarMonthIcon
                  sx={{
                    color: "#ff7a18",
                    fontSize: 18,
                    mr: 1
                  }}
                />

                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: 14
                  }}
                >
                  {item.eventDate}
                </Typography>

              </Box>



              <Box
                sx={{
                  display: "flex",
                  alignItems: "center"
                }}
              >

                <LocationOnIcon
                  sx={{
                    color: "#ff7a18",
                    fontSize: 18,
                    mr: 1
                  }}
                />

                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: 14
                  }}
                >
                  {item.eventLocation}
                </Typography>

              </Box>

            </Box>



            {/* FOOTER */}

            <Box
              sx={{
                borderTop: "1px solid #1f2937",
                p: 2
              }}
            >

              <Link
                to={`/details/${item._id}`}
                style={{ textDecoration: "none" }}
              >

                <Button
                  variant="contained"
                  sx={{
                    background: "#ff7a18",
                    borderRadius: "25px",
                    textTransform: "none",
                    px: 3,

                    "&:hover": {
                      background: "#ff6a00"
                    }
                  }}
                >
                  Get Tickets
                </Button>

              </Link>

            </Box>

          </Card>

        ))}


      </Box>

    </Box>

  );
};


export default Trending;