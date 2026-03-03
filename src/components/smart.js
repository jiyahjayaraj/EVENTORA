import { Box, Typography, Button } from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupsIcon from "@mui/icons-material/Groups";

import card3 from "../images/main.png";

const cards = [
  {
    title: "AI Workshop",
    match: "98% Match",
    image: card3,
  },
  {
    title: "Startup Meetup",
    match: "94% Match",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
  },
  {
    title: "Tech Expo",
    match: "89% Match",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
  },
];

const features = [
  {
    icon: <PsychologyIcon sx={{ color: "white", fontSize: 20 }} />,
    title: "Smart Learning",
    text: "Our AI learns from your browsing history and past bookings",
  },
  {
    icon: <AutoAwesomeIcon sx={{ color: "white", fontSize: 20 }} />,
    title: "Personalized Picks",
    text: "Get recommendations tailored to your unique preferences",
  },
  {
    icon: <GroupsIcon sx={{ color: "white", fontSize: 20 }} />,
    title: "Community Insights",
    text: "Discover what people with similar tastes are enjoying",
  },
];

export default function Smart() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #0b0f1a 0%, #0a0d14 100%)",
        color: "#fff",
        px: { xs: 3, md: 7 },
        py: 6,
        display: "flex",
        gap: 6,
      }}
    >

      {/* LEFT */}

      <Box sx={{ width: "50%" }}>
        <Typography fontSize={42} fontWeight={700} lineHeight={1.2}>
          Events Picked
          <Box component="span" sx={{ color: "#ff7a18", display: "block" }}>
            Just for You
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 2.5,
            fontSize: 16,
            lineHeight: 1.6,
            color: "#9aa4b2",
            maxWidth: 520,
          }}
        >
          Our intelligent recommendation engine analyzes your preferences,
          past bookings, and browsing behavior to suggest events you'll love.
          The more you explore, the smarter it gets.
        </Typography>

        {/* FEATURES */}

        <Box sx={{ mt: 4 }}>
          {features.map((item, i) => (
            <Box
              key={i}
              sx={{
                mb: 2,
                p: "16px 18px",
                borderRadius: 3,
                display: "flex",
                gap: 2,
                background: "linear-gradient(180deg, #141826, #0f1320)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}
            >

              {/* ICON */}

              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: "#ff7a18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 6px 18px rgba(255,122,24,0.5)"
                }}
              >
                {item.icon}
              </Box>


              {/* TEXT */}

              <Box>
                <Typography fontWeight={600}>
                  {item.title}
                </Typography>

                <Typography
                  fontSize={13}
                  sx={{ color: "#9aa4b2" }}
                >
                  {item.text}
                </Typography>
              </Box>

            </Box>
          ))}
        </Box>


        {/* BUTTON */}

        <Button
          sx={{
            mt: 4,
            px: 3,
            py: 1.7,
            fontSize: 15,
            fontWeight: 600,
            color: "#fff",
            borderRadius: 5,
            background: "linear-gradient(135deg, #ff8a00, #ff5f00)",
            boxShadow: "0 10px 30px rgba(255,122,24,0.35)",
            textTransform: "none",

            "&:hover": {
              background: "linear-gradient(135deg, #ff9a20, #ff6f10)",
            },
          }}
        >
          Get Personalized Recommendations
        </Button>

      </Box>


      {/* RIGHT – STACKED CARDS */}

      <Box
        sx={{
          width: "50%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: 320,
              height: 400,
              borderRadius: 4,
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateX(${index * 45}px)
                scale(${1 - index * 0.06})
                rotate(${index === 0 ? "-5deg" : index === 1 ? "7deg" : "20deg"})`,
              zIndex: 10 - index,
              overflow: "hidden",
            }}
          >

            <Box
              sx={{
                position: "absolute",
                bottom: 18,
                left: 18,
                right: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontWeight={600}>
                {card.title}
              </Typography>

              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #a855f7, #ec4899)",
                }}
              >
                {card.match}
              </Box>
            </Box>

          </Box>
        ))}
      </Box>

    </Box>
  );
}