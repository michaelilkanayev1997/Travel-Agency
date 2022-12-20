import React from "react";
import styled from "styled-components";

export default function QuantityChange({ doc, setQuantity, quantity }) {
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
    <StyledSection>
      <div>
        <div className="inputQuantity">
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
          <span>Total: ${doc.price * quantity}</span>
        </div>
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  font-family: "Nuosu SIL", serif;
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
  .inputQuantity .buttons {
    display: flex;
    margin-left: 26rem;
    margin-top: -3rem;
  }

  .inputQuantity span {
    font-family: "Popping", sans-serif;
    display: inline;
    color: crimson;
    font-weight: bold;
    font-size: 20px;
    margin-left: 2rem;
    margin-top: -3rem;
  }
`;
