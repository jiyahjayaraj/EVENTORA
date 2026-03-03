import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CampaignIcon from "@mui/icons-material/Campaign";
import ShieldIcon from "@mui/icons-material/Shield";

const Feature = ({ icon, title, text }) => (
  <Box
    sx={{
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      gap: 2,
      p: 3,
      borderRadius: 3,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        bgcolor: "#ff8a00",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Box sx={{ minWidth: 0 }}>
      <Typography fontWeight={600}>{title}</Typography>
      <Typography fontSize={14} sx={{ opacity: 0.6, mt: 0.5 }}>
        {text}
      </Typography>
    </Box>
  </Box>
);

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        background:
          "radial-gradient(1200px 500px at top, #0f172a 0%, #05080f 55%, #02040a 100%)",
        pt: 10,
        pb: 12,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack alignItems="center" spacing={2} mb={8}>
          <Typography
            fontSize={12}
            letterSpacing={2}
            sx={{ color: "#ff8a00" }}
          >
            FOR EVENT ORGANIZERS
          </Typography>

          <Typography
            fontWeight={800}
            textAlign="center"
            sx={{ fontSize: { xs: 32, md: 44 } }}
          >
            Host Events That Sell Out
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              maxWidth: 620,
              opacity: 0.45,
              fontSize: 15,
            }}
          >
            Join thousands of organizers using Eventora to create,
            manage, and sell tickets for unforgettable experiences.
          </Typography>
        </Stack>

        {/* FEATURES — CSS GRID (PIXEL PERFECT) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 3,
            mb: 10,
          }}
        >
          <Feature
            icon={<BarChartIcon />}
            title="Powerful Analytics"
            text="Track ticket sales, attendee demographics, and revenue in real-time."
          />
          <Feature
            icon={<CreditCardIcon />}
            title="Easy Payments"
            text="Secure payment processing with instant payouts to your account."
          />
          <Feature
            icon={<CampaignIcon />}
            title="Marketing Tools"
            text="Promote your events to millions of users with built-in tools."
          />
          <Feature
            icon={<ShieldIcon />}
            title="Trusted Platform"
            text="Enterprise-grade security protecting you and your attendees."
          />
        </Box>

        {/* CTA */}
        <Box
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 5,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
          }}
        >
          <Box>
            <Typography fontWeight={700} fontSize={20}>
              Ready to create your first event?
            </Typography>
            <Typography sx={{ opacity: 0.5, mt: 0.5 }}>
              Start for free. Only pay when you sell tickets.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{
                borderRadius:"50px",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              LEARN MORE
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius:"50px",
                bgcolor: "#ff8a00",
                px: 3,
                "&:hover": { bgcolor: "#ff9a20" },
              }}
            >
              START SELLING →
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}