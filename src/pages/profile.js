import { Box, Typography, Paper, Avatar, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfileRequest } from "../container/usercontainer/slice";

const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    dispatch(getProfileRequest());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#050b17",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 450,
          background: "linear-gradient(145deg,#12121a,#0b0f1d)",
          color: "#fff",
          borderRadius: "18px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 2,
            bgcolor: "#ff7a00",
            fontSize: "32px"
          }}
        >
          {user?.name?.charAt(0)}
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {user?.name}
        </Typography>

        <Typography sx={{ color: "#aaa", mb: 3 }}>
          {user?.email}
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "#222" }} />

        <Box textAlign="left">
          <Typography sx={{ mb: 1 }}>
            <strong>Name:</strong> {user?.name}
          </Typography>

          <Typography>
            <strong>Email:</strong> {user?.email}
          </Typography>
        </Box>

      </Paper>
    </Box>
  );
};

export default Profile;