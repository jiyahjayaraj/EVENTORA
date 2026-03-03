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

import card1 from "../images/card1.png";

const Entertainment = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const entertainmentEvents = data.events.filter(
          (event) =>
            event.eventType?.name?.toLowerCase() === "entertainment"
        );
        setEvents(entertainmentEvents);
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
          flexDirection: "column",     // 🔑 important
          alignItems: "center",        // ✅ horizontal center
          justifyContent: "flex-start",// ✅ top vertically
          textAlign: "center",
          pt: 10,                      // space from top
          overflow: "hidden",
        }}
      >
        {/* BG */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${card1})`,
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
            Entertainment Events
          </Typography>
          <Typography variant="h6">
            Concerts, DJ Nights & Shows
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
          maxWidth: "1400px",   // 🔑 limits width
          mx: "auto",           // 🔑 centers container
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {events.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center">
                No Entertainment Events Found
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
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(http://localhost:5000${item.bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.eventName}
                  </Typography>

                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarMonthIcon fontSize="small" sx={{ color: "#ff6a00" }} />
                    {item.eventDate}
                  </Typography>

                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon fontSize="small" sx={{ color: "#ff6a00" }} />
                    {item.eventLocation}
                  </Typography>
                </CardContent>

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
                      borderRadius: "50px"
                    }}
                  >
                    Get Tickets
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

export default Entertainment;