import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventsRequest } from "../container/eventcontainer/slice";

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import card3 from "../images/card3.png";

const Technology = () => {

  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getEventsRequest());
  }, [dispatch]);

  const techEvents = events?.filter(
    (event) =>
      event.eventType?.name?.toLowerCase() === "technology"
  );

  return (
    <Box sx={{ bgcolor: "#0c0c11", color: "#fff" }}>

      {/* HERO */}

      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          pt: 10,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${card3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(7px)",
            transform: "scale(1.1)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{ color: "#ff7a18", fontWeight: "bold" }}
          >
            Technology Events
          </Typography>

          <Typography variant="h6">
            Tech Talks, Hackathons & Innovation Meetups
          </Typography>
        </Box>
      </Box>

      {/* EVENTS */}

      <Box
        sx={{
          position: "relative",
          mt: "-500px",
          zIndex: 3,
          p: { xs: 2, md: 4 },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
            background: "linear-gradient(90deg,#ff7a18,#ff9f1c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Discover Technology Events
        </Typography>

        {techEvents.length === 0 && (
          <Typography align="center">
            No Technology Events Found
          </Typography>
        )}

        {/* EVENTS GRID */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 320px)",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {techEvents.map((item) => (
            <Card
              key={item._id}
              sx={{
                bgcolor: "#14141c",
                color: "#fff",
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                },

                "&:hover .event-image": {
                  transform: "scale(1.1)",
                },
              }}
            >
              {/* IMAGE */}

              <Box
                className="event-image"
                sx={{
                  height: 200,
                  backgroundImage: `url(http://localhost:5000${item.bannerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  transition: "0.4s",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(6px)",
                    color: "#ff7a18",
                    fontWeight: "bold",
                    px: 1.5,
                    py: 0.4,
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                >
                  Technology
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "#ff7a18",
                    color: "#000",
                    px: 1.2,
                    py: 0.6,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {new Date(item.eventDate).toLocaleDateString()}
                </Box>
              </Box>

              {/* BODY */}

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.eventName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ opacity: 0.7, mb: 2 }}
                >
                  {item.description?.slice(0, 80)}...
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CalendarMonthIcon
                    fontSize="small"
                    sx={{ color: "#ff6a00" }}
                  />
                  {new Date(item.eventDate).toLocaleDateString()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ color: "#ff6a00" }}
                  />
                  {item.eventLocation}
                </Typography>
              </CardContent>

              {/* FOOTER */}

              <CardActions sx={{ mt: "auto", p: 2 }}>
                <Button
                  component={Link}
                  to={`/details/${item._id}`}
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg,#ff7a18,#ff9f1c)",
                    fontWeight: "bold",
                    borderRadius: "50px",
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Technology;