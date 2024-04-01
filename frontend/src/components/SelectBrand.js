import React from "react";
import { Dropdown } from "react-bootstrap";

const SelectBrand = ({ brands, selectedBrand, handleBrandChange }) => {
  return (
    <div className="">
      <Dropdown>
        <Dropdown.Toggle variant="light">
          {selectedBrand === "default" ? "Brand" : `${selectedBrand}`}
          <i className="mx-1 fa fa-list" aria-hidden="true"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="px-3 text-center  ">
          <Dropdown.Item
            onClick={() => handleBrandChange("default")}
            active={selectedBrand === "default"}
          >
            Show All
          </Dropdown.Item>

          {brands.map((brand) => (
            <Dropdown.Item
              key={brand}
              onClick={() => handleBrandChange(brand)}
              active={selectedBrand === brand}
            >
              {brand}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectBrand;
