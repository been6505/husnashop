import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Reviews({ productId, reviews }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  // useEffect(() => {
  //     if (successProductReview) {
  //         setRating(0);
  //         setComment("");
  //         dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  //     }

  //     dispatch(listProductDetails(match.params.id));
  // }, [dispatch, match.params.id, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <div>
      <Row className="m-3 p-3 ">
        <Col md="6">
          <Container>
            {/* <Card className="p-3"> */}
            <h4 className="m-3 ">Reviews</h4>

            {reviews.length === 0 && (
              <Message variant="info">No Reviews</Message>
            )}
            <ListGroup variant="flush" className="m-2 p-2">
              {reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <Card className="p-3">
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} color="gold" />

                    <p>{review.createdAt.substring(0, 10)}</p>

                    <p>{review.comment}</p>
                  </Card>
                </ListGroup.Item>
              ))}

              {loadingProductReview && <Loader />}
              {successProductReview && (
                <Message variant="success">Review Submitted</Message>
              )}
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}

              <ListGroup.Item  className="m-2 p-2">
                {userInfo ? (
                  <Card className="p-3">
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
                          rows="2"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        className="my-3 w-100"
                        style={{ borderRadius: "2rem" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Card>
                ) : (
                  <Message variant="info">
                    Please <Link to="/login">Login</Link> to write a review.
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
            {/* </Card> */}
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Reviews;
