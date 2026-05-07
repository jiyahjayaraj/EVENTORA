import { Box, Typography, Card, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EventCard({ item, matchScore }) {
return (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Card
      sx={{
        borderRadius: "18px",
        background: "#1f1f24",
        color: "white",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: 420,
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        },
      }}
    >
      {/* AI MATCH BADGE */}
      {matchScore && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "linear-gradient(45deg,#ff7a18,#ffb347)",
            color: "#fff",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            fontSize: 12,
            fontWeight: 700,
            zIndex: 3,
            boxShadow: "0 4px 10px rgba(255,122,24,0.4)"
          }}
        >
          {matchScore}% Match
        </Box>
      )}

      {/* IMAGE */}
      <Box
        sx={{
          height: 200,
          position: "relative",
          overflow: "hidden",
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
              zIndex: 2,
            }}
          >
            {(() => {
              const name = item.eventType?.name?.trim() || "";
              return name.charAt(0).toUpperCase() + name.slice(1);
            })()}
          </Box>
        )}

        <Box
          sx={{
            height: "100%",
            backgroundImage: `url(http://localhost:5000${item.bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.5s ease",
            ".MuiCard-root:hover &": {
              transform: "scale(1.08)",
            },
          }}
        />
      </Box>

      {/* BODY */}
      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
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
            overflow: "hidden",
          }}
        >
          {item.eventName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
          }}
        >
          <CalendarMonthIcon
            sx={{
              color: "#ff7a18",
              fontSize: 18,
              mr: 1,
            }}
          />
          <Typography
            sx={{
              color: "#9ca3af",
              fontSize: 14,
            }}
          >
            {new Date(item.eventDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocationOnIcon
            sx={{
              color: "#ff7a18",
              fontSize: 18,
              mr: 1,
            }}
          />
          <Typography
            sx={{
              color: "#9ca3af",
              fontSize: 14,
            }}
          >
            {item.city}
          </Typography>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          borderTop: "1px solid #2a2a2f",
          p: 2,
        }}
      >
        <Link to={`/details/${item._id}`} style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(45deg,#ff7a18,#ffb347)",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(45deg,#ff6a00,#ff9a30)",
              },
            }}
          >
            Get Tickets
          </Button>
        </Link>
      </Box>
    </Card>
    </motion.div>
  );
}
