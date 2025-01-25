import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to Question Roulette</h1>
      <Link to="/edit">
        <button>질문수정</button>
      </Link>
      <Link to="/roulette">
        <button>룰렛시작</button>
      </Link>
    </div>
  );
};

export default MainPage;