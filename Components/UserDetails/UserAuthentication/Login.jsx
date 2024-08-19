"use client";
import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { RiMailLine, RiLockLine } from "react-icons/ri";
import axios from "axios"; // Import axios for API requests
import "./login.css";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { signIn } from "next-auth/react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEmail, setModalEmail] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError("");
    setPasswordError("");

    // Validation
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return; // Stop submission if validation fails

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
      });
      console.log(response, "login response");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle modal submit
  const handleModalSubmit = async () => {
    setModalVisible(false);
    if (!modalEmail) {
      setError("Email is required.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(modalEmail)) {
      setError("Email address is invalid.");
      return;
    }

    try {
      // Example API endpoint for modal email
      const response = await axios.post("/api/send-email", {
        email: modalEmail,
      });
      console.log(response.data); // Handle successful email submission
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] border border-black">
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email</label>
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="inputForm">
          <RiMailLine size={20} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="input"
            type="text"
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <div className="inputForm">
          <RiLockLine size={20} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="input"
            type="password"
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="radio" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="error">{error}</p>}
        <Link href={"/register"} className="p">
          Don't have an account? <span className="span">Sign Up</span>
        </Link>
        <p className="p line">Or With</p>
        <div className="flex-row">
          <button className="btn google" type="button">
            <FaGoogle size={20} />
            Google
          </button>
          <button
            className="btn apple"
            type="button"
            onClick={() => setModalVisible(true)}
          >
            <MdEmail size={20} />
            Email
          </button>
        </div>
      </form>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>Enter Email</h2>
            {error && <p className="error">{error}</p>}
            <input
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)}
              placeholder="Enter your Email"
              className="input"
              type="text"
            />
            <button className="button-submit" onClick={handleModalSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
