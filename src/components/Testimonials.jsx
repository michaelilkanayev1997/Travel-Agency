/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./Firebase";

export default function Testimonials() {
  //getting reviews (Firestore) documents
  const query = collection(db, "reviews");
  const [docs, loading, error] = useCollectionData(query);

  return (
    <Section id="testimonials">
      <div className="title">
        <h2>Happy Customers</h2>
      </div>

      <div className="testimonials">
        {docs?.map((doc, index) => {
          return (
            <div className="testimonial" key={index}>
              <p>{doc.review}</p>
              <div className="info">
                <img src={doc.image} alt={doc.image} />
                <div className="details">
                  <h4>{doc.name}</h4>
                  <span>Customers</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    text-align: center;
    margin-bottom: 2rem;
    font-family: "Nuosu SIL", serif;
    font-size: 35px;
    font-weight: 500;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
