import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../logo.png"; // Import the logo image
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate(); // Use useNavigate

  const startGame = () => {
    navigate("/game"); // Navigate to the game page
  };

  const exitGame = () => {
    window.close(); 
  };

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        {/* Add the logo above the title */}
        <img src={logo} alt="Trivia Master Logo" className="logo" />
        <h1>Welcome to Trivia Master</h1>
        <button onClick={startGame} className="home-btn">
          Start Game
        </button>
        <button onClick={exitGame} className="home-btn">
          Exit Game
        </button>
        <p className="copyright-text">
          © {new Date().getFullYear()} James Ekasiba. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
