import icon1 from '../images/i1.png'
import icon2 from '../images/i2.png'
import icon3 from '../images/i3.png'
import icon4 from '../images/i4.png'
import './org.css'

const Organizer = () => {
  const pageStyle = {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #121826 0%, #070a12 60%)",
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "90px 56px",
  };

  const centerText = {
    textAlign: "center",
    maxWidth: "720px",
    margin: "0 auto",
  };

  const badgeStyle = {
    color: "#ff7a18",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1px",
    marginBottom: "14px",
  };

  const headingStyle = {
    fontSize: "42px",
    fontWeight: 700,
    lineHeight: "1.2",
    marginBottom: "16px",
  };

  const subText = {
    color: "#9aa4b2",
    fontSize: "16px",
    lineHeight: "1.6",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    maxWidth: "900px",
    margin: "60px auto",
  };

  const cardStyle = {
    background: "linear-gradient(180deg, #111827, #0b0f1a)",
    borderRadius: "14px",
    padding: "22px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.05)",
  };

  const iconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #ff8a00, #ff5f00)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  };

  const ctaStyle = {
    maxWidth: "900px",
    margin: "80px auto 0",
    background: "linear-gradient(135deg, #0f172a, #111827)",
    borderRadius: "16px",
    padding: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid rgba(255,255,255,0.06)",
  };

  const buttonPrimary = {
    background: "linear-gradient(135deg, #ff8a00, #ff5f00)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(255,122,24,0.35)",
  };

  const buttonSecondary = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "12px 20px",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    marginRight: "14px",
  };

  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <div style={centerText}>
        <div style={badgeStyle}>FOR EVENT ORGANIZERS</div>
        <h1 style={headingStyle}>Host Events That Sell Out</h1>
        <p style={subText}>
          Join thousands of organizers using Eventora to create, manage,
          and sell tickets for unforgettable experiences.
        </p>
      </div>

      {/* FEATURES */}
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div ><img style={iconStyle} src={icon1}></img></div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>
              Powerful Analytics
            </div>
            <div style={{ fontSize: "14px", color: "#9aa4b2" }}>
              Track ticket sales, attendee demographics, and revenue in real-time
            </div>
          </div>
        </div>

        <div style={cardStyle}>
           <div ><img style={iconStyle} src={icon2}></img></div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>
              Easy Payments
            </div>
            <div style={{ fontSize: "14px", color: "#9aa4b2" }}>
              Secure payment processing with instant payouts to your account
            </div>
          </div>
        </div>

        <div style={cardStyle}>
           <div ><img style={iconStyle} src={icon3}></img></div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>
              Marketing Tools
            </div>
            <div style={{ fontSize: "14px", color: "#9aa4b2" }}>
              Promote your events to millions of users with built-in tools
            </div>
          </div>
        </div>

        <div style={cardStyle}>
           <div ><img style={iconStyle} src={icon4}></img></div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>
              Trusted Platform
            </div>
            <div style={{ fontSize: "14px", color: "#9aa4b2" }}>
              Enterprise-grade security protecting you and your attendees
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={ctaStyle}>
        <div>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>
            Ready to create your first event?
          </div>
          <div style={{ fontSize: "14px", color: "#9aa4b2", marginTop: "6px" }}>
            Start for free. Only pay when you sell tickets.
          </div>
        </div>

        <div>
          <button style={buttonSecondary}>Learn More</button>
          <button style={buttonPrimary}>Start Selling →</button>
        </div>
      </div>
    </div>
  );
};

export default Organizer;
