import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { scrollToSection as utilScrollToSection } from "../utils/scrollToSection";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Director's Message", path: "/directors-message" },
    { name: "Courses", path: "/", scrollTo: "courses" },
    { name: "Results", path: "/results" },
    { name: "Gallery", path: "/gallery" },
    { name: "Downloads", path: "/downloads" },
    { name: "Testimonials", path: "/", scrollTo: "testimonials" },
    { name: "Contact", path: "/contact" },
    { name: "About Us", path: "/about" },
  ];

  const handleNavClick = (link) => {
    if (isNavigating) return; // Prevent rapid clicks

    setIsNavigating(true);
    setMenuOpen(false);

    if (link.scrollTo) {
      // If we're already on the home page, scroll directly
      if (location.pathname === "/") {
        utilScrollToSection(link.scrollTo);
        setTimeout(() => setIsNavigating(false), 1000); // Reset after scroll animation
      } else {
        // Navigate to home first, then scroll
        navigate(`/#${link.scrollTo}`);
        setTimeout(() => setIsNavigating(false), 500); // Reset after navigation
      }
    } else {
      navigate(link.path);
      setTimeout(() => setIsNavigating(false), 500); // Reset after navigation
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-[96px] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow"
      }`}
    >
      <div className="container-responsive py-4 flex items-center justify-between">
        {/* Logo - Back on the left */}
        <button
          onClick={() => {
            if (!isNavigating) {
              setIsNavigating(true);
              navigate("/");
              setTimeout(() => setIsNavigating(false), 500);
            }
          }}
          className="cursor-pointer disabled:opacity-50 transition-transform duration-300 hover:scale-105"
          disabled={isNavigating}
        >
          <img
            src={logo}
            alt="VAGUS Logo"
            className={`object-contain transition-all duration-300 ${
              isScrolled ? "h-12" : "h-16"
            }`}
          />
        </button>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex gap-8 text-sm font-semibold absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`relative py-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                hover:text-indigo-600 transform hover:scale-105
                ${location.pathname === link.path && !link.scrollTo ? "text-indigo-600" : "text-gray-700"}
                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5
                before:bg-indigo-600 before:transition-all before:duration-300
                hover:before:w-full
              `}
              disabled={isNavigating}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Hamburger Icon - Mobile only */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen
                    ? "rotate-45 translate-y-0"
                    : "rotate-0 -translate-y-2"
                }`}
              >
                <FaBars
                  size={24}
                  className={menuOpen ? "opacity-0" : "opacity-100"}
                />
              </span>
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen
                    ? "rotate-0 translate-y-0"
                    : "rotate-45 translate-y-2"
                }`}
              >
                <FaTimes
                  size={24}
                  className={menuOpen ? "opacity-100" : "opacity-0"}
                />
              </span>
            </div>
          </button>
        </div>

        {/* Enquire Now Button (Desktop) - On the right */}
        <Link
          to="/contact"
          className="hidden lg:inline-block btn-primary text-sm px-6 py-2.5 font-semibold"
        >
          Enquire Now
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-padding py-6">
          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className="border-b border-gray-100 pb-3 last:border-b-0 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => handleNavClick(link)}
                  className={`w-full text-left font-semibold text-base py-2 transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed hover:text-indigo-600 hover:translate-x-2
                    ${location.pathname === link.path && !link.scrollTo ? "text-indigo-600" : "text-gray-700"}
                  `}
                  disabled={isNavigating}
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li
              className="pt-4 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full text-center block py-3 font-semibold"
              >
                Enquire Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
