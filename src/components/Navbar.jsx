// src/components/Navbar.jsx
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartItemsQut }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleHomeClick = () => {
    if (isHome) {
      scroll.scrollToTop();
    }
  };

  return (
    <nav className="sticky top-0 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container flex items-center justify-between mx-auto">
        <div className="text-lg font-bold text-white">PharmacyLogo</div>
        <ul className="flex space-x-4 text-lg font-bold text-white">
          <li>
            {isHome ? (
              <button onClick={handleHomeClick} className="focus:outline-none">
                Home
              </button>
            ) : (
              <RouterLink to="/">Home</RouterLink>
            )}
          </li>
          <li>
            {isHome ? (
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer"
              >
                About
              </ScrollLink>
            ) : (
              <RouterLink to="/?scroll=about">About</RouterLink>
            )}
          </li>
          <li>
            {isHome ? (
              <ScrollLink
                to="services"
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer"
              >
                Services
              </ScrollLink>
            ) : (
              <RouterLink to="/?scroll=services">Services</RouterLink>
            )}
          </li>
          <li>
            <RouterLink to="/online-buy">Online Buy</RouterLink>
          </li>
        </ul>
        <div className="flex items-center space-x-4 text-white">
          {user ? (
            <>
              <h4>Hi {user?.firstName}</h4>
              <RouterLink to="/user-dashboard">
                <FaUser className="text-2xl" />
              </RouterLink>
            </>
          ) : (
            <RouterLink to="/login">
              <FaUser className="text-2xl" />
            </RouterLink>
          )}
          <div className="relative">
            <RouterLink to="/cart">
              <FaShoppingCart className="text-2xl" />
            </RouterLink>
            {cartItemsQut > 0 && (
              <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-700 rounded-full">
                {cartItemsQut}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
