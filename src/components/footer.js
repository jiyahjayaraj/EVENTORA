import { Box, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import logo from "../images/logo.png";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#000", color: "#fff" }}>
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
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Stay in the Loop
        </Typography>

        <Typography
          sx={{ color: "#9aa4b2", maxWidth: 520, mx: "auto", mb: 4 }}
        >
          Get personalized event recommendations and exclusive offers delivered
          to your inbox.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Enter your email"
            variant="outlined"
            sx={{
              bgcolor: "#0f1320",
              input: { color: "#fff" },
              fieldset: {
                borderColor: "rgba(255,255,255,0.1)",
              },
              width: 260,
              borderRadius: 2,
            }}
          />

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #ff8a00, #ff5f00)",
              borderRadius: 2,
              px: 4,
              fontWeight: 600,
            }}
          >
            Subscribe
          </Button>
        </Box>
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
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "For Organizers", "Mobile App"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Contact"],
            },
            {
              title: "Resources",
              links: ["Help Center", "Blog", "API Docs", "Partners"],
            },
            {
              title: "Legal",
              links: [
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
              ],
            },
          ].map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography fontWeight={600} mb={2}>
                {section.title}
              </Typography>

              {section.links.map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "#9aa4b2",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item}
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