import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import Rating from "./Rating";

import "./Product.css";

function Product({ product }) {
  return (
    <div>
      <Card className=" my-3 p-2">
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} className="img py-3 px-5" />
        </Link>

        <Card.Body>
          <Link
            className="link my-3 text-decoration-none"
            to={`/product/${product._id}`}
          >
            <Card.Title as="div">
              <div id="name" className="text-center fs-5 fw-bold">
                {product.name}
              </div>
            </Card.Title>
          </Link>

          <Card.Text as="div" className="text-center">
            <Rating
              value={product.rating}
              // text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </Card.Text>

          <Card.Text id="price" className="mt-2 text-center fs-5 fw-bold">
            <div>
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(product.price)}
            </div>
          </Card.Text>

          <Card.Text
            id="price"
            className="mt-2 text-center fs-6 fw-bold text-decoration-line-through"
          >
            <div>
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(product.default_price)}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
