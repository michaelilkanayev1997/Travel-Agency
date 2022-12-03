import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "./context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const { googleSignIn, user, signIn } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Section>
      <div className="container">
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="button">
          <button onClick={handleLogin}>Login</button>
          <span>
            Not a member ? <Link to="/signup">Sign up</Link>
          </span>
        </div>
        <div>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 50px;
  }
  .container {
    height: 50vh;
    width: 25vw;
    background-color: #2c384a;
    border-radius: 1rem;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    .inputs {
    }
    input {
      background-color: #5c5f63a3;
      border: none;
      font-size: 1.2rem;
      padding: 1rem;
      border-radius: 0.3rem;
      color: white;
      &:focus {
        outline: 1px solid;
        outline-color: #f57c00;
        -moz-outline-radius: 0.3rem;
      }
    }
    .button {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
        color: #039be5;
        text-decoration: none;
      }
      button {
        background-color: #f57c00;
        border: none;
        color: white;
        padding: 0.5rem 2rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-transform: uppercase;
        &:hover {
          background-color: #ffa000;
        }
      }
    }
  }
`;

export default Login;
