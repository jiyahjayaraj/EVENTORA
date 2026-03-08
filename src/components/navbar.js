import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo.png";

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
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );
      setUser(res.data.user);
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
      setUser(res.data.user);
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
      setUser(null);
      setAnchorEl(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </Box>

          {/* NAVIGATION */}
          <Stack direction="row" spacing={4}>
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
              sx={{
                bgcolor: ORANGE,
                color: "#000",
                borderRadius: "20px",
                fontWeight: 600,
                "&:hover": { bgcolor: "#ff8c35" }
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
                  <MenuItem>
                    <PersonIcon sx={{ mr: 1 }} /> My Profile
                  </MenuItem>

                  <MenuItem>
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
            width: 360,
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            )}

            <TextField
              label="Email"
              variant="filled"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

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