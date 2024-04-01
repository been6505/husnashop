import React from "react";
import { ListGroup } from "react-bootstrap";

const SelectCategoryList = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div>
      <div className="my-2 py-2 px-1 ">
        <div>
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategoryChange(category)}
              active={selectedCategory === category}
            >
              <p className="fs-6">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryList;
