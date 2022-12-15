/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { db } from "./Firebase";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Checkout() {
  const location = useLocation();

  const doc = location.state.path;

  return (
    <Fragment>
      <Navbar />
      <StyledSection>
        <div className="app">
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

              <button className="cart">Buy</button>
              <span>Total: {doc.price}</span>
            </div>
          </div>
        </div>
      </StyledSection>
      <Footer />
    </Fragment>
  );
}

const StyledSection = styled.section`
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
    margin: 25px;
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
  .box span {
    color: crimson;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5rem;
  }
  .box .colors button {
    width: 30px;
    height: 30px;
    border: 1px solid #333;
    outline: none;
    margin-right: 5px;
    cursor: pointer;
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

  @media (max-width: 500px) {
    .thumb {
      height: 50px;
    }
    .thumb img {
      width: 50px;
    }
  }
`;
