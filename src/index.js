import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // CSS 파일이 필요 없다면 제거 가능

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);