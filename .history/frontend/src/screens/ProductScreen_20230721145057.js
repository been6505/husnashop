import React, { useEffect, useState } from "react";

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
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { addToCart } from './../actions/cartActions';

function ProductScreen({ match, history }) {
  /* STATE */
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProdcutReview,
  } = productReviewCreate;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  useEffect(() => {
    // IF REVIEW SUCCESSFULLY SUBMITTED, RESET
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  /* HANDLERS */
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Container>
            <Row className=" d-flex justify-content-center">
              <Col md={6} >
                <Image src={product.image} alt={product.name} fluid style={{ width: "100%" }} />
              </Col>

              <Col md={6}>
                <Row>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color={"#f8e825"}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>

                  </ListGroup>
                </Row>

                <br />

                <Row>
                  <Card>
                    <Container>
                      <ListGroup variant="flush">
                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>
                                <span>QTY</span>
                                <span><Form.Control
                                  as="select"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}
                                        className="text-center">
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control></span>
                              </Col>
                              {/* <Col>Qty</Col>
                              <Col xs="auto" className="mx-2">
                              </Col> */}
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  border: "1px solid",
                                  borderColor: "#C6ACE7",
                                  padding: "2px",
                                  fontSize: "1.25rem",
                                  borderRadius: "3rem",
                                }}
                              >
                                Price:
                                <span className="text-success ml-2">฿ {product.price}</span>
                              </span>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock ? (
                          <ListGroup.Item>
                            <Button
                              className="w-100"
                              disabled={product.countInStock === 0}
                              type="button"
                              onClick={addToCartHandler}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "5px",
                                fontSize: "1.25rem",
                                borderRadius: "3rem"
                              }}
                            >
                              Add to Cart
                            </Button>
                          </ListGroup.Item>
                        ) : (
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "5px",
                              fontSize: "1.5rem",
                              borderRadius: "3rem",
                            }}
                          >
                            Out Of Stock!
                          </span>
                        )}
                      </ListGroup>
                    </Container>
                  </Card>
                </Row>
              </Col>
            </Row>

            <br />

            <Row>
              <Col >
                <Card>
                  <Container>
                    <h4 className="m-3">Reviews</h4>
                    {/* {product.reviews.length === 0 && (
                      <Message variant="info">No Reviews</Message>
                    )} */}
                    <ListGroup variant="flush">
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>

                          <Rating value={review.rating} color="f8e825" />

                          <p>{review.createdAt.substring(0, 10)}</p>

                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      
                      <ListGroup.Item>
                        <h4>Write a Review</h4>

                        {loadingProductReview && <Loader />}
                        {successProductReview && (
                          <Message variant="success">Review Submitted</Message>
                        )}
                        {errorProdcutReview && (
                          <Message variant="danger">{errorProdcutReview}</Message>
                        )}

                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating">
                              <Form.Label>Rating</Form.Label>

                              <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="comment">
                              <Form.Label>Review</Form.Label>

                              <Form.Control
                                as="textarea"
                                row="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </Form.Group>

                            <Button
                              disabled={loadingProductReview}
                              type="submit"
                              variant="primary"
                              className="my-3"
                              style={{ borderRadius: "2rem" }}
                            >
                              Submit
                            </Button>
                          </Form>
                        ) : (
                          <Message variant="info">
                            Please <Link to="/login">Login</Link> to write a review.
                          </Message>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Container>


                </Card>

              </Col>
            </Row>
          </Container>

        </div>
      )}
    </div>
  );
}

export default ProductScreen;
