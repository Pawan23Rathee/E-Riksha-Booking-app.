
// HomePage.js


import React from "react";

const Homepage= () => {

  return (
    <section className="bg-gradient-to-r text-blue py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
            Welcome to Your GreenRide 
            <span>
              <img src="/leaf.webp" alt="Logo" className="inline-block w-19 h-24 ml-2 mb-6" />
            
              
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Build stunning user experiences with lightning-fast performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-green-500 text-white-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition">
              Book
            </button>
            <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
          <img
            src="/home image.png "
            alt="Hero Illustration"
            className="rounded-xl shadow-xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
