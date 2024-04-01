import React, { useState } from "react";

import { Button, Card, Form, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";

import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [subCity, setSubCity] = useState(shippingAddress.SubCity);
  const [city, setCity] = useState(shippingAddress.city);
  const [provice, setProvice] = useState(shippingAddress.provice);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        subCity,
        city,
        provice,
        postalCode,
        country,
      })
    );

    history.push("./payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1  />
      <Card className=" my-3 p-2" style={{ boxShadow: "0 4px 8px 0" }}>
        <h2 className="text-center"> Shipping</h2>
        <Form onSubmit={submitHandler} className=" p-3">
          <Row>
            <Col >
              <Form.Group controlId="address">
                <Form.Label className="mt-3">Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Address"
                  value={address ? address : ""}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="subCity">
                <Form.Label className="mt-3">Sub City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Sub City"
                  value={subCity ? subCity : ""}
                  onChange={(e) => setSubCity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="city">
                <Form.Label className="mt-3">City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="City"
                  value={city ? city : ""}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="provice">
                <Form.Label className="mt-3">Provice</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Provice"
                  value={provice ? provice : ""}
                  onChange={(e) => setProvice(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="postalCode">
                <Form.Label className="mt-3">Postal Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode ? postalCode : ""}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="country">
            <Form.Label className="m-2">Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Country"
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          
          <div className="text-center">
            {/* <Link to="/cart">
              <Button
                variant="dark"
                className="m-3"
                style={{ borderRadius: "2rem" }}
              >
                Go Back
              </Button>
            </Link> */}
            <Button
              className="my-3 py-2 w-100"
              type="submit"
              variant="primary"
              style={{ borderRadius: "2rem" }}
            >
              Continue
            </Button>
          </div>
        </Form>
      </Card>
    </FormContainer>
  );
}

export default ShippingScreen;
