/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { UserAuth } from "./context/AuthContext";
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";

const PaypalCheckoutButton = (props) => {
  const { product, quantity, costumer } = props;
  const { user } = UserAuth();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentAmount = useRef(1);
  const Zipcode = useRef("");

  console.log(Zipcode.current);

  useEffect(() => {
    currentAmount.current = quantity;
    Zipcode.current = costumer.zipcode;
  }, [quantity, costumer.zipcode]);

  async function handleTrip() {
    if (user) {
      const TripRef = doc(db, "store", product.id);

      // Set the 'seats' amount field of the destinations
      await updateDoc(TripRef, {
        seats: product.seats - currentAmount.current,
      });
      console.log("Trip seats amount was updated!");
    }
  }

  async function handleUser(orderID) {
    if (user) {
      const docRef = doc(db, "users", user.uid);

      const orderNumber = `order-${orderID}`;

      const docData = {
        [orderNumber]: {
          TripId: product.id,
          amount: currentAmount.current,
          paypalOrderID: orderID,
          destinations: product.name,
          price: product.price * currentAmount.current + "$",
          Orderdate: new Date(),
          costumerfullname: costumer.name,
          costumerId: costumer.id,
          costumerCity: costumer.city,
          costumerHouse: costumer.house,
          costumerStreet: costumer.street,
          costumerZip: Zipcode.current,
        },
      };
      await setDoc(docRef, docData, { merge: true });
      console.log("User document was updated");
    } else {
      console.log("no user to update");
    }
  }
  const navigateToInoice = () => {
    navigate("/invoice", {
      state: { amount: currentAmount.current, product, costumer, Zipcode },
    });
  };

  const handleApprove = (orderID) => {
    //if response is success
    setPaidFor(true);
    //Refresh user's account or subscription status
    handleUser(orderID);
    handleTrip();

    navigateToInoice();

    if (paidFor) {
      //Display success messgae, model or redirect user to success page
      alert("Thank you for your purchase !");
    }
  };

  if (error) {
    //Display an error message, model or redirect user to error page
    alert(error);
  }

  return (
    <PayPalScriptProvider>
      <StyledSection>
        <PayPalButtons
          type="button"
          style={{
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "pill",
          }}
          onClick={(data, actions) => {
            //Validate on button click, client or server side
            if (product.seats < 1) {
              setError(
                "Unfortunately, there are no seats left for this specific trip."
              );
              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.name + " Trip",
                  amount: {
                    currency_code: "USD",
                    value: product.price * currentAmount.current,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);

            handleApprove(data.orderID);
          }}
          onCancel={() => {
            //Display the cancel message, model or redirect user to cancel page
          }}
          onError={(err) => {
            setError(err);
            console.log("PayPal error", err);
          }}
        />
      </StyledSection>
    </PayPalScriptProvider>
  );
};

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

export default PaypalCheckoutButton;
