import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import GamePage from "./pages/GamePage";
import Homepage from "./pages/Homepage";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} /> {/* Use element prop */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
