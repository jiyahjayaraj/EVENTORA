import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left logo */}
      <div className="nav-left">
        <div className="logo-box">🎟</div>
        <span className="logo-text">EVENTORA</span>
      </div>

      {/* Center links */}
      <ul className="nav-center">
        <li>Events</li>
        <li>Categories</li>
        <li>For Organizers</li>
        <li>About</li>
      </ul>

      {/* Right actions */}
      <div className="nav-right">
        <span className="search-icon">🔍</span>
        <button className="signin-btn">Sign In</button>
        <button className="getstarted-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
