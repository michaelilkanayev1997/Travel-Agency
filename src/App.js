import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AuthContextProvider>
  );
}
