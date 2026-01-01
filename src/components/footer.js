import './footer.css'

const Footer = () => {
  const wrapper = {
    background: "linear-gradient(180deg, #0b0f1a, #070a12)",
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    paddingTop: "0px",
  };

  const newsletter = {
    textAlign: "center",
    padding: "60px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  };

  const heading = {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "10px",
  };

  const subText = {
    color: "#9aa4b2",
    fontSize: "15px",
    marginBottom: "26px",
  };

  const inputWrap = {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  };

  const inputBox = {
    background: "#0f1320",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#fff",
    width: "260px",
    outline: "none",
  };

  const button = {
    background: "linear-gradient(135deg, #ff8a00, #ff5f00)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 22px",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  };

  const footerGrid = {
    display: "grid",
    gridTemplateColumns: "1.2fr repeat(4, 1fr)",
    gap: "40px",
    maxWidth: "1200px",
    margin: "60px auto",
    padding: "0 40px",
  };

  const columnTitle = {
    fontWeight: 600,
    marginBottom: "14px",
  };

  const link = {
    color: "#9aa4b2",
    fontSize: "14px",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const brand = {
    fontWeight: 700,
    color: "#ff7a18",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const socialWrap = {
    display: "flex",
    gap: "12px",
    marginTop: "14px",
  };

  const socialIcon = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#0f1320",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "14px",
  };

  const bottomBar = {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    color: "#9aa4b2",
    fontSize: "13px",
  };

  return (
    <div style={wrapper}>
      {/* NEWSLETTER */}
      <div style={newsletter}>
        <div style={heading}>Stay in the Loop</div>
        <div style={subText}>
          Get personalized event recommendations and exclusive offers delivered
          to your inbox.
        </div>

        <div style={inputWrap}>
          <input style={inputBox} placeholder="Enter your email" />
          <button style={button}>Subscribe</button>
        </div>
      </div>

      {/* FOOTER LINKS */}
      <div style={footerGrid}>
        <div>
          <div style={brand}>🎟 EVENTORA</div>
          <div style={{ fontSize: "14px", color: "#9aa4b2", lineHeight: "1.6" }}>
            Discover and book amazing events, powered by AI recommendations.
          </div>

          <div style={socialWrap}>
            <div style={socialIcon}><i class="fa-brands fa-x-twitter" style={{color: "#d8e0ee;"}}></i></div>
            <div style={socialIcon}><i class="fa-brands fa-facebook-f" style={{color: "#d8e0ee;"}}></i></div>
            <div style={socialIcon}><i class="fa-brands fa-instagram"  style={{color: "#d8e0ee;"}}></i></div>
            <div style={socialIcon}><i class="fa-brands fa-linkedin-in" style={{color: "#d8e0ee;"}}></i></div>
          </div>
        </div>

        <div>
          <div style={columnTitle}>Product</div>
          <div style={link}>Features</div>
          <div style={link}>Pricing</div>
          <div style={link}>For Organizers</div>
          <div style={link}>Mobile App</div>
        </div>

        <div>
          <div style={columnTitle}>Company</div>
          <div style={link}>About Us</div>
          <div style={link}>Careers</div>
          <div style={link}>Press</div>
          <div style={link}>Contact</div>
        </div>

        <div>
          <div style={columnTitle}>Resources</div>
          <div style={link}>Help Center</div>
          <div style={link}>Blog</div>
          <div style={link}>API Docs</div>
          <div style={link}>Partners</div>
        </div>

        <div>
          <div style={columnTitle}>Legal</div>
          <div style={link}>Privacy Policy</div>
          <div style={link}>Terms of Service</div>
          <div style={link}>Cookie Policy</div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={bottomBar}>
        <div>© 2025 Eventora. All rights reserved.</div>
        <div>Made with passion for unforgettable experiences</div>
      </div>
    </div>
  );
};

export default Footer;
