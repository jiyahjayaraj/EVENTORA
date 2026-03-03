import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ticketPayment.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [orderResponse, setOrderResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    // Get order from sessionStorage or location state
    let data = location.state?.order || sessionStorage.getItem("pendingOrder");
    if (data) {
      setOrderData(typeof data === "string" ? JSON.parse(data) : data);
    } else {
      setErrorMessage("No order data found. Please go back and select tickets.");
    }
    setLoading(false);
  }, [location.state]);

  const handleConfirmPayment = async () => {
    if (!orderData) return;
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

        // Clear temporary storage
        sessionStorage.removeItem("pendingOrder");
      } else {
        setErrorMessage("Failed to create order.");
      }
    } catch (error) {
      console.error("ORDER ERROR:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Order creation failed.");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-container">
        <h2>Preparing your order...</h2>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="payment-container">
        <h2>{errorMessage}</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="payment-container">
        <h2 style={{ color: "#ff7a18" }}>🎉 Order Placed Successfully!</h2>
        <p>Amount Paid: ₹{orderResponse.totalAmount}</p>

        <button className="home-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>

      <div className="payment-options">
        <h3>UPI / Wallet</h3>
        <button className="pay-option">Google Pay</button>
        <button className="pay-option">PhonePe</button>

        <h3>Cards</h3>
        <button className="pay-option">Add Credit/Debit Card</button>

        <h3>More Options</h3>
        <button className="pay-option">Net Banking</button>
      </div>

      <button
        className="confirm-btn"
        onClick={handleConfirmPayment}
        disabled={processingPayment}
      >
        {processingPayment ? "Processing..." : `Pay ₹${orderData?.totalAmount}`}
      </button>
    </div>
  );
};

export default PaymentPage;