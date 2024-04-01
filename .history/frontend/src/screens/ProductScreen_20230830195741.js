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
import Reviews from "../components/Reviews";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
// import { addToCart } from './../actions/cartActions';

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
    // const login = history.push('/login?')

    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  // /cart/${match.params.id}?qty=${qty}
  // /login?redirect=shipping

  /* HANDLERS */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <div className="m-3">
      <Link to="/" className="btn btn-light bg-light my-3" style={{ borderRadius: '2rem' }}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="p-2 m-3">

          <Container>
            <Row className=" d-flex justify-content-center">
              <Col md={0} className="p-3">
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

                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <p className="fs-3">{product.name}</p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        // text={`${product.numReviews} reviews`}
                        color={"#f8e825"}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <p> Description: {product.description}</p>
                    </ListGroup.Item>
                  </ListGroup>

                </Row>



                <Row>

                  <Card className="text-center my-3 p-3">

                    <ListGroup variant="flush">
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <p className="p-1 fs-5">QUANTITY</p>
                            </Col>
                            <Col>
                              {/* <span>QUANTITY</span> */}
                              <span>
                                <Form.Control
                                  className="p-1"
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
                                      Math.min(5, product.countInStock)
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
                              </span>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item cls>
                        <Row>
                          <Col>
                            <p className="p-1 fs-5">PRICE</p>
                          </Col>
                          <Col>
                            <span
                              className="p-1"
                              style={{
                                display: "flex",
                                justifyContent: "center",

                              }}
                            >
                              <p className="fs-5">฿{product.price}</p>
                            </span>
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

                </Row>
              </Col>
            </Row>


            <Row >
              <Col>
                <p className="text-center m-3 p-3">


                  Description: {product.description}

                </p>
              </Col>
            </Row>
            <hr />

            {/* <Reviews reviews={product.reviews}/> */}

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
