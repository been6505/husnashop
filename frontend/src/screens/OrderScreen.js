import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Dropdown,
} from "react-bootstrap";

/* PAYPAL BUTTONS */
import { PayPalButton } from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";

/* ACTION TYPES */
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
// import { Dropdown } from "@coreui/coreui";

function OrderScreen({ history, match }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // ITEMS PRICE GETS CALCULATED ONLY IF WE HAVE AN ORDER
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  // PAYPAL BUTTONS
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!userInfo) {
      history.push("/login");
    }

    // CHECK IF WE HAVE THE ORDER DETAILS, IF NOT DISPATCH AN ACTION TO GET THE ORDER DETAILS
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      // ACTIVATING PAYPAL SCRIPTS
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  /* HANDLERS */
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <div className="text-center  mt-3 p-2">
        <h1>Order : {order._id} </h1>
        {/* <h4>{order.User.name} </h4> */}
      </div>

      <Row className="m-2 p-2 justify-content-around">
        <Col md={8}>
          <Card
            className="my-3 p-2 text-center"
            style={{ boxShadow: "0 4px 8px 0" }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Items</h2>
                <hr />
                {order.orderItems.length === 0 ? (
                  <Message variant="info">Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3} className="text-center p-2 ">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col md={0} className="text-center py-2">
                            <Row>
                              <Link
                                to={`/product/${item.product}`}
                                style={{
                                  textDecoration: "none",
                                }}
                              >
                                <div className="my-2 p-2 fs-5 fw-bold">
                                  {item.name}
                                </div>
                                <div className="my-2 p-2 fs-5">
                                  {new Intl.NumberFormat("th-TH", {
                                    style: "currency",
                                    currency: "THB",
                                  }).format(item.price)}
                                </div>

                                <div>X {item.qty}</div>
                              </Link>
                            </Row>
                          </Col>

                          <Col md={3} className="text-center p-2">
                            <div className="my-2 p-2 fs-5">
                              {new Intl.NumberFormat("th-TH", {
                                style: "currency",
                                currency: "THB",
                              }).format((item.qty * item.price).toFixed(2))}
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>
                    <h2
                      className="m-2 py-2 fs-5 bg-success text-light"
                      style={{ borderRadius: "2rem" }}
                    >
                      Payment
                    </h2>
                  </Col>
                  <Col md={0}>
                    <div
                      className=" justify-content-center m-2 p-2 fs-7 bg-light "
                      style={{ borderRadius: "2rem" }}
                    >
                      <div className="mx-2 p-2 ">{order.paymentMethod}</div>

                      {order.isPaid ? (
                        <div
                          className="m-2 p-2 bg-success text-light"
                          style={{ borderRadius: "2rem" }}
                        >
                          Paid on
                          {order.paidAt ? (
                            <div>{order.paidAt.substring(0, 10)}</div>
                          ) : null}
                          {order.paidAt ? (
                            <div>
                              {new Date(order.paidAt).toLocaleTimeString()}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div
                          className="m-2 p-2 bg-warning "
                          style={{ borderRadius: "2rem" }}
                        >
                          Not Paid
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>
                    <h2
                      className="m-2 p-2 fs-5 bg-info text-light "
                      style={{ borderRadius: "2rem" }}
                    >
                      Address
                    </h2>
                  </Col>

                  <Col>
                    <div
                      className="justify-content-center mx-3 my-2 py-2  bg-light"
                      style={{ borderRadius: "2rem" }}
                    >
                      <div>
                        <p className="m-2 px-3  fw-bold ">
                          Name : {order.User.first_name} {order.User.last_name}
                        </p>

                        <p className="m-2 px-3 text-capitalize">
                          {order.shippingAddress.address}
                          <br />
                          Sup City : {order.shippingAddress.subCity}
                          <br />
                          City : {order.shippingAddress.city}
                          <br />
                          Provice : {order.shippingAddress.provice}
                          <br />
                          Postal Code : {order.shippingAddress.postalCode}
                          <br />
                          {order.shippingAddress.country}
                        </p>
                      </div>

                      {order.isDeliver ? (
                        <div
                          className=" m-2 p-2  bg-info text-light"
                          style={{ borderRadius: "2rem" }}
                        >
                          Delivered on
                          {order.deliveredAt ? (
                            <div>{order.deliveredAt.substring(0, 10)}</div>
                          ) : null}
                          {order.deliveredAt ? (
                            <div>
                              {new Date(order.deliveredAt).toLocaleTimeString()}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div
                          className=" m-2 p-2  h-50 bg-warning text-center"
                          style={{ borderRadius: "2rem" }}
                        >
                          Not Delivered
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row></Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col>
          <Card className="my-3 p-2" style={{ boxShadow: "0 4px 8px 0" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="mx-2   text-center">Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Sub total :</Col>

                  <Col>
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(order.itemsPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping :</Col>

                  <Col>
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(order.shippingPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <Row>
                  <Col>Vat (7%) :</Col>

                  <Col>
                    {" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(order.taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Row>
                  <Col>Total :</Col>

                  <Col>
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(order.totalPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Dropdown className="  my-3 text-center bg-aqua">
                        <Dropdown.Toggle
                          variant="success"
                          style={{ width: '100%' }}
                        >
                          <>Pay QR</>

                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <img src="/media/images/QR.png" />
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

            {loadingDeliver && <Loader />}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDeliver && (
                <ListGroup.Item style={{ border: "none" }}>
                  <Button
                    type="button"
                    className="btn  bg-danger w-100 my-3"
                    onClick={deliverHandler}
                    style={{ borderRadius: "2rem" }}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
