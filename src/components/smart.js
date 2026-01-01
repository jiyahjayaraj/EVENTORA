import icon1 from "../images/icc1.png";
import icon2 from "../images/icc2.png";
import icon3 from "../images/icc3.png";
import card3 from '../images/main.png'


const Smart = () => {
  const containerStyle = {
    background: "linear-gradient(135deg, #0b0f1a 0%, #0a0d14 100%)",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  const cards = [
    {
      title: "AI Workshop",
      match: "98% Match",
      image:  card3
    },
    {
      title: "Startup Meetup",
      match: "94% Match",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    },
    {
      title: "Tech Expo",
      match: "89% Match",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: containerStyle.background,
        padding: "50px 56px",
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
              <div style={iconStyle}>
                <img src={icon1} alt="" style={{  width:'30px',height:'30px' ,borderRadius:'10px' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Smart Learning</div>
                <div style={{ fontSize: "13px", color: "#9aa4b2" }}>
                  Our AI learns from your browsing history and past bookings
                </div>
              </div>
            </div>

            <div style={featureCard}>
              <div style={iconStyle}>
                <img src={icon2} alt="" style={{ width:'30px',height:'30px' ,borderRadius:'10px'}} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Personalized Picks</div>
                <div style={{ fontSize: "13px", color: "#9aa4b2" }}>
                  Get recommendations tailored to your unique preferences
                </div>
              </div>
            </div>

            <div style={featureCard}>
              <div style={iconStyle}>
                <img src={icon3} alt="" style={{  width:'30px',height:'30px' ,borderRadius:'10px' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Community Insights</div>
                <div style={{ fontSize: "13px", color: "#9aa4b2" }}>
                  Discover what people with similar tastes are enjoying
                </div>
              </div>
            </div>
          </div>

          <button style={buttonStyle}>
            Get Personalized Recommendations
          </button>
        </div>
      </div>

      {/* RIGHT SIDE – STACKED CARDS */}
      <div
        style={{
          width: "50%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "320px",
              height: "400px",
              borderRadius: "22px",
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateX(${index * 45}px) scale(${
                1 - index * 0.06
              }) rotate(${index === 0 ? "-5deg" : index === 1 ? "7deg" : "20deg"})`,
              zIndex: 10 - index,
              overflow: "hidden",
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                bottom: "18px",
                left: "18px",
                right: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                {card.title}
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {card.match}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Smart;
