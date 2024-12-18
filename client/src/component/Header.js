import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/knowledge.png";

export default function Header() {
  const [headerClass, setHeaderClass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (isLoggedIn) {
    navLinks.push({ name: "Books", path: "/products" }); // Add Books page if logged in
  }

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setHeaderClass("header-scrolled");
    } else {
      setHeaderClass("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to Home
  };

  useEffect(() => {
    // Check if the user is logged in by verifying the token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update the login status based on the token
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav id="header" className={`header fixed-top ${headerClass}`}>
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="d-flex align-items-center">
          <img src={logo} alt="Logo" width="60" />
        </a>

        <nav id="navbar" className="navbar">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <button
                  className="getstarted scrollto border-0 shadow"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              ) : (
                <Link to="/login">
                  <button className="getstarted scrollto border-0 shadow">
                    Sign In
                  </button>
                </Link>
              )}
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </nav>
  );
}
