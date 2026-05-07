import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileRequest, getProfileFail } from "../container/usercontainer/slice";

import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  Modal,
  TextField,
  Paper,
  Stack,
  Menu,
  MenuItem
} from "@mui/material";

const ORANGE = "#fe7816";
const DARK_PAPER = "#12121a";

const navItems = [
  { label: "Events", id: "events" },
  { label: "Categories", id: "categories" },
  { label: "For Organizers", id: "organizers" },
  { label: "About", id: "about" }
];

const Navbar = () => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [isLogin, setIsLogin] = useState(true);

  const [askLocation, setAskLocation] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    interests: [],
    latitude: "",
    longitude: ""
  });

  useEffect(() => {
    dispatch(getProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogin && showModal) {
      setAskLocation(true);
    }
  }, [isLogin, showModal]);

  useEffect(() => {
    if (showModal) {
      setLocationDenied(false);
      setAskLocation(true);
    }
  }, [showModal]);

  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      dispatch(getProfileRequest()); // fetch user
      setShowModal(false);

    } catch {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        { withCredentials: true }
      );
      dispatch(getProfileRequest());
      setShowModal(false);
    } catch {
      alert("User already exists");
    }
  };

  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/users/logout",
      {},
      { withCredentials: true }
    );

    dispatch(getProfileFail());
    setAnchorEl(null);

    navigate("/"); // 👈 redirect to home page

  } catch (err) {
    console.error("Logout failed", err);
  }
};

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        console.log(
          "GPS detected:",
          position.coords.latitude,
          position.coords.longitude
        );

        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));

        setAskLocation(false);

      },
      (error) => {
        console.log("Location error:", error);
        setLocationDenied(true);
        setAskLocation(false);
      }
    );
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
  const inputStyle = {
    "& .MuiFilledInput-root": {
      backgroundColor: "#1c1c26",
      color: "#fff",
      borderRadius: "8px"
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "#1c1c26"
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "#1c1c26"
    },
    "& .MuiInputLabel-root": {
      color: "#aaa"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: ORANGE
    },
    "& .MuiFilledInput-root:after": {
      borderBottom: `2px solid ${ORANGE}`
    },
    "& input": {
      color: "#fff"
    },
    "& input::selection": {
      backgroundColor: ORANGE,
      color: "#000"
    }
  };
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(0,0,0,0.95)",
          backdropFilter: "blur(8px)"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>

          {/* LOGO */}
          <Box display="flex" alignItems="center">
            <img
              src={logo}
              alt="logo"
              height={36}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Box>

          {/* NAVIGATION */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: { xs: "none", md: "flex" }
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  color: "#e0e0e0",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    left: 0,
                    bottom: -4,
                    background: ORANGE,
                    transition: "0.25s"
                  },
                  "&:hover": {
                    color: ORANGE,
                    "&:after": { width: "100%" }
                  }
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          {/* RIGHT SIDE */}
          <Box display="flex" alignItems="center" gap={2}>

            {/* CREATE EVENT BUTTON */}
            <Button
              variant="contained"
              onClick={() => scrollToSection("organizers")}
              sx={{
                display: { xs: "none", md: "flex" },
                bgcolor: ORANGE,
                color: "#000",
                borderRadius: "20px",
                fontWeight: 600
              }}
            >
              Create Event
            </Button>

            {user ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: ORANGE,
                    color: "#000",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>

                {/* PROFILE MENU */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      bgcolor: DARK_PAPER,
                      color: "#fff",
                      borderRadius: 2,
                      minWidth: 180
                    }
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      setAnchorEl(null);
                    }}
                  >
                    <PersonIcon sx={{ mr: 1 }} /> My Profile
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/my-tickets");
                      setAnchorEl(null);
                    }}
                  >
                    <ConfirmationNumberIcon sx={{ mr: 1 }} /> My Tickets
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setShowModal(true)}
                sx={{
                  borderColor: ORANGE,
                  borderRadius: "50px",
                  color: ORANGE,
                  "&:hover": { backgroundColor: ORANGE, color: "#000" }
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* LOGIN MODAL */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Paper
          sx={{
            width: { xs: "90%", sm: 360 },
            p: 4,
            borderRadius: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: DARK_PAPER,
            color: "#fff"
          }}
        >
          <Typography variant="h5" mb={2} sx={{ color: ORANGE }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </Typography>

          <Stack spacing={2}>
            {!isLogin && (
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                sx={inputStyle}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            )}

            <TextField
              label="Email"
              variant="filled"
              fullWidth
              sx={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              sx={inputStyle}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {!isLogin && (
              <TextField
                label="Mobile"
                variant="filled"
                fullWidth
                sx={inputStyle}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            )}

            {!isLogin && askLocation && (
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#1c1c26",
                  borderRadius: 2,
                  textAlign: "center"
                }}
              >
                <Typography variant="body2" mb={1} sx={{ color: "#fff" }}>
                  Allow us to detect your location for better event recommendations?
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: ORANGE, color: "#000" }}
                    onClick={detectLocation}
                  >
                    Yes
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: "#777", color: "#ccc" }}
                    onClick={() => {
                      setAskLocation(false);
                      setLocationDenied(true);
                    }}
                  >
                    No
                  </Button>
                </Stack>
              </Paper>
            )}
            {!isLogin && !askLocation && (locationDenied || !formData.latitude) && (
              <TextField
                label="City"
                variant="filled"
                fullWidth
                sx={inputStyle}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            )}

            {formData.latitude && (
              <Typography variant="caption" sx={{ color: "#7CFC00" }}>
                Location detected successfully ✓
              </Typography>
            )}

            {!isLogin && (
              <TextField
                label="Interests (comma separated)"
                variant="filled"
                fullWidth
                sx={inputStyle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interests: e.target.value.split(",").map(i => i.trim())
                  })
                }
              />
            )}


            <Button
              variant="contained"
              sx={{ bgcolor: ORANGE, color: "#000" }}
              onClick={isLogin ? handleLogin : handleRegister}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", cursor: "pointer", color: "#ccc" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "New user? Sign Up"
                : "Already have an account? Login"}
            </Typography>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default Navbar;