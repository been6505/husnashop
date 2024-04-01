import React from "react";
import { Nav, Row, div, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./CheckoutSteps.css"; 

function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <Nav>
      <div className="step " >
        {/* Step 1 */}

        {/* <Nav.Item className="item ">
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link>
                <div className="step-indicator completed">1</div>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <div className="step-indicator">1</div>
            </Nav.Link>
          )}
        </Nav.Item> */}

        {/* Step 2 */}

        <Nav.Item className="steped ">
          {step1 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>
                <div className="step-indicator completed text-light">1</div>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <div className="step-indicator">1</div>
            </Nav.Link>
          )}
        </Nav.Item>

        {/* Step 3 */}

        <Nav.Item className="steped ">
          {step2 ? (
            <LinkContainer to="/payment">
              <Nav.Link>
                <div className="step-indicator completed text-light">2</div>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <div className="step-indicator">2</div>
            </Nav.Link>
          )}
        </Nav.Item>

        {/* Step 4 */}

        <Nav.Item className="steped ">
          {step3 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>
                <div className="step-indicator completed text-light">3</div>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <div className="step-indicator">3</div>
            </Nav.Link>
          )}
        </Nav.Item>
      </div>
    </Nav>
  );
}

export default CheckoutSteps;
