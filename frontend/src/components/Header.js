import React from "react";

/* REACT BOOTSTRAP */
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

// import { ReactComponent as BrandIcon } from "./assets/brand-icon.svg";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { logout } from "../actions/userActions";

/* COMPONENTS */
import SearchBox from "./SearchBox";
import Admin from "./Admin";
import Cart from "./Cart";
import User from "./User";

import mlogo from "../m-logo.png";

function Header() {

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  return (
    <header>
      <Navbar
        variant="light"
        expand="lg"
        collapseOnSelect
        fixed="top"
        style={{
          backgroundColor: "red",
          maxHeight: "100px",
        }}
      >
        <Container className="justify-content-between">
          <Navbar.Brand>
            <a href="/" className="d-flex text-light text-decoration-none py-1 px-2">
              <img src={mlogo} alt="M&m" className="logo " />

              <h1 className="text-light p-2 my-1 fs-5">
                M&m
                <br />
                Productions
              </h1>
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse
            id="navbarScroll"
            className="col justify-content-end "
            style={{
              borderRadius: "2rem",
              backgroundColor: "red",
            }}
          >
            <Nav
              style={{
                marginRight: "1vh",
                marginLeft: "1vh",
                marginTop: "1vh",
                marginBottom: "1vh",
              }}
            >
              <SearchBox />
            </Nav>

            <Nav className="mx-2 ">
              <div
                className=" d-flex justify-content-center bg-light  "
                style={{
                  borderRadius: "2rem",
                  marginRight: "1vh",
                  marginLeft: "1vh",
                  marginTop: "2vh",
                  marginBottom: "2vh",
                }}
              >
                <Cart />
              </div>

              <div
                className=" d-flex justify-content-center  bg-light "
                style={{
                  borderRadius: "2rem",
                  marginRight: "1vh",
                  marginLeft: "1vh",
                  marginTop: "2vh",
                  marginBottom: "2vh",
                }}
              >
                <User />
              </div>
              {userInfo && userInfo.isAdmin && (
              <div
                className=" d-flex justify-content-center "
                style={{
                  borderRadius: "2rem",
                  marginRight: "1vh",
                  marginLeft: "1vh",
                  marginTop: "2vh",
                  marginBottom: "2vh",
                  backgroundColor: "white",
                }}
              >
                <Admin />
              </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
