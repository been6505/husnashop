import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Row, Col, Button, Form, Card } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  // const [username, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR REGISTER */
      // dispatch(register(username, email, password));
      dispatch(register(first_name, last_name, email, password));
    }
  };

  return (
    <FormContainer>
      <Card className="mt-5 p-3 bg-light ">
        <h1 className="text-center">Register</h1>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="first_name"
              placeholder="Enter First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="Last_name"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100"
            style={{ borderRadius: "2rem" }}
          >
            Register
          </Button>
        </Form>
        <hr />
        <Row className="p-3 text-center ">
          <b> Have an Account ?</b>
          <Col>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              <Button
                type="btn"
                variant="danger"
                className="mt-3  text-white"
                style={{ borderRadius: "2rem" }}
              >
                Sign In
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  );
}

export default RegisterScreen;
