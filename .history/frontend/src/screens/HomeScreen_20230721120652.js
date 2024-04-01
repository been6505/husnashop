import React, { useEffect } from "react";

/* REACT-BOOTSTRAP */
import { Row, Col, Container } from "react-bootstrap";

/* COMPONENTS */
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Slider from "../components/Slider";
import SliderOne from "../components/SliderOne";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, loading, error } = productList;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  let keyword =
    history.location
      .search; /* IF USER SEARCHES FOR ANYTHING THEN THIS KEYWORD CHANGES AND USE EFFECT GETS TRIGGERED */

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {/* {!keyword && <ProductCarousel />} */}
      <Slider />
      {/* <SliderOne/> */}
      <h1 className="text-center">Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div style={{backgroundColor:"red"}}>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>

          <Container>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </Container>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
