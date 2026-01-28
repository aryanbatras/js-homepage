import { IoIosArrowDown } from "react-icons/io";
import { FaSquareJs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./index.sass";
function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleDashboardClick = () => {
      window.location.href = "/js-homepage/dashboard";
      window.location.reload();
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <nav className="navbar__container">
      <a href="/js-homepage/" className="navbar__logo-link">
        <FaSquareJs className="navbar__jsicon" />
      </a>
      <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}>
        <button 
          className="navbar__mobile-close"
          onClick={toggleMobileMenu}
          aria-label="Close mobile menu"
        >
          <FiX />
        </button>
        <a href="/js-homepage/" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>
          <span>Home</span>
        </a>
        <a href="/js-homepage/pricing" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>
          <span>Pricing</span>
        </a>
        <a href="/js-homepage/about" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>
          <span>About</span>
        </a>
        <a href="/js-homepage/contact" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>
          <span>Contact</span>
        </a>
        <a 
          href="/js-homepage/dashboard"
          className="navbar__link navbar__link--cta"
          onClick={(e) => {
            setIsMobileMenuOpen(false);
            handleDashboardClick();
          }}
        >
          <span>Get Started</span>
          {/* <IoIosArrowDown className="navbar__icon" /> */}
        </a>
      </div>
      <button 
        className="navbar__mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>
  );
}
export default Navbar;
