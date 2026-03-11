import { Box, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import logo from "../images/logo.png";

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <Box sx={{
      bgcolor: "#000", color: "#fff", position: "relative",
      zIndex: 10
    }}>
      {/* ================= NEWSLETTER ================= */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #0b0f1a, #070a12)",
          textAlign: "center",
          py: 8,
          px: 2,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#ff7a18" gutterBottom>
          About Eventora
        </Typography>

        <Typography
          sx={{ color: "#9aa4b2", maxWidth: 560, mx: "auto", mb: 4, lineHeight: 1.8 }}
        >
          Eventora is more than just an event platform — it’s where experiences come
          to life. From concerts and workshops to tech meetups and cultural
          celebrations, we make discovering, booking, and managing events effortless.
          Whether you’re an attendee searching for your next experience or an organizer
          bringing ideas to life, Eventora connects people through moments that truly
          matter.
        </Typography>

      </Box>

      {/* ================= FOOTER GRID ================= */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 6 }}>
        <Grid container spacing={5}>
          {/* BRAND */}
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <img src={logo} alt="Eventora" style={{ width: 160 }} />
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "#9aa4b2", lineHeight: 1.7 }}
            >
              Discover and book amazing events, powered by AI recommendations.
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
              {[XIcon, FacebookIcon, InstagramIcon, LinkedInIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      bgcolor: "#0f1320",
                      color: "#d8e0ee",
                      "&:hover": { bgcolor: "#ff7a18" },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                )
              )}
            </Box>
          </Grid>

          {/* LINKS */}
          {/* LINKS */}
          {[
            {
              title: "Explore",
              links: [
                { label: "Trending Events", id: "events" },
                { label: "Browse Categories", id: "categories" },
                { label: "For Organizers", id: "organizers" },
                { label: "About Eventora", id: "about" }
              ]
            },
            {title:"Company",
              links:[{label:"Contact"}]
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", id: "privacy" },
                { label: "Terms of Service", id: "terms" }
              ]
            }
          ].map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography fontWeight={600} mb={2} color="#ff7a18">
                {section.title}
              </Typography>

              {section.links.map((item) => (
                <Typography
                  key={item.label}
                  variant="body2"
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: "#9aa4b2",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#fff" }
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= BOTTOM BAR ================= */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          py: 2,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          color: "#9aa4b2",
          fontSize: 13,
        }}
      >
        <Typography variant="caption">
          © 2025 Eventora. All rights reserved.
        </Typography>
        <Typography variant="caption">
          Made with passion for unforgettable experiences
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;