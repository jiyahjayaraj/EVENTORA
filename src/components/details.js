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
    const [loading, setLoading] = useState(false); // ✅ added

    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data);
            })
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tickets/event/${id}`
                );

                setTicketTypes(res.data);

                if (res.data.length > 0) {
                    setSelectedTicket(res.data[0]);
                }
            } catch (err) {
                console.error("Error fetching ticket types", err);
            }
        };

        fetchTicketTypes();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    const price = selectedTicket?.price || 0;
    const total = tickets * price;

    const handlePayment = async () => {

        if (loading) return; // ✅ prevent double click

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/order",
                {
                    eventId: event._id,
                    quantity: tickets,
                    totalAmount: total
                },
                {
                    withCredentials: true
                }
            );

            navigate("/payment", {
                state: {
                    order: res.data
                }
            });

        } catch (error) {
            console.error(error);
            alert("Order failed");
        } finally {
            setLoading(false);
        }
    };

    const increase = () => {
        setTickets((prev) => prev + 1);
    };

    const decrease = () => {
        if (tickets > 1) {
            setTickets((prev) => prev - 1);
        }
    };

    return (
        <div className="detail-container">
            <div className="event-section">
                <h1 className="event-title">{event.eventName}</h1>

                <div className="event-meta">
                    <p>
                        <i className="fa-solid fa-calendar" style={{ color: "#ff7a18" }}></i>{" "}
                        {new Date(event.eventDate).toDateString()}
                    </p>

                    <p>
                        <i className="fa-solid fa-location-dot" style={{ color: "#ff7a18" }}></i>{" "}
                        {event.eventLocation}
                    </p>

                    <p>
                        <i className="fa-solid fa-users" style={{ color: "#ff7a18" }}></i>{" "}
                        {(event.stock || 0) * 10}+ attending
                    </p>
                </div>

                <img
                    src={`http://localhost:5000${event.bannerImage}`}
                    alt="event"
                    className="event-image"
                />
            </div>

            <div className="booking-card">
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

                {}

                <div className="summary">
                    <h3>Order Summary</h3>
                    <p># of Tickets: {tickets}</p>
                    <p>Ticket Type: {selectedTicket?.name}</p>
                    <p>Price per Ticket: ₹{price}</p>
                    <p className="summary-total">Total Price: ₹{total}</p>
                </div>

                <button
                    className="pay-btn"
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Proceed to Payment"}
                </button>

                <p className="secure-text">
                    <i className="fa-solid fa-lock"></i> Your information is safe and secure
                </p>
            </div>
        </div>
    );
};

export default Detail;