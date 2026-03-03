import "./style.css";
import logo from "../images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // 🔥 Check login when page loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/profile", {
      withCredentials: true
    })
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
  }, []);

  // 🔥 Register same like Detail page
  const handleRegister = async () => {
    if (!authForm.name || !authForm.email || !authForm.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        authForm,
        { withCredentials: true }
      );

      setUser(res.data.user);   // 🔥 set logged in user
      setShowAuthModal(false);  // close modal
      alert("Registered & Logged in ✅");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed ❌");
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
          {user ? (
            <span className="username">
              Hello, {user.name}
            </span>
          ) : (
            <>
              <button
                className="signin-btn"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </nav>

      {/* 🔥 AUTH MODAL */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Create Account</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={authForm.name}
              onChange={(e) =>
                setAuthForm({ ...authForm, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />

            <button className="primary-btn" onClick={handleRegister}>
              Register
            </button>

            <button
              className="secondary-btn"
              onClick={() => setShowAuthModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;