import React from "react";

const Homepage = () => {
  return (
    <section className="bg-gradient-to-r from-white to-green-100 min-h-screen px-4 sm:px-6 md:px-12 flex items-center">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 w-full">
        
        {/* Left Side: Text and Buttons */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
            Welcome to Your GreenRide 
            <span>
              <img src="/leaf.webp" alt="Logo" className="inline-block w-10 h-10 ml-2 align-middle" />
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Build stunning user experiences with lightning-fast performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition">
              Book
            </button>

            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/home image.png"
            alt="Hero Illustration"
            className="rounded-xl shadow-xl w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
