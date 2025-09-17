import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./common/styles/index.css";
import App from "./App/App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
