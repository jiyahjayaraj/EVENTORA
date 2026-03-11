import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEventTicketsRequest } from "../container/ticketcontainer/slice";
import { getEventsRequest } from "../container/eventcontainer/slice";
import { registerUserRequest } from "../container/usercontainer/slice";
import axios from "axios";

import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";

const cardStyle = {
  background: "#0b0b0f",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 10px 35px rgba(0,0,0,0.6)",
  border: "1px solid #1b1b1f"
};

const orangeBtn = {
  background: "linear-gradient(90deg,#ff7a18,#ff9a00)",
  color: "#fff",
  fontWeight: 600,
  borderRadius: "12px",
  padding: "12px",
  textTransform: "none",
  "&:hover": {
    opacity: 0.9,
    background: "linear-gradient(90deg,#ff7a18,#ff9a00)"
  }
};

const Detail = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events?.find((e) => e._id === id);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  /* ---------------- FETCH ---------------- */
  useEffect(() => {

    if (events.length === 0) {
      dispatch(getEventsRequest());
    }

  }, [events.length, dispatch]);

  const ticketTypes = useSelector((state) => state.tickets?.tickets || []);

  useEffect(() => {
    dispatch(getEventTicketsRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ticketTypes.length > 0) {
      setSelectedTicket(ticketTypes[0]);
    }
  }, [ticketTypes]);


  useEffect(() => {

    if (user) {

      const orderData = sessionStorage.getItem("pendingOrder");

      if (orderData) {
        navigate("/payment", { state: { order: orderData } });
      }

    }

  }, [user, navigate]);

  if (!event) return <Typography>Loading...</Typography>;

  const price = selectedTicket?.price || 0;
  const total = tickets * price;

  const handlePayment = () => {

    if (!user || !user._id) {
      setShowAuthModal(true);
      return;
    }

    const orderData = {
      eventId: event._id,
      ticketTypeId: selectedTicket?._id,
      quantity: tickets,
      totalAmount: total
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

    navigate("/payment", { state: { order: orderData } });

  };

  const handleRegister = () => {

    if (!authForm.name || !authForm.email || !authForm.password) {
      setAlert({
        open: true,
        message: "Please fill all fields",
        severity: "warning"
      });
      return;
    }

    const orderData = {
      eventId: event._id,
      ticketTypeId: selectedTicket?._id,
      quantity: tickets,
      totalAmount: total
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

    dispatch(registerUserRequest(authForm));

  };

  const handleSubmitFeedback = async () => {
    setSubmitting(true);

    await axios.post(
      `http://localhost:5000/api/events/${id}/feedback`,
      { comment, rating },
      { withCredentials: true }
    );

    setComment("");
    setRating(5);
    setSubmitting(false);
  };
  console.log("Redux user:", user, typeof user);
  /* ---------------- UI ---------------- */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0a0a0f,#171730)",
        color: "#fff",
        p: 5
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", gap: 5, mb: 5 }}>
        <Box
          component="img"
          src={`http://localhost:5000${event.bannerImage}`}
          sx={{
            width: 420,
            height: 260,
            borderRadius: "20px",
            objectFit: "cover"
          }}
        />

        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {event.eventName}
          </Typography>

          <Typography sx={{ mt: 1, opacity: 0.8 }}>
            {new Date(event.eventDate).toDateString()}
          </Typography>

          <Typography sx={{ opacity: 0.8 }}>{event.eventLocation}</Typography>

          <Typography sx={{ mt: 1, color: "#ff9a00", fontWeight: 600 }}>
            Starting from ₹{ticketTypes?.[0]?.price || 0}
          </Typography>

          <Typography sx={{ mt: 2, maxWidth: 600, opacity: 0.75 }}>
            {event.description}
          </Typography>
        </Box>
      </Box>

      {/* 3 COLUMN GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          gap: 4,
          alignItems: "start"
        }}
      >
        {/* TICKETS */}
        <Box
          sx={{
            ...cardStyle,
            position: "sticky",
            top: 120,
            height: 280,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Get Your Tickets
          </Typography>

          {/* SCROLLABLE TICKET LIST */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              pr: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,

              /* custom scrollbar */
              "&::-webkit-scrollbar": {
                width: "6px"
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ff7917",
                borderRadius: "10px"
              }
            }}
          >
            {ticketTypes.map((type) => (
              <Box
                key={type._id}
                onClick={() => setSelectedTicket(type)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "12px",
                  cursor: "pointer",
                  border:
                    selectedTicket?._id === type._id
                      ? "2px solid #ff9a00"
                      : "1px solid #222",
                  background:
                    selectedTicket?._id === type._id
                      ? "rgba(255,154,0,0.1)"
                      : "#111",
                  transition: "0.2s",
                  "&:hover": {
                    borderColor: "#ff9a00",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <span>{type.name}</span>
                <span>₹{type.price}</span>
              </Box>
            ))}
          </Box>

          {/* QUANTITY SELECTOR */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2
            }}
          >
            <Button
              onClick={() => setTickets((t) => Math.max(1, t - 1))}
              sx={{
                minWidth: 40,
                height: 40,
                borderRadius: "10px",
                background: "linear-gradient(90deg,#ff7a18,#ff9a00)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700
              }}
            >
              −
            </Button>

            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              {tickets}
            </Typography>

            <Button
              onClick={() => setTickets((t) => t + 1)}
              sx={{
                minWidth: 40,
                height: 40,
                borderRadius: "10px",
                background: "linear-gradient(90deg,#ff7a18,#ff9a00)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700
              }}
            >
              +
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 2,
              textAlign: "center"
            }}
          >
            Total: <b>₹{total}</b>
          </Typography>
        </Box>

        {/* SUMMARY */}
        <Box sx={cardStyle}>
          <Typography variant="h6">Order Summary</Typography>

          <Typography sx={{ mt: 2 }}>Tickets: {tickets}</Typography>
          <Typography>Type: {selectedTicket?.name}</Typography>
          <Typography>Total: ₹{total}</Typography>

          <Button
            fullWidth
            sx={{ ...orangeBtn, mt: 3 }}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </Box>

        {/* FEEDBACK */}
        <Box sx={cardStyle}>
          <Typography variant="h6">Feedback & Rating</Typography>

          <Box sx={{ my: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 24,
                  cursor: "pointer",
                  color: s <= rating ? "#ff7917" : "#444"
                }}
                onClick={() => setRating(s)}
              >
                ★
              </span>
            ))}
          </Box>

          <TextField
            multiline
            rows={4}
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#111",
                borderRadius: "12px",
                caretColor: "#ff7917",
                outline: "none",
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#ff7917" },
                "&.Mui-focused fieldset": { borderColor: "#ff9a00" },
                boxShadow: "none !important"
              },
              "& textarea::placeholder": { color: "#fff", transition: "color 0.2s" },
              "&:hover textarea::placeholder": { color: "#ff9a00" },
              "& .MuiInputBase-input::selection": { backgroundColor: "rgba(255,154,0,0.3)" }
            }}
          />

          <Button
            fullWidth
            sx={orangeBtn}
            onClick={handleSubmitFeedback}
            disabled={submitting}
          >
            Submit Feedback
          </Button>
        </Box>
      </Box>

      {/* REGISTER MODAL */}
      <Dialog
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.6)"
          }
        }}
        PaperProps={{
          sx: {
            background: "#0b0b0f",
            color: "#fff",
            borderRadius: "18px",
            border: "1px solid #1b1b1f",
            minWidth: 380
          }
        }}
      >
        <DialogTitle>Create Account</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            onChange={(e) =>
              setAuthForm({ ...authForm, name: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#111",
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#333"
                },
                "&:hover fieldset": {
                  borderColor: "#ff9a00"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff7917"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#aaa"
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ff7917"
              }
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            onChange={(e) =>
              setAuthForm({ ...authForm, email: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#111",
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#333"
                },
                "&:hover fieldset": {
                  borderColor: "#ff9a00"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff7917"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#aaa"
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ff7917"
              }
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            onChange={(e) =>
              setAuthForm({ ...authForm, password: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#111",
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#333"
                },
                "&:hover fieldset": {
                  borderColor: "#ff9a00"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff7917"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#aaa"
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ff7917"
              }
            }}
          />

          <Button
            fullWidth
            sx={{ ...orangeBtn, mt: 2 }}
            onClick={handleRegister}
          >
            Register & Continue
          </Button>

          <Button
            fullWidth
            onClick={() => setShowAuthModal(false)}
            sx={{
              mt: 1,
              color: "#aaa",
              border: "1px solid #333",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#ff7917",
                color: "#ff7917",
                background: "rgba(255,154,0,0.08)"
              }
            }}
          >
            Cancel
          </Button>

        </DialogContent>
      </Dialog>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Detail;