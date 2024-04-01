import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { forgotPassword } from "../actions/userActions"; // You'll need to create this action

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, success } = userForgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <FormContainer>
      <Card className="m-3 p-3 bg-light">
        <h1 className="text-center">Forgot Password</h1>
        
        {error && <Message variant="danger">{error}</Message>}
        {/* {success && (
          <Message variant="success">
            Password reset link sent to your email.
          </Message>
        )} */}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100"
            style={{ borderRadius: "2rem" }}
          >
            Request Reset
          </Button>
        </Form>
        <hr />
        <Link to="/login" className="text-decoration-none">
          Back to Login
        </Link>
      </Card>
    </FormContainer>
  );
}

export default ForgotPasswordScreen;
