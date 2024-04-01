import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
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
      // width: 200px;
      // height: 300px;
      objectFit: "contain",
    },
  };

  return (
    <div className="slider-container">
      {/* <div > */}
      {/* <div className="slider"></div> */}
      <div className="slider">
        <Carousel
          fade
          activeIndex={index}
          onSelect={handleSelect}
          {...carouselOptions}
        >
          <Carousel.Item>
            {/* <Link > */}
            <img
              className="slider-image "
              src="https://th.canon/media/image/2022/11/30/213c86e7328248e69dea02250ecce476_EOS-R6-II.jpg"
              alt="1"

              // src="../static/banner/Alpha-Series.png"

              // style={style.img}
            />
            {/* </Link> */}
          </Carousel.Item>
          <Carousel.Item>
            {/* <Link> */}
            <img
              className="slider-image"
              src="https://th.canon/media/image/2021/09/14/b454b422a3e646b788f2db8c775115f1_R3-banner-v2.jpg"
              alt="2"
            />
            {/* </Link> */}
          </Carousel.Item>
          <Carousel.Item>
            {/* <Link> */}
            <img
              className="slider-image"
              src="https://id.canon/media/image/2023/04/24/445d52273e62451c96dd05ee97496f1a_R8+corp+site+banner+final.jpg"
              alt="3"
            />
            {/* </Link> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="https://th.canon/media/image/2021/06/17/2d206db0d5604b8184c8e68469c92f41_%5BICP+Web+Banner%5D+EOS+850D_1920x750.jpg"
              alt="4"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="https://th.canon/media/image/2021/06/17/f0d30d05400d458394b9029aa8a2cc65_%5BICP+Web+Banner%5D+EOS+1DXIII_1920x750_02.jpg
  "
              alt="5"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="slider-image"
              src="https://www.cliftoncameras.co.uk/uploads/Shop%20Page/Leica/header.jpg
  "
              alt="6"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="slider-image"
              src="https://th.canon/media/image/2021/06/17/f0d30d05400d458394b9029aa8a2cc65_%5BICP+Web+Banner%5D+EOS+1DXIII_1920x750_02.jpg
  "
              alt="7"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="slider-image"
              src="https://th.canon/media/image/2021/06/17/f0d30d05400d458394b9029aa8a2cc65_%5BICP+Web+Banner%5D+EOS+1DXIII_1920x750_02.jpg
  "
              alt="8"
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
