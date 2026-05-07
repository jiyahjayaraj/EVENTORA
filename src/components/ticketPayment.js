import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useDispatch, useSelector } from "react-redux";
import { createOrderRequest, clearLatestOrder } from "../container/ordercontainer/slice";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  CircularProgress,
  IconButton
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ORANGE_GRADIENT = "linear-gradient(135deg, #ff7a18, #ff5200)";
const DARK_BG = "#0b0b0f";
const CARD_BG = "#16161c";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading: orderLoading, latestOrder: order, error } =
    useSelector((state) => state.orders);

  const [orderData, setOrderData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStarted, setPaymentStarted] = useState(false);
  
  // Payment Sub-Flow States
  const [paymentStep, setPaymentStep] = useState(1); // 1: Selection, 2: Details
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const banks = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra"];

  useEffect(() => {
    dispatch(clearLatestOrder());
  }, [dispatch]);

  useEffect(() => {
    let data = location.state?.order;

    if (!data) {
      const stored = sessionStorage.getItem("pendingOrder");
      if (stored) data = JSON.parse(stored);
    }

    if (data) {
      setOrderData(typeof data === "string" ? JSON.parse(data) : data);
    }
    setPageLoading(false);
  }, [location.state]);

  useEffect(() => {
    if (order && paymentStarted) {
      setSuccess(true);
      sessionStorage.removeItem("pendingOrder");
    }
  }, [order, paymentStarted]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentStep(2);
  };

  const handleConfirmPayment = () => {
console.log("FINAL PAYLOAD:", orderData); // 👈 ADD THIS

    if (!orderData || !selectedMethod) return;
    setPaymentStarted(true);
    dispatch(
      createOrderRequest({
        ...orderData,
        paymentMethod: selectedMethod
      })
    );
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "#0d0d12",
      borderRadius: "12px",
      "& fieldset": { borderColor: "#2a2a2f" },
      "&:hover fieldset": { borderColor: "#ff7a18" },
      "&.Mui-focused fieldset": { borderColor: "#ff7a18" }
    },
    "& .MuiInputLabel-root": { color: "#777" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ff7a18" }
  };

  if (pageLoading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: DARK_BG, color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "#ff7a18" }} />
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: DARK_BG, color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 3 }}>
        <Paper elevation={0} sx={{ p: 6, borderRadius: 5, bgcolor: CARD_BG, textAlign: "center", border: "1px solid #2a2a2f", maxWidth: 500 }}>
          <CheckCircleOutlineIcon sx={{ color: "#4caf50", fontSize: 100, mb: 3 }} />
          <Typography variant="h3" fontWeight={800} sx={{ color: "#fff", mb: 2 }}>Awesome!</Typography>
          <Typography variant="h6" sx={{ color: "#9ca3af", mb: 4 }}>
            Your tickets for <b>{orderData?.eventName || "the event"}</b> have been booked successfully.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/my-tickets")}
            fullWidth
            sx={{
              py: 1.8,
              borderRadius: 4,
              fontSize: 16,
              fontWeight: 700,
              background: ORANGE_GRADIENT,
              boxShadow: "0 10px 20px rgba(255,122,24,0.3)"
            }}
          >
            Go to My Tickets
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: DARK_BG, color: "white", py: 10, px: 3 }}>
      <Stack spacing={4} sx={{ maxWidth: 550, mx: "auto" }}>
        {/* PROGRESS BAR SIMULATION */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ flex: 1, height: 4, bgcolor: "#ff7a18", borderRadius: 2, mr: 1 }} />
          <Box sx={{ flex: 1, height: 4, bgcolor: paymentStep === 2 ? "#ff7a18" : "#2a2a2f", borderRadius: 2, mr: 1 }} />
          <Box sx={{ flex: 1, height: 4, bgcolor: "#2a2a2f", borderRadius: 2 }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {paymentStep === 2 && (
            <IconButton onClick={() => setPaymentStep(1)} sx={{ color: "#fff" }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h4" fontWeight={800} sx={{ color: "#fff" }}>
            {paymentStep === 1 ? "Select Payment" : "Enter Details"}
          </Typography>
        </Box>

        {/* ORDER SUMMARY CHIP */}
        <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "rgba(255,122,24,0.05)", border: "1px dashed #ff7a18", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="caption" sx={{ color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>Payable Amount</Typography>
            <Typography variant="h4" fontWeight={800} sx={{ color: "#ff7a18" }}>₹{orderData?.totalAmount}</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>Secure Checkout</Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>256-bit SSL Encryption</Typography>
          </Box>
        </Paper>

        {paymentStep === 1 ? (
          <Stack spacing={2.5}>
            {[
              { id: "Google Pay", icon: <QrCode2Icon />, label: "Google Pay / PhonePe (UPI)" },
              { id: "Card", icon: <CreditCardIcon />, label: "Credit / Debit Card" },
              { id: "Net Banking", icon: <AccountBalanceIcon />, label: "Net Banking" },
            ].map((item) => (
              <Paper
                key={item.id}
                onClick={() => handleMethodSelect(item.id)}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  bgcolor: CARD_BG,
                  borderRadius: 4,
                  border: "1px solid #2a2a2f",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  transition: "0.3s",
                  "&:hover": { borderColor: "#ff7a18", transform: "translateY(-4px)", bgcolor: "rgba(255,122,24,0.05)" }
                }}
              >
                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "rgba(255,122,24,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff7a18" }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>{item.label}</Typography>
              </Paper>
            ))}
          </Stack>
        ) : (
          <Paper sx={{ p: 4, borderRadius: 5, bgcolor: CARD_BG, border: "1px solid #2a2a2f" }}>
            {selectedMethod === "Google Pay" && (
              <Stack spacing={3}>
                <Box sx={{ textAlign: "center", mb: 1 }}>
                  <QrCode2Icon sx={{ fontSize: 80, color: "#fff", mb: 2 }} />
                  <Typography variant="body2" color="#9ca3af">Enter your UPI ID to receive a payment request</Typography>
                </Box>
                <TextField
                  fullWidth
                  label="UPI ID"
                  placeholder="username@bank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  sx={textFieldStyle}
                />
              </Stack>
            )}

            {selectedMethod === "Card" && (
              <Stack spacing={3}>
                <TextField 
                  fullWidth 
                  label="Card Number" 
                  placeholder="0000 0000 0000 0000" 
                  sx={textFieldStyle} 
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                />
                <Stack direction="row" spacing={2}>
                  <TextField 
                    label="Expiry" 
                    placeholder="MM/YY" 
                    sx={textFieldStyle} 
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                  />
                  <TextField 
                    label="CVV" 
                    placeholder="123" 
                    type="password" 
                    sx={textFieldStyle} 
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                  />
                </Stack>
                <TextField 
                  fullWidth 
                  label="Card Holder Name" 
                  sx={textFieldStyle} 
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                />
              </Stack>
            )}

            {selectedMethod === "Net Banking" && (
              <Stack spacing={3}>
                <Typography variant="body2" color="#9ca3af">Select your preferred bank from the list below</Typography>
                <TextField
                  select
                  fullWidth
                  label="Select Bank"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  sx={textFieldStyle}
                >
                  {banks.map((bank) => (
                    <MenuItem key={bank} value={bank}>{bank}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}

            <Button
              fullWidth
              variant="contained"
              disabled={orderLoading || (selectedMethod === "Google Pay" && !upiId) || (selectedMethod === "Net Banking" && !selectedBank)}
              onClick={handleConfirmPayment}
              sx={{
                mt: 5,
                py: 2,
                borderRadius: 4,
                fontSize: 18,
                fontWeight: 800,
                background: ORANGE_GRADIENT,
                textTransform: "none",
                "&:hover": { background: "linear-gradient(135deg, #ff8c2a, #ff5e00)" }
              }}
            >
              {orderLoading ? "Processing..." : `Pay ₹${orderData?.totalAmount || '0'}`}
            </Button>
          </Paper>
        )}

        <Typography variant="caption" sx={{ color: "#888", textAlign: "center", display: "block" }}>
          By clicking pay, you agree to our Terms & Conditions. This is a simulated checkout page.
        </Typography>
      </Stack>
    </Box>
  );
};

export default PaymentPage;