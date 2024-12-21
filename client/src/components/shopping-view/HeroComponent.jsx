import React from "react";
import ShoppingHeader from "./ShoppingHeader";

const HeroComponent = () => {
  return (
    <>
      <ShoppingHeader />
      <section className="relative bg-gray-50">
        {/* Background Section */}
        <div className="absolute inset-0">
          <img
            src="https://example.com/student-shopping-background.jpg"
            alt="Students shopping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-600 to-transparent opacity-80 pointer-events-none"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
            Simplify Shopping, <br /> Elevate Your Campus Life!
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-3xl drop-shadow-md">
            Exclusive deals, student-friendly prices, and a world of
            convenience—right at your fingertips.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="px-8 py-3 bg-blue-600 text-white text-lg rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:scale-105"
              aria-label="Join CampusCart for free"
            >
              Join for Free
            </button>
            <button
              className="px-8 py-3 bg-white text-blue-600 text-lg rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition transform hover:scale-105"
              aria-label="Learn more about CampusCart"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroComponent;
