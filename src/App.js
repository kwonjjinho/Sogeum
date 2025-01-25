import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";
import RoulettePage from "./pages/RoulettePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/roulette" element={<RoulettePage />} />
      </Routes>
    </Router>
  );
}

export default App;