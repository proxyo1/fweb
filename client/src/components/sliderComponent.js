// SliderComponent.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", background: "black", borderRadius: "50%" }}
    onClick={onClick}
  />
);

// Custom Prev Arrow
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", background: "black", borderRadius: "50%" }}
    onClick={onClick}
  />
);


const SliderComponent = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  // Custom styles for images
  const imageStyles = {
    width: "100%", // Ensure the image takes the full width of the slide
    height: "500px", // Specify a fixed height for the slide
    objectFit: "cover" ,// Cover the container without distorting the aspect ratio
    borderRadius: "20px" // Add rounded edges
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`slide-${index}`} style={imageStyles} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
