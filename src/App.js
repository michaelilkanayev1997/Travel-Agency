import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
