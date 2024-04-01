import React from "react";
import { Alert, Row, Col } from "react-bootstrap";

function Error({ variant, children }) {
  return (
    <>
      <Alert variant={variant}>{children}</Alert>

      <Row>
        <Col>
          <div variant={variant} className="text-center m-3 p-3">
            <img
              src="https://www.pngkey.com/png/detail/52-520194_error-404-page-was-not-found-news-http.png"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Error;
