/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import QuantityChange from "./QuantityChange";

export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [zipcode, setZIPcode] = useState("");

  const isValidInput =
    name !== "" &&
    id !== "" &&
    city !== "" &&
    street !== "" &&
    house !== "" &&
    zipcode !== "";

  const location = useLocation();
  const doc = location.state.path;

  return (
    <Fragment>
      <Navbar />
      <StyledSection>
        <div className="center">
          <h3>Checkout</h3>
        </div>

        <div className="app">
          <h3>Ticket Details :</h3>
          <div className="details">
            <div className="big-img">
              <img src={doc.image} alt={doc.image} />
            </div>

            <div className="box">
              <div className="row">
                <h2>{doc.name}</h2>
              </div>

              <p>Seats left: {doc.seats}</p>
              <p>Flight Date: {doc.flightDate}</p>
              <p>Return Date: {doc.returndate}</p>
              <p>Nights: {doc.nights}</p>
              <p>Time: {doc.time}</p>
              <p>Flight Company: {doc.flightcompany}</p>
              <p>Gate: {doc.gate}</p>
              <p>*Direct flight</p>
              <p>*Two-way flight</p>
            </div>
          </div>
        </div>
        <div className="form-contact">
          <form>
            <div className="name inp">
              <label>Full Name:</label>
              <input
                type="text"
                required="required"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="email inp">
              <label>ID:</label>
              <input
                type="id"
                required="required"
                name="id"
                onChange={(e) => setID(e.target.value)}
              />
            </div>
            <div className="city inp">
              <label>City:</label>
              <input
                type="city"
                required="required"
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </form>
          <form>
            <div className="name inp">
              <label>Street:</label>
              <input
                type="text"
                required="required"
                name="Street"
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div className="email inp">
              <label>House:</label>
              <input
                type="id"
                required="required"
                name="housenumber:"
                onChange={(e) => setHouse(e.target.value)}
              />
            </div>
            <div className="city inp">
              <label>ZIP code:</label>
              <input
                type="zip"
                required="required"
                name="zipcode"
                onChange={(e) => setZIPcode(e.target.value)}
              />
            </div>
          </form>
        </div>
        {isValidInput ? (
          <div className="paypaltransition">
            <div className="quantityText">Ticket quantity:</div>
            <div className="inputQuantity">
              <div className="payapl">
                <div>
                  <p className="cart">Secure payment via PayPal</p>
                  <div className="paypal-button-container">
                    <PaypalCheckoutButton
                      product={doc}
                      quantity={quantity}
                      costumer={{ name, id, city, street, house, zipcode }}
                    />
                  </div>
                </div>

                <QuantityChange
                  doc={doc}
                  setQuantity={setQuantity}
                  quantity={quantity}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="pleaseenter">Please enter all fields</div>
        )}
      </StyledSection>
      <Footer />
    </Fragment>
  );
}

const StyledSection = styled.section`
  font-family: "Nuosu SIL", serif;

  .pleaseenter {
    align-items: center;
    text-align: center;
    width: 100%;
    height: 21.2vh;
    font-size: 40px;
    font-weight: 500;
    color: #001d38;
    font-family: "Nuosu SIL", serif;
    transition: 0.6s ease;
  }
  .form-contact {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 30rem;
    background-position: center;
    background-size: cover;
    width: 70%;
    height: 50vh;
  }
  .inp input {
    border-radius: 10px;
    font-size: 18px;
    height: 40px;
    width: 180px;
    background-color: rgba(100, 100, 100, 0.1);
    border: 2px solid black;
  }
  ::placeholder {
    padding-left: 4px;
    color: black;
    text-align: left;
  }
  .inp {
    width: 420px;
    display: flex;

    margin-bottom: 20px;
  }

  .inp label {
    padding-right: 1rem;
    align-self: center;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
    width: 130px;
    color: black;
    background-color: rgb(300, 255, 255, 0.3);
    position: relative;
  }
  .inp label::after {
    content: "";
    width: 0px;
    transition: 0.3s;
    left: 0;
    top: 30px;
    height: 4px;
    position: absolute;
    background-color: rgb(1, 139, 139);
  }

  .inp label:hover::after {
    width: 120px;
  }

  .center h3 {
    font-size: 60px;
    font-weight: 500;
    color: #001d38;
    font-family: "Nuosu SIL", serif;
    text-align: center;
    padding-top: 3rem;
  }
  .app h3 {
    padding-top: 1rem;
    font-size: 25px;
    font-weight: 250;
    color: #001d99;
    font-family: "Nuosu SIL", serif;
    text-align: center;
  }
  .app {
    max-width: 1000px;
    width: 100%;
    margin: 50px auto;
    box-shadow: 0 0 5px #ccc;
    margin-bottom: 0rem;
  }
  .details {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 30px 0;
  }
  .details .big-img {
    max-width: 500px;
    min-width: 290px;
    overflow: hidden;
    margin: 25px;
  }
  .big-img img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    display: block;
    object-fit: cover;
  }

  .details .box {
    max-width: 500px;
    min-width: 290px;
    margin: 5px;
    margin-bottom: 0rem;
  }
  .box .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .box .row h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 35px;
    font-weight: 1200px;
  }

  .box p {
    line-height: 1.5;
    margin: 15px 0;
    font-family: "Popping", sans-serif;
  }
  .thumb {
    width: 100%;
    height: 100px;
    display: flex;
    cursor: pointer;
    margin: 10px 0;
  }
  .thumb img {
    width: 90px;
    height: 100%;
    display: block;
    object-fit: cover;
    border: 1px solid #ddd;
    margin-right: 5px;
    opacity: 0.7;
    border-radius: 5px;
  }
  .thumb img.active {
    opacity: 1;
    border: 1px solid lightseagreen;
  }
  .box .cart {
    background: #333;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 25px;
    margin-top: 15px;
    display: inline-block;
    border-radius: 1.5rem;
    font-size: 15px;
    border: 1px solid #fdae5c;
    font-weight: 700;
    font-family: "Popping", sans-serif;
    letter-spacing: 0.5px;
    color: #fdae5c;
    background-color: #001d38;
    transition: 0.5s ease;
  }
  .inputQuantity {
    display: flex;
    font-weight: 700;
    font-family: "Popping", sans-serif;
    width: 100%;
    padding-left: 0rem;
  }
  .inputQuantity button {
    font-weight: 700;
    font-family: "Popping", sans-serif;
    width: 50px;
    height: 35px;
    font-size: 25px;
    border-radius: 0.6rem;
    text-align: center;
    background-color: lightgray;
    cursor: pointer;
  }
  .inputQuantity .quantity {
    font-weight: 700;
    font-family: "Popping", sans-serif;
    width: 50px;
    font-size: 25px;
    text-align: center;
  }
  .quantityText {
    font-weight: 700;
    font-family: "Popping", sans-serif;
    font-size: 19px;
    padding-left: 50rem;
    padding-bottom: 1rem;
  }
  .paypal-button-container {
    transition: 0.6s ease;
    width: 30px;
  }
  .payapl {
    transition: 0.8s ease;
    padding-left: 24rem;
    padding-bottom: 3rem;
    margin-top: -3rem;
  }
  .payapl p {
    font-size: 20px;
    padding-bottom: 1rem;
    font-weight: bold;
    margin-left: -2rem;
  }

  @media (max-width: 500px) {
    .thumb {
      height: 50px;
    }
    .thumb img {
      width: 50px;
    }
  }
`;
