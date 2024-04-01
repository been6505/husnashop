import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

import "./Slider.css";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getNavigationBullets = () => {
    return [0, 1, 2, 3, 4, 5].map((slideIndex) => (
      <li
        key={slideIndex}
        className={index === slideIndex ? "active" : ""}
        onClick={() => handleSelect(slideIndex)}
      ></li>
    ));
  };

  const carouselOptions = {
    interval: 5000,
    pauseOnHover: true,
    transitionDuration: 500,
  };

  const style = {
    img: {
      width: "100%",

      objectFit: "fill",
    },
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <Carousel
          fade
          activeIndex={index}
          onSelect={handleSelect}
          {...carouselOptions}
        >
          <Carousel.Item>
            <img
              className="slider-image w-100"
              src="../static/image/banner/canon-R3.png"
              alt="1"
              // style={style.img}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="../static/image/banner/fuji-SF.png"
              alt="2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="../static/image/banner/leica-s.png"
              alt="3"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="../static/image/banner/lumix-GH6.png"
              alt="4"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="../static/image/banner/nikon.png"
              alt="5"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="slider-image"
              src="../static/image/banner/sony-alpha.png"
              alt="6"
            />
          </Carousel.Item>
        </Carousel>

        <div className="slider-navigation-bullets d-flex justify-content-center">
          {getNavigationBullets()}
        </div>
      </div>
    </div>
  );
}

export default Slider;
