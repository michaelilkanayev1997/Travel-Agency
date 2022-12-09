import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  const [result, showResult] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isValid = name !== "" && email !== "" && message !== "";

  const sendEmail = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("input value is NOT empty");
      emailjs
        .sendForm(
          "service_fazscnd",
          "template_o68liqp",
          e.target,
          "te068Cv3WEsAMqJuU"
        )
        .then((res) => {
          console.log(res);
        });
      ResterFields();
      e.target.reset();
      showResult(true);
    } else {
      alert("Please enter all fields");
    }
  };

  const Result = () => {
    return (
      <p>Your message has been successfully sent. we will contact you soon !</p>
    );
  };

  const ResterFields = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <StyledContactForm>
        <div className="container">
          <h1>Contact</h1>
          <div className="form-contact">
            <form onSubmit={sendEmail}>
              <div className="name inp">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="email inp">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="Message inp">
                <label>Message</label>
                <textarea
                  rows="4"
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="send inp">
                <input type="submit" value="Send" />
              </div>
            </form>
          </div>
          <div className="row">{result ? <Result /> : null}</div>
        </div>
      </StyledContactForm>
      <Footer />
    </>
  );
}

// Styles
const StyledContactForm = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 105vh;

  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  h1 {
    margin-top: 50px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 50px;
  }
  p {
    font-weight: bold;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .form-contact {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    background-position: center;
    background-size: cover;
    box-shadow: 0px 0px 20px 0px grey;
    width: 70%;
    height: 80vh;
  }

  .inp input {
    border-radius: 10px;
    font-size: 18px;
    height: 40px;
    background-color: rgba(204, 204, 204, 0.8);
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
    flex-direction: column;
    margin-bottom: 20px;
  }

  .inp label {
    align-self: center;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
    width: 120px;
    color: black;
    background-color: rgb(255, 255, 255, 0.3);
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
    background-color: rgb(44, 139, 139);
  }

  .inp label:hover::after {
    width: 120px;
  }
  textarea {
    resize: none;
    background-color: rgba(204, 204, 204, 0.8);
    font-size: 18px;
    border: 2px solid black;
  }
  .send input {
    padding: 5px 70px;
    margin-top: 20px;
    background-color: rgba(225, 6, 6, 0.7);
    color: white;
    height: 50px;
    transition: 0.3s;
  }
  .send input:hover {
    background-color: rgba(225, 6, 6, 0.9);
    transform: scale(1.01);
  }
`;
