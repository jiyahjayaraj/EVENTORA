import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo.png";

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
  Stack
} from "@mui/material";

const ORANGE = "#fe7816";
const DARK_PAPER = "#12121a";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // ✅ Auto login check
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  // ✅ LOGIN
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

  // ✅ REGISTER
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

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setShowProfile(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="static" elevation={0} sx={{ background: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Left */}
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="logo" height={36} />
          </Box>

          {/* Center */}
          <Stack direction="row" spacing={4}>
            {["Events", "Categories", "For Organizers", "About"].map((item) => (
              <Typography
                key={item}
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
                    transition: "0.3s"
                  },
                  "&:hover": {
                    color: ORANGE,
                    "&:after": { width: "100%" }
                  }
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>

          {/* Right */}
          <Box display="flex" alignItems="center" gap={2} position="relative">
            {user ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: ORANGE,
                    color: "#000",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                  onClick={() => setShowProfile(!showProfile)}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                  sx={{ cursor: "pointer", color: "#fff", fontWeight: 500 }}
                  onClick={() => setShowProfile(!showProfile)}
                >
                  {user.name}
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  sx={{
                    borderColor: ORANGE,
                    color: ORANGE,
                    "&:hover": { backgroundColor: ORANGE, color: "#000" }
                  }}
                >
                  Logout
                </Button>

                {showProfile && (
                  <Paper
                    elevation={6}
                    sx={{
                      position: "absolute",
                      top: 60,
                      right: 0,
                      p: 2,
                      borderRadius: 2,
                      minWidth: 220,
                      bgcolor: DARK_PAPER,
                      color: "#fff"
                    }}
                  >
                    <Typography>
                      <strong>Name:</strong> {user.name}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  </Paper>
                )}
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setShowModal(true)}
                sx={{
                  borderColor: ORANGE,
                  borderRadius:"50px",
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

      {/* MODAL */}
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
                InputProps={{ sx: { backgroundColor: "#1b1b26", color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#ccc" } }}
              />
            )}

            <TextField
              label="Email"
              type="email"
              variant="filled"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              InputProps={{ sx: { backgroundColor: "#1b1b26", color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#ccc" } }}
            />

            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              InputProps={{ sx: { backgroundColor: "#1b1b26", color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#ccc" } }}
            />

            <Button
              variant="contained"
              sx={{
                bgcolor: ORANGE,
                color: "#000",
                "&:hover": { bgcolor: "#fe7816" }
              }}
              onClick={isLogin ? handleLogin : handleRegister}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Typography
              variant="body2"
              sx={{ cursor: "pointer", textAlign: "center", color: "#ccc" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "New user? Click to Sign Up"
                : "Already have an account? Click to Login"}
            </Typography>

            <Button
              variant="text"
              color="error"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default Navbar;