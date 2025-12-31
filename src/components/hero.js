import "./style.css";

const Hero = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: "url('/pph.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Discover Events That <br />
          <span>Move You</span>
        </h1>

        <div className="hero-stats">
          <div>
            <h3>50K+</h3>
            <p>Events</p>
          </div>
          <div>
            <h3>10M+</h3>
            <p>Users</p>
          </div>
          <div>
            <h3>500+</h3>
            <p>Cities</p>
          </div>
        </div>

      <div className="hero-search">
  <div className="search-box">
    <i className="fa-solid fa-magnifying-glass"></i>
    <input placeholder="Search events, artists, venues" />
  </div>

  <div className="search-box">
    <i className="fa-solid fa-location-dot"></i>
    <input placeholder="Location" />
  </div>

  <div className="search-box">
    <i className="fa-solid fa-calendar"></i>
    <input placeholder="" style={{color:'#a0aeb0'}} type="date"/>
  </div>

  <button className="search-btn">Search</button>
</div>

      </div>
    </section>
  );
};

export default Hero;
