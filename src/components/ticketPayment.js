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
  Stack
} from "@mui/material";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading: orderLoading, latestOrder: order, error } =
    useSelector((state) => state.orders);
  const [orderData, setOrderData] = useState(null);
  const [orderResponse, setOrderResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStarted, setPaymentStarted] = useState(false);

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
    } else {
      setErrorMessage("No order data found. Please go back and select tickets.");
    }

    setPageLoading(false);
  }, [location.state]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  useEffect(() => {
    if (order && paymentStarted) {
      setOrderResponse(order);
      setSuccess(true);
      sessionStorage.removeItem("pendingOrder");
    }
  }, [order]);

  const handleConfirmPayment = () => {

    if (!orderData || !selectedMethod) return;

    setPaymentStarted(true);

    dispatch(
      createOrderRequest({
        ...orderData,
        paymentMethod: selectedMethod
      })
    );

  };

  if (pageLoading) {
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
          Amount Paid: ₹{orderResponse?.totalAmount}
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
          disabled={!selectedMethod || orderLoading}
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
          {orderLoading
            ? "Processing..."
            : `Pay ₹${orderData?.totalAmount}`}
        </Button>

      </Stack>
    </Box>
  );
};

export default PaymentPage;