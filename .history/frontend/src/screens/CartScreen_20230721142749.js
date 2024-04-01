import React, { useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
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

/* COMPONENTS */
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  /* GETTING DATA FROM URL IF PRESENT */
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //qty: '?qty=3' -> ['?qty',3] -> 3

  /* FIRING OFF DISPATCH, BUT ONLY IF WE HAVE A PRODUCT ID & QUANTITY */
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /* HANDLERS */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Container>
      <Row>
        <Col md={0}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty. <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="text-center">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Link to={`/product/${item.product}`}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Link>
                    </Col>

                    <Col m={2}>
                      <Link to={`/product/${item.product}`}>
                        <h4>{item.name}</h4>
                      </Link>
                    </Col>

                    <Col md={2}>
                      <h4> ฿ {item.price}</h4>
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
                        className="mt-2 text-center"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        className="my-2"
                        variant="danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash fa-"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={0}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                ฿
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartScreen;
