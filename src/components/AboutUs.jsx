import React from "react";
// import image from "/images/pharmacist-About.jpg"; // Adjust the path as necessary

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-100 md:flex-row">
      <div
        className="w-full h-40 bg-top bg-no-repeat bg-cover rounded-lg shadow-lg md:w-1/2 md:h-full"
        style={{ backgroundImage: "url(/images/pharmacist-About-1.jpg)" }}
      />
      <div className="mt-8 md:w-1/2 md:mt-0 md:pl-16">
        <h2 className="mb-6 text-5xl font-bold text-indigo-600">About Us</h2>
        <p className="mb-4 text-lg text-gray-700">
          Welcome to our Pharmacy E-commerce platform. We are dedicated to
          providing you with the highest quality medicines and healthcare
          products, delivered to your doorstep with convenience and care.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Our mission is to enhance the health and well-being of our customers
          by offering a wide range of genuine pharmaceutical products. We ensure
          that every product we sell meets the highest standards of quality and
          safety.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Our team of qualified pharmacists and healthcare professionals is
          always ready to assist you with your medical needs. We provide
          professional medical consultation and support 24/7.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
