import React, { useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

/* COMPONENTS */
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { createOrder } from "../actions/orderActions";

/* ACTION TYPES */
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderCrate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCrate;

  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS, WE ARE SETTING AN ATTRIBUTE TO OUR CART OBJECT BUT IT WON'T UPDATE OUR STATE, IT'S JUST FOR THIS PAGE
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100000 ? 100 : 300).toFixed(2);

  cart.taxPrice = Number(0.07 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))
    // + Number(cart.taxPrice)
    .toFixed(2);

  // REDIRECT
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  /* IF ORDER SUCCESSFULL AND WE HAVE ORDER ID, SEND USER TO USERS ACCOUNT TO VIEW THE ORDER */
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);

      // RESET STATE
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
    // eslint-disable-next-line
  }, [success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Row className="m-2 p-2  justify-content-around">
        <Col md={8}>
          <Card
            className="my-3 p-2 text-center"
            style={{ boxShadow: "0 4px 8px 0" }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Items</h2>
                <hr />
                {cart.cartItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
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
                            <div className=" my-2 p-2 fs-5">
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

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={3}>
                      <Link to="/payment" style={{ textDecoration: "none" }}>
                        <h2
                          className="m-2 p-2 fs-5 bg-success text-light"
                          style={{ borderRadius: "2rem" }}
                        >
                          Payment
                        </h2>
                      </Link>
                    </Col>
                    <Col>
                      <div
                        className="m-2 p-2 fs-7 bg-light "
                        style={{ borderRadius: "2rem" }}
                      >
                        {cart.paymentMethod}
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={3}>
                      <Link to="/shipping" style={{ textDecoration: "none" }}>
                        <h2
                          className="m-2 p-2 fs-5 bg-info text-light "
                          style={{ borderRadius: "2rem" }}
                        >
                          Address
                        </h2>
                      </Link>
                    </Col>
                    <Col>
                      <div
                        className="mx-3 my-2 py-2 fs-7 bg-light"
                        style={{ borderRadius: "2rem" }}
                      >
                        <p className="m-2 px-3 fs-7 text-start text-capitalize">
                          {cart.shippingAddress.address}
                          <br />
                          Sup City : {cart.shippingAddress.subCity}
                          <br />
                          City : {cart.shippingAddress.city}
                          <br />
                          Provice : {cart.shippingAddress.provice}
                          <br />
                          Postal Code : {cart.shippingAddress.postalCode}
                          <br />
                          {cart.shippingAddress.country}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
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

                  <Col className="text-end">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(cart.itemsPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className="text-start">Shipping :</Col>

                  <Col className="text-end">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(cart.shippingPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* 
              <ListGroup.Item>
                <Row>
                  <Col>Vat (7%) :</Col>

                  <Col className="text-end">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(cart.taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Row>
                  <Col className="text-start">Total :</Col>

                  <Col className="text-end">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(cart.totalPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <div>{error && <Message variant="danger">{error}</Message>}</div>
            </ListGroup>
            <Button
              type="button"
              className="m-2 "
              disabled={cart.cartItems === 0}
              onClick={placeOrder}
              style={{ borderRadius: "2rem" }}
            >
              Confirm Order
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
