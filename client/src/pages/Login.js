import React, { useState } from "react";
import "./styles/login.css"; // Ensure the CSS file is in the same directory
import { useNavigate } from "react-router-dom";
import { useAPI } from "../Context";
import axios from "axios";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    loading,
    setLoading,
  } = useAPI();
  const navigate = useNavigate(); // Hook to navigate after login

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation (basic)
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password }
      );

      // Store token in localStorage or sessionStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("You have logged in successfully!");
      navigate("/products"); // Navigate to dashboard or home page
    } catch (error) {
      setLoading(false);
      alert("Login Failed");
    }
  };

  // Handle Registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Input validation (basic)
    if (!email || !password || !name) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please log in.");
      setIsRegistering(false); // Switch to login form
    } catch (error) {
      setLoading(false);
      alert("Registration Failed");
    }
  };

  const handleRegisterClick = () => {
    setIsRegistering(true); // Toggle to register form
  };

  return (
    <div className="fullcontent">
      <div className="headings">
        <h1>Our Book Store</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          minima libero, quisquam voluptates reprehenderit quia! Sit vel vero
          officiis doloribus? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Repellat ea nisi facere earum optio eos dolorum ipsam, quae nemo
          incidunt!
        </h2>
      </div>

      <div className="formbox">
        <h3>{isRegistering ? "Register" : "Log In"}</h3>

        <form id="form" onSubmit={isRegistering ? handleRegistration : handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="asd"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="asd"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isRegistering && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="asd"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </>
          )}

          <input
            id="btn"
            type="submit"
            name="submit"
            value={isRegistering ? "Register" : "Log In"}
            className="mainbox"
          />
          <label htmlFor={isRegistering ? "login" : "register"}>
            {isRegistering ? "Already have an account?" : "New customer?"}
          </label>
          <a
            href="#!"
            onClick={() => setIsRegistering(!isRegistering)}
            className="mainbox"
          >
            {isRegistering ? "Login Now" : "Register Now"}
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
