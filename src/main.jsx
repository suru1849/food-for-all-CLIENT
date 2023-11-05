import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router";
import AuthProvider from "./Provider/AuthProvider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-screen-xl mx-auto font-varela-round">
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={Router}></RouterProvider>
      </React.StrictMode>
    </AuthProvider>
  </div>
);
