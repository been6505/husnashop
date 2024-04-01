import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Navbar, Nav } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Slider from "../components/Slider";
import SelectPrice from "../components/SelectPrice";
import SelectBrand from "../components/SelectBrand";
import SelectCategory from "../components/SelectCategory";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("default");
  const [selectedBrand, setSelectedBrand] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("default");

  const productList = useSelector((state) => state.productList);
  const { products, page, pages, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts(history.location.search));
  }, [dispatch, history.location.search]);

  const handlePriceChange = (priceOption) => {
    setSelectedPrice(priceOption);
  };

  const handleBrandChange = (brandOption) => {
    setSelectedBrand(brandOption);
  };

  const handleCategoryChange = (categoryOption) => {
    setSelectedCategory(categoryOption);
  };

  const filterProducts = () => {
    let filteredProducts = [...products];

    if (selectedPrice === "low to high") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "high to low") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (selectedCategory !== "default") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedBrand !== "default") {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    return filteredProducts;
  };

  const renderProducts = () => {
    if (products.length === 0) {
      return <Message variant="info">No products available.</Message>;
    }

    const filteredProducts = filterProducts();

    return filteredProducts.map((product) => (
      <Col key={product._id} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    ));
  };

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div>
      <Slider />

      <Container
        className="products bg-danger bg-opacity-25 "
        style={{ borderRadius: "2rem" }}
      >
        <Navbar expand="lg" className="d-flex py-2 px-2 ">
          <div className="">
            <SelectCategory
              categories={uniqueCategories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end px-2 py-2"
          >
            <Nav
              className="d-flex  bg-light px-4   text-center justify-content-center"
              style={{ borderRadius: "2rem" }}
            >
              <SelectPrice
                selectedPrice={selectedPrice}
                handlePriceChange={handlePriceChange}
                products={products}
              />
              <SelectBrand
                brands={uniqueBrands}
                selectedBrand={selectedBrand}
                handleBrandChange={handleBrandChange}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="m-2">
            {renderProducts()}
            {/* {products.map((product)=> 
              <Col key={product._id} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              )} */}
          </Row>
        )}

        <Container className="d-flex items-center justify-content-center">
          <Paginate
            page={page}
            pages={pages}
            keyword={history.location.search}
          />
        </Container>
      </Container>
    </div>
  );
}

export default HomeScreen;
