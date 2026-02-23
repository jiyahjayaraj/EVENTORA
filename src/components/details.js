import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";
import axios from "axios";

const Detail = () => {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [tickets, setTickets] = useState(1);

    // ✅ Fetch Event Details
    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data);
            })
            .catch(console.error);
    }, [id]);

    // ✅ Fetch Ticket Types
    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tickets/event/${id}`
                );

                setTicketTypes(res.data);

                if (res.data.length > 0) {
                    setSelectedTicket(res.data[0]); // default select first ticket
                }
            } catch (err) {
                console.error("Error fetching ticket types", err);
            }
        };

        fetchTicketTypes();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    // ✅ Dynamic Price from Selected Ticket
    const price = selectedTicket?.price || 0;
    const total = tickets * price;

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
            {/* LEFT SECTION */}
            <div className="event-section">
                <span className="badge">Trending</span>
                <h1 className="event-title">{event.eventName}</h1>

                <div className="event-meta">
                    <p>
                        <i
                            className="fa-solid fa-calendar"
                            style={{ color: "#ff7a18" }}
                        ></i>{" "}
                        {new Date(event.eventDate).toDateString()}
                    </p>

                    <p>
                        <i
                            className="fa-solid fa-location-dot"
                            style={{ color: "#ff7a18" }}
                        ></i>{" "}
                        {event.eventLocation}
                    </p>

                    <p>
                        <i
                            className="fa-solid fa-users"
                            style={{ color: "#ff7a18" }}
                        ></i>{" "}
                        {(event.stock || 0) * 10}+ attending
                    </p>
                </div>

                <img
                    src={`http://localhost:5000${event.bannerImage}`}
                    alt="event"
                    className="event-image"
                />
            </div>

            {/* RIGHT SECTION - BOOKING CARD */}
            <div className="booking-card">
                <h2>Get Your Tickets</h2>

                {/* ✅ NEW Ticket Type Section */}
                {ticketTypes.length > 0 && (
                    <div className="ticket-type-section">
                        <label>Select Ticket Type</label>

                        <div className="ticket-options">
                            {ticketTypes.map((type) => (
                                <div
                                    key={type._id}
                                    className={`ticket-card ${selectedTicket?._id === type._id ? "active" : ""
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

                {/* Ticket Quantity */}
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

                {/* Payment Section */}
                <div className="payment-section">
                    <h3>Enter Payment Information</h3>

                    <input type="text" placeholder="Cardholder Name" />
                    <input type="text" placeholder="Card Number" />

                    <div className="row">
                        <input type="text" placeholder="Expiry Date" />
                        <input type="text" placeholder="CVV" />
                    </div>
                </div>

                {/* Order Summary */}
                <div className="summary">
                    <h3>Order Summary</h3>

                    <p># of Tickets: {tickets}</p>
                    <p>Ticket Type: {selectedTicket?.name}</p>
                    <p>Price per Ticket: ₹{price}</p>
                    <p className="summary-total">Total Price: ₹{total}</p>
                </div>

                <button className="pay-btn">Proceed to Payment</button>

                <p className="secure-text">
                    <i className="fa-solid fa-lock"></i> Your information is safe and secure
                </p>
            </div>
        </div>
    );
};

export default Detail;