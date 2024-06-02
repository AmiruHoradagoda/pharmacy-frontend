import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="relative flex items-center justify-start h-screen bg-center bg-cover"
      style={{ backgroundImage: "url(/images/HeroSection.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-start pb-24 pl-10 text-left text-white">
        <h1 className="mb-6 text-5xl font-bold md:text-8xl">
          Welcome To Our <br />
          <span className="text-indigo-400">Online Medicine</span>
        </h1>
        <p className="max-w-2xl px-4 mb-12 text-xl md:text-2xl">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div>
          <Link
            to="/online-buy"
            className="px-6 py-3 text-xl font-bold text-white transition duration-300 bg-indigo-500 rounded hover:bg-indigo-700"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
