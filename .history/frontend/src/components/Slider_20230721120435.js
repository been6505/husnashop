import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
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
    height: "100",
    objectFit: "cover",
    minWidth: "100%",
  };

  const carouselOptions = {
    interval: 5000,
    pauseOnHover: true,
    transitionDuration: 500,
  };

  return (
    <>
      <div className="">
        <Carousel
          fade
          activeIndex={index}
          onSelect={handleSelect}
          {...carouselOptions}
        >
          <Carousel.Item>
            <img
              className="slider-image "
              src="https://th.canon/media/image/2022/11/30/213c86e7328248e69dea02250ecce476_EOS-R6-II.jpg"
              alt="1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="https://th.canon/media/image/2021/09/14/b454b422a3e646b788f2db8c775115f1_R3-banner-v2.jpg"
              alt="2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="slider-image"
              src="https://th.canon/media/image/2022/04/12/94ae097718084fa2b8625503f1082e2d_CMT-Banner_1920x750-TH.jpg"
              alt="3"
            />
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
        </Carousel>
        <div>
          <ul className="slider-navigation-bullets m-2 p-2 ">
            {/* {getNavigationBullets()} */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Slider;
