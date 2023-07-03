/**
=========================================================
* Material Tailwind Dashboard React - v2.0.0
=========================================================
* Product Page: https://www.sporgates.com/product/sporgates
* Copyright 2022 SporGates (https://www.sporgates.com)
* Licensed under MIT (https://github.com/creativetimofficial/sporgates/blob/main/LICENSE.md)
* Coded by SporGates
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
