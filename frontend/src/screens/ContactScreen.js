import React from "react";
import { Row, Col } from "react-bootstrap";
import mlogo from "../m3-logo.png";

function Contact() {
  return (
    <div className="my-5  justify-content-center">
      <p className="my-2 p-2 fs-1 text-center fw-bold">About Us</p>
      <Row className=" m-2 p-2">
        <Col className="text-center m-2 p-2">
          <p>
            <img src={mlogo} alt="M&m" className="w-50 " />
          </p>
        </Col>
        <Col md={6} className="my-3 p-2">
          <p>
            <a icon="home" className="me-2 fas fa-map-marker" />
            Bangkok, BK 10240, TH
          </p>
          <p>
            <a icon="envelope" className="me-2 fas fa-comments" />
            m_productions@gmail.com
          </p>
          <p>
            <a icon="phone" className="me-2 fas fa-phone-alt" />
            Tel : 080 000 0000
          </p>
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d543.7643402895178!2d100.65619333489866!3d13.747999358925659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1694700286699!5m2!1sth!2sth"
            width="100%"
            height="400"
            style={{ borderRadius: "2rem" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
