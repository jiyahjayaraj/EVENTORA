import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const categories = [
  { label: "Entertainment", value: "entertainment", color: "#ff4d6d" },
  { label: "Education", value: "education", color: "#38bdf8" },
  { label: "Technology", value: "technology", color: "#22c55e" },
  { label: "Business", value: "business", color: "#f59e0b" },
  { label: "Sports & Fitness", value: "sport&fitness", color: "#ef4444" },
  { label: "Art & Culture", value: "art&culture", color: "#a855f7" }
];

const Hero = ({ onSearch }) => {

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {

    onSearch({
      searchText,
      location,
      date,
      category
    });

    setIsSearching(searchText || location || date);

  }, [searchText, location, date, category, onSearch]);


  const textFieldStyle = {

    background: "rgba(15,23,42,0.7)",
    backdropFilter: "blur(8px)",
    borderRadius: "16px",

    input: { color: "white" },

    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      filter: "invert(1)"
    },

    "& .MuiOutlinedInput-root": {

      borderRadius: "16px",

      "& fieldset": {
        borderColor: "rgba(255,255,255,0.08)"
      },

      "&:hover fieldset": {
        borderColor: "#ff7a18",
        boxShadow: "0 0 6px rgba(255,122,24,0.6)"
      },

      "&.Mui-focused fieldset": {
        borderColor: "#ff7a18",
        boxShadow: "0 0 8px rgba(255,122,24,0.8)"
      }
    }
  };


  return (

    <Box
      sx={{
        position: "relative",
        height: isSearching
          ? "120px"
          : { xs: "60vh", md: "70vh" },
        transition: "0.5s ease",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: "url('/check2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >

      {/* DARK OVERLAY */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.75))"
        }}
      />

      {/* LIGHT GLOW */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 20%, rgba(255,122,24,0.25), transparent 60%)",
          animation: "glow 6s ease-in-out infinite alternate"
        }}
      />

      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          maxWidth: 1000,
          width: "100%",
          px: 2
        }}
      >

        {!isSearching && (

          <Typography
            sx={{
              fontSize: { xs: 36, md: 64 },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 4
            }}
          >

            Discover Events That

            <Box
              component="span"
              sx={{
                color: "#ff7a18",
                display: "block"
              }}
            >
              Move You
            </Box>

          </Typography>

        )}

        {/* SEARCH BAR */}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            p: 2,

            background: "rgba(20,20,35,0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",

            borderRadius: "18px",

            position: isSearching ? "absolute" : "relative",
            top: isSearching ? { xs: 10, md: 20 } : "auto",
            zIndex: 5,

            left: 0,
            right: 0,
            margin: "auto",

            width: "100%",
            maxWidth: 1000,

            transition: "all 0.4s ease"
          }}
        >

          <TextField
            fullWidth
            placeholder="Search events"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCategory("");
            }} sx={{  width: "100%", ...textFieldStyle }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#ff7a18" }} />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ width: "100%", ...textFieldStyle }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "#ff7a18" }} />
                </InputAdornment>
              )
            }}
          />

          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ width: "100%", ...textFieldStyle }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon sx={{ color: "#ff7a18" }} />
                </InputAdornment>
              )
            }}
          />

        </Box>

        {/* CATEGORY CHIPS */}

        {!isSearching && (

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1.5
            }}
          >

            {categories.map((cat) => (

              <Chip
                key={cat.value}
                label={cat.label}

                onClick={() => {
                  setCategory(cat.value);
                }}
                sx={{
                  color: "white",

                  background:
                    category === cat.value
                      ? `linear-gradient(135deg, ${cat.color}, #ffffff22)`
                      : "rgba(255,255,255,0.08)",

                  border:
                    category === cat.value
                      ? `1px solid ${cat.color}`
                      : "1px solid rgba(255,255,255,0.1)",

                  boxShadow:
                    category === cat.value
                      ? `0 0 15px ${cat.color}`
                      : "none",

                  cursor: "pointer",

                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: `0 0 12px ${cat.color}`
                  },

                  transition: "all 0.25s"
                }}
              />

            ))}

          </Box>

        )}

      </Box>

      {/* ANIMATION */}

      <style>
        {`
          @keyframes glow {
            from { opacity: 0.4; }
            to { opacity: 0.8; }
          }
        `}
      </style>

    </Box>

  );
};

export default Hero;