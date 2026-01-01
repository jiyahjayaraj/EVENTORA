import icon1 from './icc1.png'
import icon2 from './icc2.png'
import icon3 from './icc3.png'
import './smart.css'


const Smart = () => {
  const containerStyle = {
    background: "linear-gradient(135deg, #1a0b0fff 0%, #0a0d14 100%)",
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  };

  const headingStyle = {
    fontSize: "42px",
    fontWeight: 700,
    lineHeight: "1.2",
    margin: 0,
  };

  const highlightStyle = {
    color: "#ff7a18",
    display: "block",
  };

  const paragraphStyle = {
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#9aa4b2",
    maxWidth: "520px",
  };

  const featureCard = {
    background: "linear-gradient(180deg, #141826, #0f1320)",
    borderRadius: "12px",
    padding: "16px 18px",
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  };

  const iconStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  };

  const buttonStyle = {
    marginTop: "26px",
    background: "linear-gradient(135deg, #ff8a00, #ff5f00)",
    border: "none",
    borderRadius: "10px",
    padding: "14px 22px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(255,122,24,0.35)",
    width: "fit-content",
  };

  const imageCard = {
    position: "relative",
    width: "260px",
    height: "360px",
    borderRadius: "18px",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
  };

  const badgeStyle = {
    position: "absolute",
    bottom: "14px",
    right: "14px",
    background: "linear-gradient(135deg, #a855f7, #ec4899)",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: containerStyle.background,
        padding: "100px 56px",
        display: "flex",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ width: "50%" }}>
        <div style={containerStyle}>
          <h1 style={headingStyle}>
            Events Picked
            <span style={highlightStyle}>Just for You</span>
          </h1>

          <p style={paragraphStyle}>
            Our intelligent recommendation engine analyzes your preferences,
            past bookings, and browsing behavior to suggest events you'll love.
            The more you explore, the smarter it gets.
          </p>

          {/* FEATURES */}
          <div style={{ marginTop: "30px" }}>
            <div style={featureCard}>
              <div ><img style={iconStyle} src={icon1}></img></div>
              <div>
                <div style={{ fontWeight: 600 }}>Smart Learning</div>
                <div style={{ fontSize: "13px", color: "#9aa4b2" }}>
                  Our AI learns from your browsing history and past bookings
                </div>
              </div>
            </div>

            <div style={featureCard}>
              <div style={iconStyle}><img style={iconStyle} src={icon2}></img></div>
              <div>
                <div style={{ fontWeight: 600 }}>Personalized Picks</div>
                <div style={{ fontSize: "13px", color: "#9aa4b2" }}>
                  Get recommendations tailored to your unique preferences
                </div>
              </div>
            </div>

            <div style={featureCard}>
              <div style={iconStyle}><img style={iconStyle} src={icon3}></img></div>
              <div>
                <div style={{ fontWeight: 600 }}>Community Insights</div>
                <div style={{ fontSize: "13px", color: "#9aa4b2" }}>
                  Discover what people with similar tastes are enjoying
                </div>
              </div>
            </div>
          </div>

          <button style={buttonStyle}>Get Personalized Recommendations</button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <div
          style={{
            ...imageCard,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518770660439-4636190af475)",
            transform: "rotate(-4deg)",
          }}
        >
          <div style={badgeStyle}>98% Match</div>
        </div>

        <div
          style={{
            ...imageCard,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)",
            transform: "rotate(3deg)",
          }}
        >
          <div style={badgeStyle}>94% Match</div>
        </div>
      </div>
    </div>
  );
};

export default Smart;
