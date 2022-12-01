import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "./context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(UserAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div>
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
        </div>
      </Section>
      <h1 className="text-center text-3xl font-bold py-8">Sign in</h1>
      <div className="max-w-[240px] m-auto py-4">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
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
