import "./style.css";
import logo from "../images/logo.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left logo */}
      <div className="nav-left">
        <img src={logo}></img>
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
        <span className="search-icon">    <i className="fa-solid fa-magnifying-glass"></i>
</span>
        <button className="signin-btn">Sign In</button>
        <button className="getstarted-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
