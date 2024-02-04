// src/components/HomePage.js

import React from 'react';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'tailwindcss/tailwind.css';
import SliderComponent from './sliderComponent';

const HomePage = () => {
  const images = [
    './images/1.png',
    './images/2.png',
    './images/3.png'
  ];
  

  
    return (
      <div className="bg-white text-gray-800 min-h-screen flex flex-col">


      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-0 py-12">
          <div className="grid grid-cols-2 gap-6 items-center">
            {/* Text Section */}
                  <div className="text-center left-100">
        <p className="text-gray-500 uppercase text-2xl lg:text-3xl">Track and Field</p>

        {/* Start with a smaller size for "TP FALCONS" and increase it at larger breakpoints if necessary */}
        <h1 className="font-bold text-7xl sm:text-8xl lg:text-8xl my-2 whitespace-nowrap">TP FALCONS</h1>

        <p className="text-2xl lg:text-3xl">RUN. JUMP. THROW.</p>
      </div>
            {/* Image Slider */}
            <div >
              
            <SliderComponent images={images} />
              
            </div>
          </div>
        </div>
        {/* Wave Shape */}
      
      </main>
    </div>
    );
  };
  
  export default HomePage;