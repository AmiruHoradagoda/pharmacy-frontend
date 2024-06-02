import React from "react";
import ServiceCard from "./ServiceCard";
import {
  FaTruck,
  FaIdCard,
  FaHeadset,
  FaPills,
  FaNotesMedical,
  FaUserMd,
} from "react-icons/fa";

const Service = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen py-12 bg-gradient-to-b from-blue-500 to-white">
      <h2 className="mb-12 text-5xl font-bold text-white">Our Services</h2>
      <div className="flex flex-wrap justify-center">
        <ServiceCard
          icon={FaTruck}
          title="Fast Delivery"
          description="It is a long established fact that a reader will be distracted by."
        />
        <ServiceCard
          icon={FaIdCard}
          title="License of Government"
          description="It is a long established fact that a reader will be distracted by."
        />
        <ServiceCard
          icon={FaHeadset}
          title="Support 24/7"
          description="It is a long established fact that a reader will be distracted by."
        />
        <ServiceCard
          icon={FaPills}
          title="Wide Range of Medicines"
          description="We offer a wide range of medicines to cater to your health needs."
        />
        <ServiceCard
          icon={FaNotesMedical}
          title="Medical Consultation"
          description="Get professional medical consultation from certified doctors."
        />
        <ServiceCard
          icon={FaUserMd}
          title="Qualified Pharmacists"
          description="Our team includes highly qualified and experienced pharmacists."
        />
      </div>
    </div>
  );
};

export default Service;
