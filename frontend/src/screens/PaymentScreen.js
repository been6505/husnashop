import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form, Col, Card } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  // STATE
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentMethodQr, setPaymentMethodQr] = useState("PayPal");

  /* IF NO SHIPPING ADDRESS THEN REDIRECT TO ShippingAddress SCREEN */
  if (!shippingAddress.address) {
    history.push("./shipping");
  }

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod, paymentMethodQr));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2  />
      <Card className="items-center my-3 p-2" style={{ boxShadow: "0 4px 8px 0" }}>
        <h3 className="m-2   text-center">Payment</h3>
        <hr />
        <Form onSubmit={submitHandler} className=" p-3 fs-4">
          <Form.Group>
            <Form.Label as="legend" >
              Select Method
            </Form.Label>

            <Col >
              <Form.Check
                className="mt-3 fs-5"
                type="radio"
                label="PayPal or Credit Card"
                id="paypal"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          
            <Button
              type="submit"
              variant="primary"
              className="my-3 p-2  w-100"
              style={{ borderRadius: "2rem" }}
            >
              Continue
            </Button>
          
        </Form>
      </Card>
    </FormContainer>
  );
}

export default PaymentScreen;
