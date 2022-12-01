import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
