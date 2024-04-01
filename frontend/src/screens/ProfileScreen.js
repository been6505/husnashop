import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Button,
  Form,
  Table,
  Card,
  ListGroup,
  Tab,
  Nav,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { useDispatch, useSelector } from "react-redux";

import {
  getUserDetails,
  updateUserProfile,
  logout,
} from "../actions/userActions";

import { listMyOrders } from "../actions/orderActions";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);

  const { success } = userUpdateProfle;

  /* PULLING OUT USER ORDER DETAILS TO DISPLAY ON THE PAGE */
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  /* SENDING USER TO LOGIN PAGE IF NOT LOGGED IN & SHOW PROFILE DATA IF LOGGED IN */
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

        // FETCHING USER ORDER DETAILS
        dispatch(listMyOrders());
      } else {
        // WE HAVE THE USER INFO SO WE SET OUR STATE
        setName(user.name);
        setFirstName(user.first_name)
        setLastName(user.last_name)
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
          // name: name,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        })
      );
      setMessage("Not Update");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());

    window.location.href = "/";
  };

  return (
    <Row className=" mt-3 p-3 " style={{ borderRadius: "2rem" }}>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Col>
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="user_profile"
        >
          <Row>
            <Col md={3}>
              <h2>{userInfo.name}</h2>
              <hr />

              <ListGroup>
                <ListGroup.Item
                  action
                  eventKey="user_profile"
                  className="my-1"
                  style={{ borderRadius: "2rem" }}
                >
                  Profile
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  eventKey="user_order"
                  className="my-1 "
                  style={{ borderRadius: "2rem" }}
                >
                  My Order
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={logoutHandler}
                  className="my-1 "
                  style={{ borderRadius: "2rem" }}
                >
                  Logout
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Tab.Content className="justify-content-center m-3">
                <Tab.Pane eventKey="user_profile">
                  <Col className="m-3 ">
                    <h3 className="text-center">User Profile</h3>

                    <Card className=" my-3 p-1 ">
                      <Form onSubmit={submitHandler}>
                        {/* <Form.Group as={Row} className="m-3">
                          <Form.Label column sm="3">
                            User Name
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              type="name"
                              placeholder="Enter Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Col>
                        </Form.Group> */}

                        <Form.Group as={Row} className="m-3">
                          <Form.Label column sm="3">
                            First Name
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              type="first_name"
                              placeholder="Enter First Name"
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="m-3">
                          <Form.Label column sm="3">
                            Last Name
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              type="last_name"
                              placeholder="Enter Last Name"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="m-3">
                          <Form.Label column sm="3">
                            Email
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              type="email"
                              placeholder="Enter Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        {/* <Form.Group
                          as={Row}
                          className="m-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Password
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="password"
                              placeholder="Password"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="m-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Confirm Password
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="password"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </Col>
                        </Form.Group> */}

                        {/* <Button
                          type="submit"
                          variant="primary"
                          className="bg-danger m-3 "
                          style={{ borderRadius: "2rem" }}
                        >
                          Update
                        </Button> */}

                        {/*<LinkContainer
                        to={`/editProfile`}
                        style={{ borderRadius: "2rem" }}
                      >
                        <Button className="bg-danger btn ">
                          Edit Profile
                        </Button>
                      </LinkContainer> */}
                      </Form>
                    </Card>
                  </Col>
                </Tab.Pane>

                <Tab.Pane eventKey="user_order">
                  <Col className="mt-3 ">
                    <h3 className="text-center">My Orders</h3>
                    <Card className=" my-3 p-1 ">
                      {loadingOrders ? (
                        <Loader />
                      ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                      ) : (
                        <Table
                          striped
                          responsive
                          className="table-sm text-center"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Total</th>
                              <th>Paid</th>
                              <th>Delivered</th>
                            </tr>
                          </thead>

                          <tbody>
                            {orders.map((order) => (
                              <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                  {order.createdAt
                                    ? order.createdAt.substring(0, 10)
                                    : null}
                                </td>
                                <td>฿ {order.totalPrice}</td>
                                <td>
                                  {order.isPaid ? (
                                    order.paidAt ? (
                                      order.paidAt.substring(0, 10)
                                    ) : null
                                  ) : (
                                    <i
                                      className="fas fa-times"
                                      style={{ color: "red" }}
                                    ></i>
                                  )}
                                </td>
                                <td>
                                  <LinkContainer to={`/order/${order._id}`}>
                                    <Button className="btn-sm">Details</Button>
                                  </LinkContainer>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Card>
                  </Col>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>

      <br />
    </Row>
  );
}

export default ProfileScreen;
