import React from "react";
import CheckoutPDF from "./CheckoutPDF";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Invoice() {
  return (
    <>
      <Navbar />
      <StyledSection>
        <div className="page">
          <div className="checkout">
            <CheckoutPDF />
          </div>
        </div>
      </StyledSection>
      <Footer />
    </>
  );
}
const StyledSection = styled.section`
  vertical-align: middle;
  .page {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .checkout {
    background-color: #f1f1f1;
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: grid;
    place-items: center;
  }
`;
