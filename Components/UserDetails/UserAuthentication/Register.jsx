"use client";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios"; // Import axios for API requests
import "./register.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) return; // Stop submission if validation fails

    setLoading(true);

    try {
      // Example API endpoint
      const response = await axios.post("/api/userRegisteration", {
        username,
        email,  
        password,
      });
      console.log(response.data, "response.data");

      // Reset the form fields
      if (
        response.data.statusCode === 201 ||
        response.data.status === "success"
      ) {
        toast.success(response.data?.message);
      } else {
        toast.error(response.data?.message);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] border border-black w-full">
      <form className="form  " onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Username</label>
          {usernameError && <p className="error">{usernameError}</p>}
        </div>
        <div className="inputForm">
          <FaUser size={20} />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            className="input"
            type="text"
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="inputForm">
          <FaEnvelope size={20} />
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
          <FaLock size={20} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="input"
            type="password"
          />
        </div>

        <div className="flex-column">
          <label>Confirm Password</label>
          {confirmPasswordError && (
            <p className="error">{confirmPasswordError}</p>
          )}
        </div>
        <div className="inputForm">
          <FaLock size={20} />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password"
            className="input"
            type="password"
          />
        </div>

        <button
          className="button-submit mt-5 bg-black text-white hover:bg-black"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="error">{error}</p>}
        <Link href={"/login"} className="mt-4">
          Already have an account? <span className="span mt-4">Sign In</span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
