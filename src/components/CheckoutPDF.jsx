import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { UserAuth } from "./context/AuthContext";
import styled from "styled-components";
import { Col, Divider, Row, Table } from "antd";
import logoImage from "../assets/traveling.png";
import moment from "moment";
import { useLocation } from "react-router-dom";

export default function CheckoutPDF() {
  const { state } = useLocation();

  const { amount, product, costumer, Zipcode } = state || {};

  const { user } = UserAuth();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice-" + product.id,
  });
  const CurrentDate = moment(new Date().toDateString()).format("DD/MM/YYYY");

  return (
    <>
      <StyledSection>
        <div
          className="page"
          ref={componentRef}
          style={{ width: "100%", height: window.innerHeight }}
        >
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex" }}>
              <Row>
                <Col>
                  <Divider style={{ fontSize: 40, fontWeight: "bold" }}>
                    Invoice
                  </Divider>
                </Col>
                <Col
                  style={{
                    marginLeft: 350,
                    marginTop: 32,
                  }}
                  offset={200}
                >
                  <table>
                    <tr>
                      <img alt="s" src={logoImage} />
                    </tr>
                  </table>
                </Col>
              </Row>
            </div>

            <Row gutter={24} style={{ marginTop: 32 }}>
              <Col span={8}>
                <h3>Name : {costumer.name}</h3>
                <div>Email : {user.email}</div>
                <div>ID : {costumer.id}</div>
                <div>ZIP code : {Zipcode.current} </div>
              </Col>
              <Col span={8} offset={8}>
                <table>
                  <tr>
                    <th>Invoice # :</th>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>Invoice Date :</th>
                    <td>{CurrentDate}</td>
                  </tr>
                  <tr>
                    <th>Flight Date :</th>
                    <td>{product.flightDate}</td>
                  </tr>
                  <tr>
                    <th>Return Date :</th>
                    <td>{product.returndate}</td>
                  </tr>
                </table>
              </Col>
            </Row>

            <Row style={{ marginTop: 45 }}>
              <div>
                Bill To : <strong>{costumer.name}</strong>
              </div>
              <div>, Israel, {costumer.city} , </div>
              <div> {costumer.house} </div>
              <div>, {Zipcode.current} </div>
            </Row>

            <Row style={{ marginTop: 48, textAlign: "center" }}>
              <Table
                dataSource={[
                  {
                    id: 1,
                    name: product.id,
                    description: "Trip To " + product.name,
                    price: "$ " + product.price,
                    quantity: amount,
                    total: "$ " + amount * product.price,
                    status: "Paid",
                  },
                ]}
                pagination={false}
              >
                <Table.Column title="Flight-ID" dataIndex="name" />
                <Table.Column title="Description" dataIndex="description" />
                <Table.Column title="Quantity" dataIndex="quantity" />
                <Table.Column title="Price" dataIndex="price" />
                <Table.Column title="Total" dataIndex="total" />
                <Table.Column title="Status" dataIndex="status" />
              </Table>
            </Row>
            <Row style={{ marginTop: 48 }}>
              <Col span={8} offset={16}>
                <table>
                  <tr>
                    <th>Flight Company :</th>
                    <td>{product.flightcompany}</td>
                  </tr>
                  <tr>
                    <th>Gate :</th>
                    <td>{product.gate}</td>
                  </tr>
                  <tr>
                    <th>Time :</th>
                    <td>{product.time}</td>
                  </tr>
                  <tr>
                    <th>Nights :</th>
                    <td>{product.nights}</td>
                  </tr>
                </table>
              </Col>
            </Row>
          </div>
        </div>

        <div className="button">
          <button onClick={handlePrint}>Print/Save PDF</button>
        </div>
      </StyledSection>
    </>
  );
}
const StyledSection = styled.section`
  background-color: white;
  height: 120vh;
  width: 115vh;
  vertical-align: middle;
  .button {
    padding-top: 8.5rem;
    text-align: center;
  }
  .button button {
    padding: 10px 5px;
    display: inline-block;
    border-radius: 2rem;
    font-size: 15px;
    border: 1px solid #fdae5c;
    font-weight: 700;
    font-family: "Popping", sans-serif;
    letter-spacing: 1px;
    color: #fdae5c;
    background-color: #001d38;
    transition: 0.1s ease;
  }
  .button button:hover {
    box-shadow: 0 0 40px 40px #fdae5c inset;
    color: white;
  }
  img {
    vertical-align: middle;
  }
`;
