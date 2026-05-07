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
import EventCard from "./EventCard";

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
    const sortedEvents = [...events].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

    setFilteredEvents(sortedEvents);
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
      const location = event.city?.toLowerCase() || "";
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

    const sortedFiltered = [...filtered].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setFilteredEvents(sortedFiltered);
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
          <EventCard key={item._id} item={item} />
        ))}

      </Box>

    </Box>

  );

};

export default Trending;