import React from "react";

const SelectBrand = ({ brands, selectedBrand, handleBrandChange }) => {
  return (
    <div className="my-2 py-2 px-1 ">
      <div>
        {brands.map((brand) => (
          <div
            key={brand}
            onClick={() => handleBrandChange(brand)}
            active={selectedBrand === brand}
          >
            <p className="fs-6">{brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBrand;
