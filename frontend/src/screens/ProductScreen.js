import React, { useEffect, useState } from "react";

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

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Reviews from "../components/Reviews";

import { useDispatch, useSelector } from "react-redux";

import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";

import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
// import { addToCart } from './../actions/cartActions';

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  useEffect(() => {
    if (product && product.price) {
      const formattedPrice = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(product.price);

      setFormattedPrice(formattedPrice);
    }
  }, [product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <div className="m-2">
      <Link
        to="/"
        className="btn btn-light bg-light my-1 py-2"
        style={{ borderRadius: "2rem" }}
      >
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="p-2 m-2">
          <Container>
            <Row className="p-2 d-flex justify-content-center">
              <Col md={0} className="m-2 p-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  style={{
                    display: "block",
                    justifyContent: "center",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                />
              </Col>

              <Col md={4}>
                <Row>
                  <Col>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="text-center fs-3 fw-bold">
                        {product.name}
                      </ListGroup.Item>

                      <ListGroup.Item className="text-center">
                        <Rating
                          value={product.rating}
                          // text={`${product.numReviews} reviews`}
                          color={"#f8e825"}
                        />
                        {product.reviews && product.reviews.length > 0 && (
                          <div>{product.reviews.length} reviews</div>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card className="text-center align-middle my-3 p-2">
                      <ListGroup variant="flush">
                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>
                                <div className="my-2 p-1 fs-5">QUANTITY</div>
                              </Col>
                              <Col>
                                <div>
                                  <Form.Control
                                    className="my-2 p-1"
                                    as="select"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      border: "1px solid",
                                      borderColor: "#ff0000",
                                      borderRadius: "3rem",
                                    }}
                                  >
                                    {[
                                      ...Array(
                                        Math.min(10, product.countInStock)
                                      ).keys(),
                                    ].map((x) => (
                                      <option
                                        key={x + 1}
                                        value={x + 1}
                                        className="text-center fs-5"
                                      >
                                        {x + 1}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </div>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item className="">
                          <Row>
                            <Col>
                              <div className="my-2 p-2 fs-5">PRICE</div>
                            </Col>
                            <Col>
                              <div className="my-2 p-2 fs-5 ">
                                {formattedPrice}
                              </div>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock ? (
                          <ListGroup.Item>
                            <Button
                              className="w-100 fs-5 bg-danger"
                              disabled={product.countInStock === 0}
                              type="button"
                              onClick={addToCartHandler}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "5px",
                                borderRadius: "3rem",
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
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="my-2 p-2 ">
              <Col>
                <div className="w-bold"> Description</div>
                <p className="p-3">{product.description}</p>
              </Col>
            </Row>
            <hr />

            {/* <Reviews reviews={product.reviews} /> */}

            {product.reviews && product.reviews.length > 0 && (
              <div>
                <Reviews productId={product._id} reviews={product.reviews} />
              </div>
            )}
          </Container>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
