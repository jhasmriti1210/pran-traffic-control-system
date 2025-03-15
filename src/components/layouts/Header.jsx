import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaRegListAlt,
  FaPhone,
  FaGamepad,
  FaHandsHelping,
  FaRobot,
  FaMapMarkedAlt,
  FaSmog,
} from "react-icons/fa";

import "../../components/Home.css";

const delhiDistricts = [
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",
];

const Header = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlePlayEarnClick = (event) => {
    event.preventDefault();
    if (isSignedIn) {
      navigate("/gamified");
    } else {
      navigate("/");
    }
  };

  const handleAqiPrediction = (event) => {
    event.preventDefault();
    if (isSignedIn) {
      navigate("/prediction");
    } else {
      navigate("/");
    }
  };

  const handleTrafficOptimizer = (event) => {
    event.preventDefault();
    if (isSignedIn) {
      navigate("/best-route");
    } else {
      navigate("/");
    }
  };

  const handleChatbot = (event) => {
    event.preventDefault();
    if (isSignedIn) {
      navigate("/chatbot");
    } else {
      navigate("/");
    }
  };

  const handleDistrictSelect = (district) => {
    navigate(`/schemes/${district.replace(/\s+/g, "-").toLowerCase()}`);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>PranVayu</h1>
      </div>

      <ul>
        <li>
          <a href="/">
            <FaHome /> Home
          </a>
        </li>
        <li>
          <a href="#about">
            <FaInfoCircle /> About
          </a>
        </li>
        <li>
          <a href="#features">
            <FaRegListAlt /> Features
          </a>
        </li>

        {/* Scheme Dropdown */}
        <li className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <a href="#" className="dropdown-toggle">
            <FaHandsHelping /> Get Involved
          </a>
          {dropdownOpen && (
            <ul className="dropdown-content">
              {delhiDistricts.map((district) => (
                <li
                  key={district}
                  onClick={() => handleDistrictSelect(district)}
                >
                  {district}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <a href="/chatbot" onClick={handleChatbot}>
            <FaRobot /> Assistant
          </a>
        </li>

        <li>
          <a href="/gamified" onClick={handlePlayEarnClick}>
            <FaGamepad /> Play & Earn
          </a>
        </li>
        <li>
          <a href="/contact">
            <FaPhone /> Contact
          </a>
        </li>
        <li>
          <a href="/prediction" onClick={handleAqiPrediction}>
            <FaSmog /> AQI Predictor
          </a>
        </li>
        <li>
          <a href="/best-route" onClick={handleTrafficOptimizer}>
            <FaMapMarkedAlt /> Find Best Route
          </a>
        </li>
      </ul>

      {/* Authentication Buttons */}
      <div className="auth-buttons">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
