import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { listProducts } from "../actions/productActions";
import SelectBrandList from "../components/SelectBrandList";
import SelectCategoryList from "../components/SelectCategoryList";

function Footer({ productCategories }) {
  const [product, setProduct] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("default");
  const productList = useSelector((state) => state.productList);
  const [selectedCategory, setSelectedCategory] = useState("default");
  const { products, page, pages, loading, error } = productList;

  const handleBrandChange = (brandOption) => {
    setSelectedBrand(brandOption);
  };
  const handleCategoryChange = (categoryOption) => {
    setSelectedCategory(categoryOption);
  };

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <footer>
      <div bgColor="light" className="text-center text-lg-start text-muted">
        <section className="d-flex justify-content-between p-4 border-bottom">
          <div className="m-auto ">
            <a
              href="https://www.facebook.com/moomtas"
              className="mx-3 text-reset"
            >
              <FaFacebook size={"1.5rem"} className="mr-3 ml-3 text-center" />
            </a>

            <a
              href="https://www.instragram.com/moomtasah"
              className="mx-3 text-reset"
            >
              <FaInstagram size={"1.5rem"} className="mr-3 ml-3 text-center" />
            </a>

            {/* <a href="line.me" className="me-4 text-reset">

            </a> */}
          </div>
        </section>

        <section className="">
          <Container className="text-center text-md-start mt-5">
            <Row className="mt-3">
              <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase  fw-bold mt-4 ">
                  
                  <a href="/"  className="m-3 "> M&m Productions</a>
                 
                </h6>
                <p className="m-3">เพื่อประสบการณ์ที่ดีของคุณ</p>
              </Col>

              <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mt-4 ">Products</h6>

                <SelectCategoryList
                  categories={uniqueCategories}
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                />
              </Col>

              <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mt-4">Brand</h6>
                <SelectBrandList
                  brands={uniqueBrands}
                  selectedBrand={selectedBrand}
                  handleBrandChange={handleBrandChange}
                />
              </Col>

              <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 fs-6">
                <h6 className=" text-uppercase fw-bold mt-4 ">
                  <Link to="/contact" >
                    Contact
                  </Link>
                </h6>

                <p>
                  <a icon="home" />
                  M&m Productions
                </p>
                <p>
                  <a icon="home"  />
                  Bangkok, BK 10240, TH
                </p>
                <p>
                  <a icon="envelope"  />
                  m_productions@gmail.com
                </p>
                <p>
                  <a icon="phone"  /> 080 000 0000
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="text-center p-4 fs-6">
          © 2023 Copyright : 
          <a
            className="text-reset fw-bold "
            href="/"
            style={{ textDecoration: "none" }}
          >
            M&m Productions
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
