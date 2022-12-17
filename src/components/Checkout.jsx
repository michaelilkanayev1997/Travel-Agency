/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "./Firebase";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

export default function Checkout() {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const doc = location.state.path;

  //quantity Increment/ Decrement in Hooks - start
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  //quantity Increment/ Decrement in Hooks - end

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

        <div className="quantityText">quantity:</div>
        <div className="inputQuantity">
          <div className="payapl">
            <p className="cart">Secure payment via PayPal</p>
            <div className="paypal-button-container">
              <PaypalCheckoutButton product={doc} />
            </div>
          </div>
          <div className="buttons">
            <button
              type="button"
              onClick={handleDecrement}
              className="inputbutton"
            >
              -
            </button>
            <div className="quantity">{quantity}</div>
            <button
              type="button"
              onClick={handleIncrement}
              className="inputbutton"
            >
              +
            </button>
          </div>
          <span>Total: ${300 * quantity}</span>
        </div>
      </StyledSection>
      <Footer />
    </Fragment>
  );
}

const StyledSection = styled.section`
  font-family: "Nuosu SIL", serif;
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
  .inputQuantity span {
    color: crimson;
    font-weight: bold;
    font-size: 20px;
    margin-left: 4rem;
    margin-top: -0.5rem;
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
    text-align: center;
    padding-left: 24rem;
    padding-bottom: 1rem;
  }
  .paypal-button-container {
    width: 30px;
  }
  .payapl {
    padding-left: 20rem;
    padding-bottom: 3rem;
    margin-top: -3rem;
  }
  .payapl p {
    font-size: 20px;
    padding-bottom: 1rem;
    font-weight: bold;
  }
  .buttons {
    display: flex;
    margin-left: 10rem;
    margin-top: -0.5rem;
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
