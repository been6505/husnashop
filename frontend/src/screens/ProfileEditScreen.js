import React, { useState, useEffect } from "react";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form, Table, Card } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getUserDetails,
  updateUserProfile,
  logout,
} from "../actions/userActions";

import { listMyOrders } from "../actions/orderActions";

/* ACTION TYPES */
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen({ history }) {
  /* STATE */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  /* WE NEED TO MAKE SURE USER IS LOGGED IN SO PULLING OUT USER LOGIN INFO */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  /* PULLING OUT SUCCESS FROM userUpdateProfile, IF SUCCESS IS TRUE WE WILL RESET STATE */
  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);

  const { success } = userUpdateProfle;

  useEffect(() => {
    // USER IS NOT LOGGED IN
    if (!userInfo) {
      history.push("/login");
    } else {
      // WE DON'T HAVE THE USER INFO SO WE DISPATCH AN ACTION TO GET THE DATA
      if (!user || !user.name || success || userInfo._id !== user._id) {
        /* (userInfo._id !== user._id) BECAUSE DURING USER EDIT STATE CHANGES SO WE WANT TO FIRE DISPATCH AGAIN HERE IF THE DATA ISN'T SAME AS THE USER AS WE ARE LOGGED IN  */
        // RESETTING PROFILE BEFORE FETCHING DATA SO THAT WE ALWAYS HAVE UPDATED DATA
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        // FETCHING USER DATA
        dispatch(getUserDetails("profile"));
      } else {
        // WE HAVE THE USER INFO SO WE SET OUR STATE
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}

      <Row className="justify-content-lg-center">
        <Col md={5}>
          <Card className="mt-3 p-3" style={{ borderRadius: "2rem" }}>
            <div className="text-center">
              <h3>User Profile</h3>
            </div>
            <Form onSubmit={submitHandler} className="p-3">
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex">
                <LinkContainer to={"/profile"} style={{ borderRadius: "2rem" }}>
                  <Button className="text-center m-3 w-100">back</Button>
                </LinkContainer>

                <Button
                  type="submit"
                  variant="primary"
                  className="bg-danger text-center m-3 w-100"
                  style={{ borderRadius: "2rem" }}
                >
                  Update
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileScreen;
