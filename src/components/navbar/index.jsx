import { IoIosArrowDown } from "react-icons/io";
import { FaSquareJs } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./index.sass";
function Navbar() {
  // const navigate = useNavigate();
  
  // const handleChallengesClick = () => {
  //   // Navigate to dashboard first
  //   navigate('/dashboard');
  //   // Then reload the page after a short delay to ensure navigation completes
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 500);
  // };
  
  return (
    <nav className="navbar__container">
      <FaSquareJs className="navbar__jsicon" />
      <div className="navbar__links">
        <a 
          href="/js-homepage/dashboard"
          className="navbar__link"
          onClick={() => {
            window.location.reload();
          }}
          // onClick={handleChallengesClick}
          // reloadDocument
        >
          <span>Challenges</span>
          <IoIosArrowDown className="navbar__icon" />
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
