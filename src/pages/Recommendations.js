import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import EventCard from "../components/EventCard";

const API_BASE_URL = "http://localhost:5000/api";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/recommendations/generate`);
        if (res.data.recommendedEvents) {
          setRecommendations(res.data.recommendedEvents);
        } else {
          setError("No personalized events found. Explore trending events instead.");
        }
      } catch (err) {
        console.error("Failed to fetch AI recommendations", err);
        setError("No personalized events found. Explore trending events instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#0b0f1a",
        minHeight: "100vh",
        color: "white",
        px: { xs: 3, md: 6 },
        py: 8,
        pt: 12, // Extra padding for navbar clearance
      }}
    >
      <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 2 }}>
        <AutoAwesomeIcon sx={{ color: "#ff7a18", fontSize: 40 }} />
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 28, md: 36 },
              fontWeight: 700,
            }}
          >
            Personalized For You
          </Typography>
          <Typography sx={{ color: "#9ca3af", mt: 1 }}>
            AI-curated events based on your unique preferences and location.
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "40vh",
          }}
        >
          <CircularProgress sx={{ color: "#ff7a18", mb: 3 }} size={60} />
          <Typography sx={{ fontSize: 18, color: "#9ca3af" }}>
            Generating personalized recommendations...
          </Typography>
        </Box>
      ) : error || recommendations.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "40vh",
            backgroundColor: "#141826",
            borderRadius: 4,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 20, mb: 3 }}>
            {error || "No personalized events found."}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              background: "linear-gradient(45deg,#ff7a18,#ffb347)",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(45deg,#ff6a00,#ff9a30)",
              },
            }}
          >
            Explore Trending Events
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
            gap: 4,
          }}
        >
          {recommendations.map((rec) => (
            <EventCard
              key={rec.event._id || rec.event}
              item={rec.event}
              matchScore={rec.matchScore}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
