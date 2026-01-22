import { IoIosArrowDown } from "react-icons/io";
import { FaSquareJs } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./index.sass";
function Navbar() {
  const navigate = useNavigate();
  
  const handleChallengesClick = () => {
    // Navigate to dashboard first
    navigate('/dashboard');
    // Then reload the page after a short delay to ensure navigation completes
    setTimeout(() => {
      window.location.reload();
    }, 250);
  };
  
  return (
    <nav className="navbar__container">
      <FaSquareJs className="navbar__jsicon" />
      <div className="navbar__links">
        <Link 
          to="/dashboard" 
          className="navbar__link"
          onClick={handleChallengesClick}
        >
          <span>Challenges</span>
          <IoIosArrowDown className="navbar__icon" />
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
