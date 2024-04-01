import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";

import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <div className=" d-md-block px-2 ">
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="q"
          placeholder="search"
          onChange={(e) => setKeyword(e.target.value)}
          className=" bg-light"
          style={{  borderRadius: "20rem" }}
        ></Form.Control>

        <Button
          type="submit"
          variant="outline-danger"
          className="btn btn-light  button-focus-css "
          style={{ borderRadius: "3rem" }}
        >
          <i className="fas fa-search"></i>
        </Button>
      </Form>
    </div>
  );
}

export default SearchBox;
