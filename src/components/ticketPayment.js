import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ticketPayment.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="payment-container">
        <h2>No Order Found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const handleConfirmPayment = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="payment-container">
        <h2 style={{ color: "#ff7a18" }}>🎉 Order Placed Successfully!</h2>
        <p>Amount Paid: ₹{order.totalAmount}</p>
<button 
  className="home-btn"
  onClick={() => navigate("/")}
>
  Go Home
</button>      </div>
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
        <button className="pay-option">Cash on Delivery</button>
      </div>

      <button className="confirm-btn" onClick={handleConfirmPayment}>
        Pay ₹{order.totalAmount}
      </button>
    </div>
  );
};

export default PaymentPage;