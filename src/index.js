import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ShopingCardProvider from "./components/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopingCardProvider>
        <App />
      </ShopingCardProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
