// SliderComponent.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
    
    
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        <div>
          <img src=".\images\1.png" alt="Group photo of TP Falcons athletics team in front of the Home of Athletics building" className="w-full h-full object-cover object-center" />
        </div>
        <div>
          <img src=".\images\2.png" alt="Group photo of TP Falcons athletics team in front of the Home of Athletics building" className="w-full h-full object-cover object-center" />
        </div>
        <div>
          <img src=".\images\3.png" alt="Group photo of TP Falcons athletics team in front of the Home of Athletics building" className="w-full h-full object-cover object-center" />
        </div>
        {/* Repeat the div for as many slides as you have */}
      </Slider>
    </div>
  );
};

export default SliderComponent;
