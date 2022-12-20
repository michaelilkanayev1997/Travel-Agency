/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function StoreFilterSection({
  setFiltered,
  all,
  setSearch,
  setDepartureDate,
  setReturnDate,
  setPrice,
}) {
  const [active, setActive] = useState("");

  const CheckDepartureDate = (date) => {
    if (new Date(date) < new Date(new Date().toDateString())) {
      alert("Please choose a date from the future");
    } else {
      setDepartureDate(date);
    }
  };

  useEffect(() => {
    if (active === "") {
      setFiltered(all);
      return;
    }
    if (active !== "popular") {
      const filtered = all.filter((doc) => doc.flightcompany.includes(active));
      setFiltered(filtered);
      console.log(filtered);
    } else if (active === "popular") {
      const filteredPopular = all.filter((doc) => doc.popular === true);
      setFiltered(filteredPopular);
      console.log(filteredPopular);
    }
  }, [active]);

  return (
    <StyledSection>
      <div className="filter-container">
        <button
          className={active === "" ? "active" : ""}
          onClick={() => setActive("")}
        >
          All
        </button>
        <button
          className={active === "popular" ? "active" : ""}
          onClick={() => setActive("popular")}
        >
          Popular
        </button>
        <button
          className={active === "EL-AL" ? "active" : ""}
          onClick={() => setActive("EL-AL")}
        >
          EL-AL Flights
        </button>
        <button
          className={active === "AIRFLY" ? "active" : ""}
          onClick={() => setActive("AIRFLY")}
        >
          AIRFLY Flights
        </button>
        <button
          className={active === "ARKIA" ? "active" : ""}
          onClick={() => setActive("ARKIA")}
        >
          ARKIA Flights
        </button>
        <button
          className={active === "SP-FLY" ? "active" : ""}
          onClick={() => setActive("SP-FLY")}
        >
          SP-FLY Flights
        </button>
      </div>

      <div className="bottom-filter">
        <div className="price-filter">
          <input
            type="text"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <div className="country-filter">
          <input
            type="text"
            name="country"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Country"
          />
        </div>
        <div className="date-filter">
          <p>Departure Date</p>
          <input
            type="date"
            onChange={(e) => CheckDepartureDate(e.target.value)}
          />
        </div>
        <div className="date-filter">
          <p>Return Date</p>
          <input type="date" onChange={(e) => setReturnDate(e.target.value)} />
        </div>
      </div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  .filter-container button {
    margin-right: 0.5rem;
    min-width: 5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: white;
    color: rgb(65, 98, 168);
    border-radius: 1rem;
    border: 2px solid rgb(28, 98, 168);
    font-weight: bold;
    cursor: pointer;
  }
  button.active {
    background: rgb(65, 98, 168);
    color: white;
  }
  .country-filter {
    padding-top: 1rem;
    margin-right: 0.5rem;
  }
  .price-filter {
    padding-top: 1rem;
    margin-right: 0.5rem;
  }
  .price-filter input {
    border-radius: 10px;
    font-size: 18px;
    height: 40px;
    width: 100px;
    background-color: rgba(204, 204, 204, 0.8);
    border: 2px solid black;
  }
  .price-filter input:focus {
    transition: 0.3s;
    width: 110px;
    color: black;
    background-color: lightgoldenrodyellow;
  }
  .bottom-filter {
    display: flex;
    margin-left: 3.5rem;
  }
  .country-filter input {
    border-radius: 10px;
    font-size: 18px;
    height: 40px;
    width: 150px;
    background-color: rgba(204, 204, 204, 0.8);
    border: 2px solid black;
  }
  .country-filter input:focus {
    transition: 0.3s;
    width: 160px;
    color: black;
    background-color: lightgoldenrodyellow;
  }
  .date-filter input {
    border-radius: 10px;
    font-size: 18px;
    height: 25px;
    width: 140px;
    border: 2px solid black;
  }
  .date-filter {
    margin-right: 0.5rem;
    min-width: 5rem;
    padding: 0.5rem 1rem;
  }
  input::placeholder {
    padding-left: 4px;
    color: gray;
    text-align: left;
  }
`;
