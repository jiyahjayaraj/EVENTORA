import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Hero = ({ onSearch }) => {

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [isSearching, setIsSearching] = useState(false);


  /* LIVE SEARCH */
  useEffect(() => {

    onSearch({
      searchText,
      location,
      date
    });

    if (searchText || location || date) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

  }, [searchText, location, date]);


  /* COMMON TEXTFIELD STYLE */
  const textFieldStyle = {

    background: "#0f172a",
    borderRadius: "20px",

    input: {
      color: "white"
    },

    /* FIX CALENDAR ICON COLOR */
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      filter: "invert(1)",
      cursor: "pointer"
    },

    "& .MuiOutlinedInput-root": {

      borderRadius: "20px",

      "& fieldset": {
        borderColor: "transparent",
        borderRadius: "20px"
      },

      /* HOVER ORANGE GLOW */
      "&:hover fieldset": {
        borderColor: "#ff7a18",
        borderRadius: "20px",
        boxShadow: "0 0 6px rgba(255,122,24,0.7)"
      },

      /* FOCUS ORANGE GLOW */
      "&.Mui-focused fieldset": {
        borderColor: "#ff7a18",
        borderRadius: "20px",
        boxShadow: "0 0 8px rgba(255,122,24,0.9)"
      }
    }
  };


  return (

    <Box
      sx={{
        position: "relative",
        height: isSearching ? 250 : "70vh",
        transition: "0.5s ease",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: "url('/pph.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* OVERLAY */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(10,10,20,0.40))"
        }}
      />


      {/* CONTENT */}

      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          maxWidth: 1000,
          width: "100%",
          px: 2
        }}
      >

        {/* TITLE */}

        {!isSearching && (

          <Typography
            sx={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 4
            }}
          >

            Discover Events That <br />

            <Box
              component="span"
              sx={{ color: "#ff7a18" }}
            >
              Move You
            </Box>

          </Typography>

        )}



        {/* SEARCH BAR */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            background: "rgba(15,15,25,0.9)",
            borderRadius: "20px",
            p: 2,
            transition: "0.5s ease",
            mt: isSearching ? "500px" : 0
          }}
        >


          {/* SEARCH */}

          <TextField
            fullWidth
            placeholder="Search events"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ flex: 2, ...textFieldStyle }}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#ff7a18" }} />
                </InputAdornment>
              )
            }}
          />


          {/* LOCATION */}

          <TextField
            fullWidth
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ flex: 1.5, ...textFieldStyle }}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "#ff7a18" }} />
                </InputAdornment>
              )
            }}
          />


          {/* DATE */}

          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ flex: 1.3, ...textFieldStyle }}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon sx={{ color: "#ff7a18" }} />
                </InputAdornment>
              )
            }}
          />

        </Box>

      </Box>

    </Box>

  );
};

export default Hero;