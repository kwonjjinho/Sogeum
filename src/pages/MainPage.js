import React from "react";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">Welcome to Question Roulette</h1>
      <div className="button-container">
        <Link to="/edit" className="nav-button">
          <button className="action-button">질문수정</button>
        </Link>
        <Link to="/roulette" className="nav-button">
          <button className="action-button">룰렛시작</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;