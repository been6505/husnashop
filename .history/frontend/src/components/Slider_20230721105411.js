import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselOptions = {
    interval: 5000,
    pauseOnHover: true,
    transitionDuration: 500,
  };

  const getNavigationBullets = () => {
    return [0, 1, 2].map((slideIndex) => (
      <li
        key={slideIndex}
        className={index === slideIndex ? "active" : ""}
        onClick={() => handleSelect(slideIndex)}
      ></li>
    ));
  };

  const styleSlider = {
    width: "100",
    height:"100",
    // objectFit: "cover",
    // minWidth: "100%",
  };

  return (
    <>
    
    </>
     );
}

export default Slider;
