import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

/* REACT BOOTSTRAP */
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
  Badge,
} from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

function Cart() {
  // const [cartItemCount, setCartItemCount] = useState(0);

  // const fetchCartItemCount = () => {
  //     const fakeCartItemCount = 5;
  //     setCartItemCount(fakeCartItemCount);
  // };

  // useEffect(() => {
  //     fetchCartItemCount();
  // }, []);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="text-center  d-md-block  " style={{ borderRadius: "3rem" }}>
      <LinkContainer to="/cart">
        <Nav.Link>
          <Badge bg="danger" pill className="text-light bg-danger">
            <b className="fs-6">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</b>
          </Badge>

          <i
            className="mx-2 fas fa-shopping-cart fa-lg"
            style={{ position: "relative" }}
          ></i>
          {/* {cartItems.length > 0 && (
            <span
              className="badge bg-danger text-light"
              style={{
                borderRadius: "3rem",
                padding: "5px 5px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </span>
            
          )} */}
        </Nav.Link>
      </LinkContainer>
    </div>
  );
}

export default Cart;
