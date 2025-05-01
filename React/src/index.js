import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Tạo root container
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render ứng dụng
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Đo hiệu suất nếu cần
reportWebVitals();
