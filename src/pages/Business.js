import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import card4 from "../images/card4.png"; // business hero image

const Business = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const businessEvents = data.events.filter(
          (event) =>
            event.eventType?.name?.toLowerCase() === "business"
        );
        setEvents(businessEvents);
      })
      .catch(console.error);
  }, []);

  return (
    <Box sx={{ bgcolor: "#0c0c11", color: "#fff" }}>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",      // horizontal center
          justifyContent: "flex-start",
          textAlign: "center",
          pt: 10,
          overflow: "hidden",
        }}
      >
        {/* BG */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${card4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(7px)",
            transform: "scale(1.1)",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{ color: "#ff7a18", fontWeight: "bold" }}
          >
            Business Events
          </Typography>
          <Typography variant="h6">
            Conferences, Networking & Startup Meetups
          </Typography>
        </Box>
      </Box>

      {/* ================= EVENTS ================= */}
      <Box
        sx={{
          position: "relative",
          p: { xs: 2, md: 4 },
          mt: "-500px",
          zIndex: 3,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {events.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center">
                No Business Events Found
              </Typography>
            </Grid>
          )}

          {events.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "#14141c",
                  color: "#fff",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(http://localhost:5000${item.bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Body */}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.eventName}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <CalendarMonthIcon
                      fontSize="small"
                      sx={{ color: "#ff6a00" }}
                    />
                    {item.eventDate}
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

                {/* Footer */}
                <CardActions sx={{ mt: "auto", p: 2 }}>
                  <Button
                    component={Link}
                    to={`/details/${item._id}`}
                    fullWidth
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(90deg, #ff7a18, #ff9f1c)",
                      fontWeight: "bold",
                      borderRadius: "50px",
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Business;