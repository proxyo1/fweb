// src/components/HomePage.js

import React from 'react';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'tailwindcss/tailwind.css';
import SliderComponent from './sliderComponent';

const HomePage = () => {

  
    return (
      <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Header */}


      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-6 items-center">
            {/* Text Section */}
            <div>
              <p className="text-gray-500 text-sm uppercase">Track and Field</p>
              <h1 className="font-bold text-6xl my-2">TP FALCONS</h1>
              <p className="text-xl">RUN. JUMP. THROW.</p>
            </div>
            {/* Image Slider */}
            <div>
              <div >
              <SliderComponent />
              </div>
            </div>
          </div>
        </div>
        {/* Wave Shape */}
      
      </main>
    </div>
    );
  };
  
  export default HomePage;