import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SchoolIcon from "@mui/icons-material/School";
import MemoryIcon from "@mui/icons-material/Memory";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaletteIcon from "@mui/icons-material/Palette";

import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import card5 from "../images/card5.png";
import card6 from "../images/card6.png";

const Category = () => {

  const navigate = useNavigate();

  const categories = [
    {
      title: "Entertainment",
      events: "2,450 events",
      desc: "Concerts, DJ nights, comedy shows",
      image: card1,
      icon: <MusicNoteIcon />,
      route: "/entertainment",
      color: "#ff7a18"
    },
    {
      title: "Education",
      events: "1,890 events",
      desc: "Workshops, seminars, training",
      image: card2,
      icon: <SchoolIcon />,
      route: "/education",
      color: "#38bdf8"
    },
    {
      title: "Technology",
      events: "980 events",
      desc: "Hackathons, AI events, meetups",
      image: card3,
      icon: <MemoryIcon />,
      route: "/technology",
      color: "#34d399"
    },
    {
      title: "Business",
      events: "1,240 events",
      desc: "Networking, summits, launches",
      image: card4,
      icon: <WorkIcon />,
      route: "/business",
      color: "#f59e0b"
    },
    {
      title: "Sports & Fitness",
      events: "760 events",
      desc: "Marathons, tournaments, cycling",
      image: card5,
      icon: <FitnessCenterIcon />,
      route: "/sports",
      color: "#ef4444"
    },
    {
      title: "Art & Culture",
      events: "1,120 events",
      desc: "Exhibitions, craft fairs, shows",
      image: card6,
      icon: <PaletteIcon />,
      route: "/art",
      color: "#a855f7"
    }
  ];

  return (

    <Box sx={{ background: "#05070b", color: "white" }}>

      {/* HEADER */}

      <Box
        sx={{
          textAlign: "center",
          py: 6,
          background:
            "radial-gradient(circle at center, #0d1220, #040507)"
        }}
      >

        <Typography
          sx={{
            color: "#ff7a18",
            fontSize: 14,
            letterSpacing: 2
          }}
        >
          BROWSE CATEGORIES
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 32, md: 48 },
            fontWeight: 700,
            mt: 1
          }}
        >
          Find What Inspires You
        </Typography>

        <Typography
          sx={{
            color: "#a0aec0",
            maxWidth: 600,
            margin: "auto",
            mt: 2
          }}
        >
          Explore events across diverse categories. From electrifying music
          festivals to transformative tech conferences.
        </Typography>

      </Box>


      {/* CATEGORY GRID */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px,1fr))",
          gap: 4,
          px: { xs: 3, md: 6 },
          py: 6
        }}
      >

        {categories.map((cat, i) => (

          <Card
            key={i}
            onClick={() => navigate(cat.route)}

            sx={{
              height: 240,
              borderRadius: "16px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",

              background: "transparent",
              boxShadow: "none",

              transition: "all 0.3s ease",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
              }
            }}
          >

            {/* IMAGE CONTAINER */}

            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden"
              }}
            >

              <Box
                component="img"
                src={cat.image}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",

                  transition: "transform 0.6s ease",

                  ".MuiCard-root:hover &": {
                    transform: "scale(1.08)"
                  }
                }}
              />

            </Box>


            {/* OVERLAY */}

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.25))",

                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: "#fff"
              }}
            >

              <Box sx={{ display: "flex", alignItems: "center" }}>

                {/* ICON */}

                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    background: cat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2
                  }}
                >
                  {cat.icon}
                </Box>

                <Box>

                  <Typography fontWeight={600}>
                    {cat.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#a0aec0"
                    }}
                  >
                    {cat.events}
                  </Typography>

                </Box>

              </Box>


              <Typography
                sx={{
                  color: "#a0aec0",
                  mt: 1,
                  fontSize: 14
                }}
              >
                {cat.desc}
              </Typography>

            </Box>

          </Card>

        ))}

      </Box>

    </Box>

  );

};

export default Category;