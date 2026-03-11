import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import { getMyOrdersRequest } from "../container/ordercontainer/slice";

const MyTickets = () => {

  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrdersRequest());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#050b17",
        color: "#fff",
        px: { xs: 2, md: 6 },
        py: 6
      }}
    >
      <Typography
        variant="h4"
        mb={5}
        sx={{
          fontWeight: "bold",
          letterSpacing: "1px"
        }}
      >
        My Tickets 
      </Typography>

      {loading && <Typography>Loading tickets...</Typography>}

      {!loading && orders?.length === 0 && (
        <Typography>No tickets purchased yet.</Typography>
      )}

      {/* GRID LAYOUT */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr"
          },
          gap: 3
        }}
      >
        {orders?.map((order) => (

          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "520px",   // limits card width
              mx: "auto",          // centers inside grid column
              background: "#1f1f24",
              borderRadius: "18px",
              p: 3,
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"
              }
            }}
          >

            {/* Event Image */}
            <Box
              component="img"
              src={`http://localhost:5000${order.eventId?.bannerImage}`}
              alt={order.eventId?.eventName}
              sx={{
                width: 120,
                height: 90,
                objectFit: "cover",
                borderRadius: "12px",
                mr: 3
              }}
            />

            {/* Event Details */}
            <Box flex={1}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {order.eventId?.eventName}
              </Typography>

              <Typography sx={{ color: "#aaa", mt: 1 }}>
                {order.eventId?.eventLocation}
              </Typography>

              <Typography sx={{ color: "#777", fontSize: "14px" }}>
                {new Date(order.eventId?.eventDate).toDateString()}
              </Typography>

              <Typography sx={{ color: "#ff7a00", fontWeight: "bold", mt: 1 }}>
                ₹{order.totalAmount} • {order.quantity} Ticket
              </Typography>
            </Box>

          </Paper>

        ))}
      </Box>

    </Box>
  );
};

export default MyTickets;