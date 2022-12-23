import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Contact from "./components/Contact.jsx";
import Aboutus from "./components/Aboutus.jsx";
import Store from "./components/Store.jsx";
import Checkout from "./components/Checkout";
import Invoice from "./components/Invoice.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App() {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <AuthContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/store" element={<Store />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </AuthContextProvider>
    </PayPalScriptProvider>
  );
}
