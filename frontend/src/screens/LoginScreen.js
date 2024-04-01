import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form, Card } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
  /* STATE */
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR LOGIN */
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Card className="mt-5 p-3 bg-light ">
        <h1 className="text-center">Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label className="mt-3">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="mt-3">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          {/* <Link to={'/web/login/item/${item.id}'}> */}
          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100"
            style={{ borderRadius: "2rem" }}
          >
            Sign In
          </Button>
          {/* </Link> */}

        </Form>

        <Link
          className="text-decoration-none text-end m-2 fs-6"
          to="/forgot-password"
        >
            Forgot Password ?
        
        </Link>

        <hr />
        <Row className="p-3 text-center ">
          <b>New Customer ?</b>

          <Link
            className="text-decoration-none text-white"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            <Button
              type="btn"
              variant="danger"
              className="mt-3  text-white"
              style={{ borderRadius: "2rem" }}
            >
              Register
            </Button>
          </Link>
        </Row>
      </Card>
    </FormContainer>
  );
}

export default LoginScreen;
