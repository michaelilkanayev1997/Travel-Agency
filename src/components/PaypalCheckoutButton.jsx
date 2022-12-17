/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
  const { product } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    //Call backend function to fulfill order

    //if response is success
    setPaidFor(true);
    //Refresh user's account or subscription status

    //if the response is error
    //setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. please contact us for assistance.");
  };

  if (paidFor) {
    //Display success messgae, model or redirect user to success page
    alert("Thank you for your purchase !");
  }

  if (error) {
    //Display an error message, model or redirect user to error page
    alert(error);
  }

  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        style={{
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill",
        }}
        onClick={(data, actions) => {
          //Validate on button click, client or server side
          const NoSeatsLeft = false;

          if (NoSeatsLeft) {
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
                description: product.name,
                amount: {
                  currency_code: "USD",
                  value: 250.0,
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
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
