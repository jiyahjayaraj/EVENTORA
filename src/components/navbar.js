import "./style.css";
import logo from "../images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // ✅ ADDED

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Auto login check
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        withCredentials: true
      })
      .then((res) => setUser(res.data.user)) // ⚠️ Make sure backend sends { user }
      .catch(() => setUser(null));
  }, []);

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      setUser(res.data.user);
      setShowModal(false);
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  // ✅ REGISTER FUNCTION (your existing one)
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        { withCredentials: true }
      );

      setUser(res.data.user);
      setShowModal(false);
    } catch (error) {
      alert("User already exists");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="logo" />
        </div>

        <ul className="nav-center">
          <li>Events</li>
          <li>Categories</li>
          <li>For Organizers</li>
          <li>About</li>
        </ul>

        <div className="nav-right">
          {/* <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search events..." />
          </div> */}

          {user ? (
            <div className="user-section">
              <div
                className="avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div className="dropdown-box">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="signin-btn"
                onClick={() => setShowModal(true)}
              >
                Sign In
              </button>
              <button className="getstarted-btn">
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

            {/* Name only for signup */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            )}

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button onClick={isLogin ? handleLogin : handleRegister}>
              {isLogin ? "Login" : "Register"}
            </button>

            {/* ✅ Toggle text (no design change) */}
            <p
  className="modal-toggle-text"
  onClick={() => setIsLogin(!isLogin)}
>
              {isLogin
                ? "New user? Click to Sign Up"
                : "Already have account? Click to Login"}
            </p>

            <button onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;