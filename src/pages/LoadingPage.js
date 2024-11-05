import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../logo.png"; 
import "../styles/LoadingPage.css"; 

const LoadingPage = () => {
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); 
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-page">
      <img src={logo} alt="Trivia Master Logo" className="logo" />
      <h1>Trivia Master Present</h1>
      <p>Made with ©James</p>
      <div className="loading-bar">
        <div className="loading" />
      </div>
    </div>
  );
};

export default LoadingPage;
