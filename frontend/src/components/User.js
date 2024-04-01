import React from "react";

/* REACT BOOTSTRAP */
import { Nav, NavDropdown } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { logout } from "../actions/userActions";

import { clearCart, removeFromCart } from "../actions/cartActions";

function User() {
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());

    window.location.href = "/";
  };

  return (
    <div>
      {userInfo ? (
        <div>
          <NavDropdown
            id="username"
            className="text-center text-capital  mx-1"
            title={
              <i className="mx-2 ">
                {/* <i className="mx-2  fas fa-user fa-lg"> </i> */}
                {userInfo.name}
                
              </i>
            }
          >
            <LinkContainer className=" text-center " to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>

            {/* <LinkContainer className=" text-center " to="/user_profile">
              <NavDropdown.Item>My Profile</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer className=" text-center " to="/user_order">
              <NavDropdown.Item>My Order </NavDropdown.Item>
            </LinkContainer> */}

            {/* <LinkContainer className=" text-center " to="/shipping">
              <NavDropdown.Item>My Address</NavDropdown.Item>
            </LinkContainer> */}

            <NavDropdown.Item className=" text-center " onClick={logoutHandler}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      ) : (
        <div>
          <LinkContainer to="/login" className="px-3">
            <Nav.Link>
              <i className="mx-2 fas fa-user fa-lg"></i>
            </Nav.Link>
          </LinkContainer>
        </div>
      )}
    </div>
  );
}

export default User;
