import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-10 text-white bg-black">
      <div className="container flex flex-col items-start justify-between px-4 mx-auto md:flex-row md:items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="mb-4 text-xl font-bold">CONTACT</h3>
          <div className="flex items-center mb-2">
            <FaPhoneAlt className="mr-2" />
            <span>+01 123567894</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>demo@gmail.com</span>
          </div>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="mb-4 text-xl font-bold">MENU</h3>
          <ul>
            <li className="mb-2">
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li className="mb-2">
              <a href="/medicine" className="hover:underline">
                Medicine
              </a>
            </li>
            <li>
              <a href="/online-buy" className="hover:underline">
                Online Buy
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-auto">
          <h3 className="mb-4 text-xl font-bold">NEWSLETTER</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter Your email"
              className="p-2 text-black rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 rounded-r-lg hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center text-white">
        &copy; 2024 Pharmacy, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
