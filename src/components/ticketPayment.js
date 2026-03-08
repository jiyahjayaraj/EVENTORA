import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CelebrationIcon from "@mui/icons-material/Celebration";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack
} from "@mui/material";

const PaymentPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [orderResponse, setOrderResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    let data = location.state?.order || sessionStorage.getItem("pendingOrder");

    if (data) {
      setOrderData(typeof data === "string" ? JSON.parse(data) : data);
    } else {
      setErrorMessage("No order data found. Please go back and select tickets.");
    }

    setLoading(false);
  }, [location.state]);

  const handleConfirmPayment = async () => {

    if (!orderData || !selectedMethod) return;

    setProcessingPayment(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/order",
        orderData,
        { withCredentials: true }
      );

      if (res.data && res.data.order) {

        setOrderResponse(res.data.order);
        setSuccess(true);

        sessionStorage.removeItem("pendingOrder");

      } else {
        setErrorMessage("Failed to create order.");
      }

    } catch (error) {

      console.error("ORDER ERROR:", error.response?.data || error.message);

      setErrorMessage(
        error.response?.data?.message || "Order creation failed."
      );

    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f0f", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">Preparing your order...</Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f0f", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" mb={2}>{errorMessage}</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            background: "linear-gradient(135deg,#ff7a18,#ff5200)"
          }}
        >
          Go Home
        </Button>
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f0f", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2
          }}
        >
          <CelebrationIcon sx={{ color: "#ff9a00", fontSize: 40 }} />

          <Typography variant="h4" sx={{ color: "#ff7a18" }}>
            Order Placed Successfully!
          </Typography>
        </Box>

        <Typography variant="h6" mb={3}>
          Amount Paid: ₹{orderResponse.totalAmount}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            background: "linear-gradient(135deg,#ff7a18,#ffb347)"
          }}
        >
          Go Home
        </Button>
      </Box>
    );
  }

  const paymentMethods = [
    "Google Pay",
    "PhonePe",
    "Credit / Debit Card",
    "Net Banking"
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f0f0f",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3
      }}
    >
      <Stack spacing={3} width={420}>

        <Typography
          variant="h5"
          textAlign="center"
          sx={{ color: "#ff7a18", fontWeight: "bold" }}
        >
          Payment
        </Typography>

        <Paper
          elevation={6}
          sx={{
            bgcolor: "#1a1a1a",
            p: 3,
            borderRadius: 3,
            border: "1px solid #2a2a2a"
          }}
        >

          <Typography variant="subtitle1" sx={{ color: "#ff7a18", mb: 1 }}>
            Select Payment Method
          </Typography>

          <Stack spacing={1.5}>

            {paymentMethods.map((method) => (

              <Button
                key={method}
                fullWidth
                onClick={() => setSelectedMethod(method)}
                variant={selectedMethod === method ? "contained" : "outlined"}
                sx={{
                  color: "white",
                  borderColor: "#333",
                  background:
                    selectedMethod === method
                      ? "linear-gradient(135deg,#ff7a18,#ff5200)"
                      : "#121212",
                  "&:hover": {
                    borderColor: "#ff7a18"
                  }
                }}
              >
                {method}
              </Button>

            ))}

          </Stack>
        </Paper>

        <Button
          fullWidth
          variant="contained"
          disabled={!selectedMethod || processingPayment}
          onClick={handleConfirmPayment}
          sx={{
            py: 1.6,
            fontSize: "16px",
            fontWeight: "bold",
            background: "linear-gradient(135deg,#ff7a18,#ff5200)",
            "&:hover": {
              background: "linear-gradient(135deg,#ff8c2a,#ff5e00)"
            }
          }}
        >
          {processingPayment
            ? "Processing..."
            : `Pay ₹${orderData?.totalAmount}`}
        </Button>

      </Stack>
    </Box>
  );
};

export default PaymentPage;