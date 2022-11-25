import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container">
            <img src={logo} alt="" />
            TravelGo
          </div>
          <div className="toggle"></div>
        </div>
        <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#recommend">Recommend</a>
        </li>
        <li>
          <a href="#testimonials">Testimonials</a>
        </li>
      </ul>
      <button>Connect</button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
`;
