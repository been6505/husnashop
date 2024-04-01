import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { applyCoupon } from "../actions/couponActions";
import Message from "../components/Message";

function CartScreen({ match, location, history }) {
  // const [formattedPrice, setFormattedPrice] = useState("");
  const [coupon, setCoupon] = useState("");
  const productId = match.params.id;
  const qtyParamValue = location.search
    ? Number(location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qtyParamValue));
    }
  }, [dispatch, productId, qtyParamValue]);

  useEffect(() => {
    if (coupon) {
      dispatch(applyCoupon(coupon));
    }
  }, [dispatch, coupon]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  // const coupon = useSelector((state) => state.coupon);

  const applyCouponHandler = () => {
    const couponCode = document.getElementById("coupon-input").value;
    setCoupon(couponCode);
  };

  return (
    <div className="text-center my-5">
      <h1 className="fs-1 my-3">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message variant="warning">
          <div>
            <img
              className="slider-image p-5"
              src="../static/image/other/empty-shopping.png"
              alt="1"
              style={{ width: "30%" }}
            />
            <div className="m-2">Your cart is empty</div>
            <div class="icons8-clear-shopping-cart"></div>
          </div>
          <div
            className="btn bt bg-light mt-3"
            style={{ borderRadius: "2rem" }}
          >
            <Link to="/">Go Back</Link>
          </div>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <Card className=" p-3 my-2">
              <h2 className="m-2   text-center">Cart items </h2>
              {/* <Row className="m-2">
                <Col md="6">Product</Col>

                <Col>Quantity</Col>
                <Col>Price</Col>
              </Row> */}
              {cartItems.map((item) => (
                <ListGroup variant="flush">
                  <ListGroup.Item key={item.product}>
                    <Row className="justify-content-center">
                      <Row>
                        <Col md="3" className="my-2">
                          <Link to={`/product/${item.product}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Link>
                        </Col>

                        <Col md={4}>
                          <Link
                            to={`/product/${item.product}`}
                            className="text-decoration-none"
                          >
                            <div className="my-3  fs-5 fw-bold">
                              {item.name}
                            </div>
                            <div className="my-2 p-2 fs-5">
                              {new Intl.NumberFormat("th-TH", {
                                style: "currency",
                                currency: "THB",
                              }).format(item.price)}
                            </div>
                          </Link>
                        </Col>

                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                            className="my-3  fs-6 text-center "
                            style={{ borderRadius: "2rem" }}
                          >
                            {[
                              ...Array(Math.min(5, item.countInStock)).keys(),
                            ].map((x) => (
                              <option
                                key={x + 1}
                                value={x + 1}
                                className="text-center "
                              >
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={3}>
                          <div className="my-3 p-2 fs-5">
                            {new Intl.NumberFormat("th-TH", {
                              style: "currency",
                              currency: "THB",
                            }).format((item.qty * item.price).toFixed(2))}
                          </div>
                        </Col>
                        <div className="text-end">
                          <Button
                            type="button"
                            className="btn  py-1 mb-2 "
                            variant="danger"
                            onClick={() => removeFromCartHandler(item.product)}
                            style={{ borderRadius: "2rem" }}
                          >
                            <i className="fas fa-trash fa-sm"></i>
                          </Button>
                        </div>
                      </Row>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Card>
          </Col>
          <Col>
            <Card className="m-2 p-3">
              {" "}
              <h2 className="m-2   text-center">Summary</h2>
              <ListGroup variant="flush">
                

                {/* Coupon */}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Form onSubmit={applyCouponHandler} className="d-flex ">
                        <Form.Control
                          type="coupon"
                          placeholder="Coupon Code"
                          className=" p-2"
                          id="coupon-input"
                        />

                        <Button
                          type="submit"
                          variant="dark"
                          className="p-2 btn  "
                        >
                          Apply
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Product :</Col>
                    <Col className="text-end">
                      ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      Items
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Sub total :</Col>
                    <Col className="text-end">
                      {new Intl.NumberFormat("th-TH", {
                        style: "currency",
                        currency: "THB",
                      }).format(
                        cartItems.reduce(
                          (acc, item) => acc + item.qty * item.price,
                          0
                        )
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className=" w-100 my-2 p-2"
                    onClick={checkoutHandler}
                    style={{ borderRadius: "2rem" }}
                  >
                    Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
      {/* <Row className="justify-content-center"> */}
      {/* <Col md={3}>
          <Card className="m-2 p-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 className="fs-2">Coupon</h3>

                <Form>
                  <Form.Group>
                    <Col>
                      <Form.Control
                        type="coupon"
                        placeholder="Coupon Code"
                        className="my-2 p-2"
                        id="coupon-input"
                      />
                    </Col>
                  </Form.Group>
                </Form>
                <div className="fs-5 text-start my-2 p-2">
                  Discount : {coupon.discount_percentage}
                </div>

                <Button
                  type="button"
                  className="bg-danger w-100 my-2 p-2"
                  disabled={cartItems.length === 0}
                  onClick={applyCouponHandler}
                  style={{ borderRadius: "2rem" }}
                >
                  Apply Code
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col> */}
    </div>
  );
}

export default CartScreen;
