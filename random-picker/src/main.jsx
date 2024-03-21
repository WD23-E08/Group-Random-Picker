import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RandomPickerProvider from "./contexts/RandomPickerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RandomPickerProvider>
      <App />
    </RandomPickerProvider>
  </React.StrictMode>
);
