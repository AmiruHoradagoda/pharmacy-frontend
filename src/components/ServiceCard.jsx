import React from "react";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center w-full p-8 mx-4 my-4 bg-white rounded-lg shadow-lg md:w-1/3 lg:w-1/4">
      <Icon className="mb-6 text-6xl text-indigo-500" />
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p className="text-lg text-center text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
