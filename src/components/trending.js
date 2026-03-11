import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEventsRequest } from "../container/eventcontainer/slice";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link } from "react-router-dom";

const Trending = ({ filters }) => {

  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);
  console.log("Events from Redux:", events);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  /* FETCH EVENTS */

  useEffect(() => {
    dispatch(getEventsRequest());
  }, [dispatch]);


  /* SET EVENTS WHEN STORE UPDATES */

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);


  /* FILTER EVENTS */
  const categoryGroups = {
    "sport&fitness": ["sports", "fitness"],
    "art&culture": ["art", "culture"]
  };

  useEffect(() => {

    if (!filters) return;

    const filtered = events.filter((event) => {
      const name = event.eventName?.toLowerCase() || "";
      const location = event.eventLocation?.toLowerCase() || "";
      const type = event.eventType?.name?.toLowerCase().trim() || "";

      const category = filters.category?.toLowerCase();

      const categoryMatch =
        !category ||
        (categoryGroups[category]
          ? categoryGroups[category].includes(type)
          : type.includes(category));

      return (
        name.includes(filters.searchText?.toLowerCase() || "") &&
        location.includes(filters.location?.toLowerCase() || "") &&
        (!filters.date || event.eventDate.includes(filters.date)) &&
        categoryMatch
      );
    });

    setFilteredEvents(filtered);

  }, [filters, events]);


  const displayedEvents =
    showAll ? filteredEvents : filteredEvents.slice(0, 4);

  const isSearching =
    filters?.searchText ||
    filters?.location ||
    filters?.date ||
    filters?.category;

  return (

    <Box
      sx={{
        background:
          "radial-gradient(circle at top, #0c0c11, #07080f)",
        color: "white",
        px: { xs: 3, md: 6 },
        py: 8
      }}
    >

      {!isSearching && (

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 5
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

      )}

      {/* EVENT GRID */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px,1fr))",
          gap: 4
        }}
      >

        {displayedEvents.map((item) => (

          <Card
            key={item._id}
            sx={{
              borderRadius: "18px",
              background: "#1f1f24",
              color: "white",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: 420,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
              }
            }}
          >

            {/* IMAGE */}

            <Box
              sx={{
                height: 200,
                position: "relative",
                overflow: "hidden"
              }}
            >

              {item.eventType && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "#ff7a18",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "8px",
                    fontSize: 12,
                    fontWeight: 600,
                    zIndex: 2
                  }}
                >
                  {item.eventType?.name}
                </Box>
              )}

              <Box
                sx={{
                  height: "100%",
                  backgroundImage:
                    `url(http://localhost:5000${item.bannerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.5s ease",
                  ".MuiCard-root:hover &": {
                    transform: "scale(1.08)"
                  }
                }}
              />

            </Box>


            {/* BODY */}

            <Box
              sx={{
                p: 3,
                flexGrow: 1,
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
                  {new Date(item.eventDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
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
                borderTop: "1px solid #2a2a2f",
                p: 2
              }}
            >

              <Link
                to={`/details/${item._id}`}
                style={{ textDecoration: "none" }}
              >

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(45deg,#ff7a18,#ffb347)",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background:
                        "linear-gradient(45deg,#ff6a00,#ff9a30)"
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