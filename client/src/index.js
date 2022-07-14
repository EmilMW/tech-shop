import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { AuthProvider } from "./auth/authProvider";
import { CartProvider } from "./cart/cartProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
