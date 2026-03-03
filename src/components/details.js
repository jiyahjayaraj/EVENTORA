import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./details.css";
import axios from "axios";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
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

    // ================= FETCH EVENT =================
    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`)
            .then((res) => res.json())
            .then((data) => setEvent(data))
            .catch(console.error);
    }, [id]);

    // ================= FETCH TICKETS =================
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tickets/event/${id}`
                );
                setTicketTypes(res.data);
                if (res.data.length > 0) {
                    setSelectedTicket(res.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchTickets();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    const price = selectedTicket?.price || 0;
    const total = tickets * price;

    // ================= CHECK LOGIN =================
    const checkLogin = async () => {
        try {
            await axios.get("http://localhost:5000/api/profile", {
                withCredentials: true
            });
            return true;
        } catch {
            return false;
        }
    };

    // ================= HANDLE PAYMENT =================
    const handlePayment = async () => {
        if (loading) return;
        setLoading(true);

        const loggedIn = await checkLogin();

        const orderData = {
            eventId: event._id,
            ticketTypeId: selectedTicket?._id, // store selected ticket type
            quantity: tickets,
            totalAmount: total
        };

        // Save order in sessionStorage temporarily
        sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

        if (!loggedIn) {
            // If user not logged in → show register modal
            setShowAuthModal(true);
            setLoading(false);
            return;
        }

        // If logged in → navigate to payment page
        setLoading(false);
        navigate("/payment");
    };

    // ================= REGISTER =================
    const handleRegister = async () => {
        if (!authForm.name || !authForm.email || !authForm.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/users/register",
                authForm,
                { withCredentials: true }
            );

            alert("Registered & Logged in ✅");
            setShowAuthModal(false);

            // After registration → go to payment page
            navigate("/payment");

        } catch (error) {
            alert(error.response?.data?.message || "Registration failed ❌");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ================= FEEDBACK =================
    const handleSubmitFeedback = async () => {
        if (!comment.trim()) {
            alert("Please write a comment");
            return;
        }

        try {
            setSubmitting(true);

            await axios.post(
                `http://localhost:5000/api/events/${id}/feedback`,
                { comment, rating },
                { withCredentials: true }
            );

            alert("Feedback submitted successfully ✅");
            setComment("");
            setRating(5);

        } catch (error) {
            alert("Feedback submission failed ❌");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const increase = () => setTickets((prev) => prev + 1);
    const decrease = () => {
        if (tickets > 1) setTickets((prev) => prev - 1);
    };

    return (
        <div className="detail-page">

            <div className="event-header">
                <div className="event-banner">
                    <img
                        src={`http://localhost:5000${event.bannerImage}`}
                        alt="event"
                    />
                </div>

                <div className="event-info">
                    <h1>{event.eventName}</h1>
                    <p>{new Date(event.eventDate).toDateString()}</p>
                    <p>{event.eventLocation}</p>
                    <p>Starting from ₹{ticketTypes[0]?.price}</p>
                    <p className="description">{event.description}</p>
                </div>
            </div>

            <div className="booking-layout">

                {/* ================= BOOKING SECTION ================= */}
                <div className="card booking-card">
                    <h2>Get Your Tickets</h2>

                    {ticketTypes.length > 0 && (
                        <div className="ticket-type-section">
                            <label>Select Ticket Type</label>

                            <div className="ticket-options">
                                {ticketTypes.map((type) => (
                                    <div
                                        key={type._id}
                                        className={`ticket-card ${
                                            selectedTicket?._id === type._id ? "active" : ""
                                        }`}
                                        onClick={() => setSelectedTicket(type)}
                                    >
                                        <span>{type.name}</span>
                                        <span>₹{type.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="ticket-selector">
                        <label>Select Number of Tickets</label>

                        <div className="counter">
                            <button onClick={decrease}>−</button>
                            <span>{tickets}</span>
                            <button onClick={increase}>+</button>
                        </div>

                        <div className="total">
                            Total: <span>₹{total}</span>
                        </div>
                    </div>
                </div>
                {/* ================= END BOOKING SECTION ================= */}

                <div className="card summary-card">
                    <h3>Order Summary</h3>
                    <p>Tickets: {tickets}</p>
                    <p>Type: {selectedTicket?.name}</p>
                    <p>Total: ₹{total}</p>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="pay-btn"
                    >
                        {loading ? "Processing..." : "Proceed to Payment"}
                    </button>
                </div>

                {/* FEEDBACK CARD */}
                <div className="card feedback-card">
                    <h3>Feedback & Rating</h3>

                    <div className="stars">
                        {[1,2,3,4,5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "22px",
                                    color: star <= rating ? "orange" : "gray"
                                }}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <textarea
                        placeholder="Write your feedback..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        onClick={handleSubmitFeedback}
                        disabled={submitting}
                        className="secondary-btn"
                    >
                        {submitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                </div>
            </div>

            {/* ================= REGISTER MODAL ================= */}
            {showAuthModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h2>Create Account</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={authForm.name}
                            onChange={(e) =>
                                setAuthForm({ ...authForm, name: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={authForm.email}
                            onChange={(e) =>
                                setAuthForm({ ...authForm, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={authForm.password}
                            onChange={(e) =>
                                setAuthForm({ ...authForm, password: e.target.value })
                            }
                        />

                        <button className="primary-btn" onClick={handleRegister}>
                            Register & Continue
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => setShowAuthModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;