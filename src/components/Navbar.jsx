import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = ({ cartItemsQut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleHomeClick = () => {
    if (isHome) {
      scroll.scrollToTop();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b text-sm text-gray-600">
          <div>24/7 Customer Support • Free Delivery on Orders $50+</div>
          <div className="hidden md:flex items-center gap-4">
            <RouterLink to="/track-order" className="hover:text-blue-600">
              Track Order
            </RouterLink>
            <RouterLink to="/stores" className="hover:text-blue-600">
              Store Locator
            </RouterLink>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 gap-4">
          <RouterLink
            to="/"
            className="flex items-center gap-2"
            onClick={handleHomeClick}
          >
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-800">PharmaCare</div>
              <div className="text-xs text-gray-500">Trusted Healthcare</div>
            </div>
          </RouterLink>

          {/* Search bar (dummy) */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search for medicines, health products..."
                className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex p-2 rounded hover:bg-gray-100"
              aria-label="Wishlist"
            >
              {/* Dummy heart */}
              <FaHeart className="h-5 w-5 text-gray-700" />
            </button>

            {user ? (
              <RouterLink
                to="/user-dashboard"
                className="hidden md:flex p-2 rounded hover:bg-gray-100"
              >
                <FaUser className="h-5 w-5 text-gray-700" />
              </RouterLink>
            ) : (
              <RouterLink
                to="/login"
                className="hidden md:flex p-2 rounded hover:bg-gray-100"
              >
                <FaUser className="h-5 w-5 text-gray-700" />
              </RouterLink>
            )}

            <RouterLink
              to="/cart"
              className="relative p-2 rounded hover:bg-gray-100"
            >
              <FaShoppingCart className="h-5 w-5 text-gray-700" />
              {cartItemsQut > 0 && (
                <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-blue-600 text-white rounded-full">
                  {cartItemsQut}
                </div>
              )}
            </RouterLink>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-3 text-sm">
          <RouterLink
            to="/online-buy"
            className="font-medium hover:text-blue-600"
          >
            Online Buy
          </RouterLink>
          <RouterLink
            to="/deals"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Special Offers
          </RouterLink>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 focus:outline-none"
              />
            </div>
            <nav className="flex flex-col gap-3">
              <RouterLink to="/online-buy" className="font-medium">
                Online Buy
              </RouterLink>
              <RouterLink to="/deals" className="text-indigo-600 font-medium">
                Special Offers
              </RouterLink>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
