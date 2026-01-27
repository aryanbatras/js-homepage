import { IoIosArrowDown } from "react-icons/io";
import { FaSquareJs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./index.sass";
function Navbar() {
  const navigate = useNavigate();
  
  const handleDashboardClick = () => {
      window.location.href = "/js-homepage/dashboard";
      window.location.reload();
  };
  
  return (
    <nav className="navbar__container">
      <a href="/js-homepage/" className="navbar__logo-link">
        <FaSquareJs className="navbar__jsicon" />
      </a>
      <div className="navbar__links">
        <a href="/js-homepage/" className="navbar__link">
          <span>Home</span>
        </a>
        <a href="/js-homepage/pricing" className="navbar__link">
          <span>Pricing</span>
        </a>
        <a href="/js-homepage/about" className="navbar__link">
          <span>About</span>
        </a>
        <a href="/js-homepage/contact" className="navbar__link">
          <span>Contact</span>
        </a>
        <a 
          href="/js-homepage/dashboard"
          className="navbar__link navbar__link--cta"
          onClick={handleDashboardClick}
        >
          <span>Get Started</span>
          {/* <IoIosArrowDown className="navbar__icon" /> */}
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
