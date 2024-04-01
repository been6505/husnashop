import React from "react";

import { Pagination } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

function Paginate({ page, pages, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  /* 
  console.log("KEYWORD", keyword);
  output: ?keyword=iPhone&page=1 => iPhone&page=1 => iPhone
  */

  return (
    pages > 1 && (
      <Pagination
        id="paginate"
        className="px-4 m-3 bg-light"
        style={{ borderRadius: "2rem" }}
      >
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist//?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page} className="m-1">
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
