import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SelectPrice = ({ selectedPrice, handlePriceChange }) => {
  // const [price,setselectedPrice] =useState("")
  return (
    <div>
      <Dropdown className="px-2 mx-2 ">
        <Dropdown.Toggle variant="light">
          {selectedPrice === "default" ? "Price" : `${selectedPrice}`}
          <i class="mx-1 fa fa-list" aria-hidden="true"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="px-3  text-center  bg-light">
          <Dropdown.Item
            onClick={() => handlePriceChange("default")}
            active={selectedPrice === "default"}
          >
            Default
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlePriceChange("low to high")}
            active={selectedPrice === "price_low_to_high"}
          >
            Low to High
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlePriceChange("high to low")}
            active={selectedPrice === "price_high_to_low"}
          >
            High to Low
          </Dropdown.Item>
          {/* Add more Priceing options as needed */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectPrice;
