/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { collection } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./Firebase";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NightImage from "../assets/moon.png";
import CalendarImage from "../assets/calendar.png";
import { Link } from "react-router-dom";
import StoreFilterSection from "./StoreFilterSection";
import moment from "moment";

export default function Store() {
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [price, setPrice] = useState("");

  //getting store (Firestore) documents
  const query = collection(db, "store");
  const [docs, loading, error] = useCollectionData(query);

  useEffect(() => {
    setAll(docs);
    setFiltered(docs);
  }, [loading]);

  return (
    <Fragment>
      <Navbar />
      <StyledSection>
        <section className="property">
          <div className="Loading">{loading && "Loading..."}</div>
          {!loading ? (
            <div className="center">
              <h3>Store</h3>
            </div>
          ) : (
            loading
          )}

          {!loading ? (
            <div className="filter-container">
              <StoreFilterSection
                setFiltered={setFiltered}
                all={all}
                setSearch={setSearch}
                setDepartureDate={setDepartureDate}
                setReturnDate={setReturnDate}
                setPrice={setPrice}
              />
            </div>
          ) : (
            loading
          )}

          <div className="row">
            {filtered
              ?.filter((doc) => {
                return search.toLowerCase() === ""
                  ? filtered
                  : doc.name.toLowerCase().includes(search);
              })
              .filter((doc) => {
                return price === ""
                  ? filtered
                  : doc.price === parseInt(price, 10);
              })
              .filter((doc) => {
                return departureDate === ""
                  ? filtered
                  : moment(departureDate)
                      .format("DD/MM/YYYY")
                      .includes(doc.flightDate);
              })
              .filter((doc) => {
                return returnDate === ""
                  ? filtered
                  : moment(returnDate)
                      .format("DD/MM/YYYY")
                      .includes(doc.returndate);
              })
              .map((doc, index) => {
                return (
                  <div className="column" key={index}>
                    <div className="single-property">
                      <div className="card" key={index}>
                        <div className="property-thumb">
                          <div className="property-tag"> Available </div>
                          {doc.popular ? (
                            <div className="property-tag2"> Popular! </div>
                          ) : (
                            <div></div>
                          )}

                          <img src={doc.image} alt={doc.image} />
                        </div>

                        <div className="property-content">
                          <h3>{doc.name}</h3>
                          <div className="mark">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Flight Company : {doc.flightcompany}</span>
                          </div>
                          <div className="more-property">
                            <Link
                              className="property-btn"
                              to="/checkout"
                              state={{ path: doc }}
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                        <div className="property-footer">
                          <ul>
                            <li>
                              <span
                                style={{ fontWeight: "bold", fontSize: 17 }}
                              >
                                ${doc.price}
                              </span>
                            </li>
                            <li>
                              <img src={NightImage} alt={NightImage} />
                              <span style={{ fontWeight: "bold" }}>
                                {doc.nights}
                              </span>
                            </li>
                            <li>
                              <img src={CalendarImage} alt={CalendarImage} />
                              <span style={{ fontWeight: "bold" }}>
                                {doc.flightDate}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </StyledSection>
      <Footer />
    </Fragment>
  );
}

const StyledSection = styled.section`
  min-height: 100vh;
  .property .filter-container {
    position: aboulte;
    padding-top: 1rem;
    left: -190px;
    bottom: 50px;
  }
  .Loading {
    font-size: 55px;
    font-weight: 500;
    color: #001d38;
    font-family: "Nuosu SIL", serif;
    text-align: center;
  }
  .property {
    padding-top: 4rem;
    padding-bottom: 1rem;
    display: grid;
    place-items: center;
  }
  .center h3 {
    font-size: 55px;
    font-weight: 500;
    color: #001d38;
    font-family: "Nuosu SIL", serif;
  }
  .row {
    padding-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .single-property {
    width: 350px;
    border-radius: 1rem;
    box-shadow: 0 5px 15px rgb(0 0 0 / 5%);
    margin-bottom: 30px;
    overflow: hidden;
  }
  .column {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .property-thumb {
    position: relative;
    overflow: hidden;
  }
  .property-tag {
    position: absolute;
    top: 25px;
    left: 25px;
    background: #fdae5c;
    padding: 8px 14px;
    color: #fff;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 500;
    z-index: 1;
    font-family: "Poppins", sans-serif;
  }
  .property-tag2 {
    position: absolute;
    top: 60px;
    left: 25px;
    background: #fdde5c;
    padding: 8px 14px;
    color: #001d38;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 580;
    z-index: 1;
    font-family: "Poppins", sans-serif;
  }
  .property-thumb img {
    width: 350px;
    height: 225px;
    vertical-align: middle;
    transition: 0.3s;
  }
  .single-property:hover .property-thumb img {
    transform: scale(1.06);
  }
  .property-content {
    padding: 25px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #dcdcdc;
  }
  .property-content h3 {
    margin-bottom: 8px;
    font-size: 20px;
    color: #001d38;
    font-weight: 600;
    font-family: "Popping", sans-serif;
  }
  .mark span {
    font-size: 13px;
    font-weight: 1000;
    color: #919191;
    margin-left: 5px;
    font-family: "Popping", sans-serif;
  }
  .amount {
    display: inline-block;
    background: #00d363;
    border-radius: 30px;
    padding: 7px 18px;
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    margin-top: 13px;
    font-family: "Popping", sans-serif;
  }
  .property-footer {
    padding: 12px 25px;
    background-color: #a9a9a9;
  }
  .property-footer ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .property-footer ul li span {
    font-family: "Popping", sans-serif;
    color: #001d38;
    font-size: 13px;
    font-weight: 400;
    margin-left: 5px;
  }

  .property-footer ul li img {
    width: 16px;
  }
  .more-property {
    padding-top: 2rem;
  }
  .more-property .property-btn {
    padding: 14px 31px;
    display: inline-block;
    border-radius: 2rem;
    font-size: 15px;
    border: 1px solid #fdae5c;
    font-weight: 700;
    font-family: "Popping", sans-serif;
    letter-spacing: 0.5px;
    color: #fdae5c;
    background-color: #001d38;
    transition: 0.5s ease;
  }
  .more-property .property-btn:hover {
    box-shadow: 0 0 40px 40px #fdae5c inset;
    color: white;
  }
`;
