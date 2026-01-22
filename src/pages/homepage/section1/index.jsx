import { FaSquareJs } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./index.sass";
function Section1({insideMac = false}) {
  return (
    <div className={`homepage__section1 ${insideMac ? 'homepage__section1--insideMac' : ''}`}>
        <div className="homepage__section1__content">
          <FaSquareJs className={`homepage__jsicon ${insideMac ? 'homepage__jsicon--insideMac' : ''}`} />
          <span>
            The <span>challenging</span> <br /> 
            way to learn <span>JavaScript</span>
          </span>
          {insideMac === false && ( 
            <Link 
              className="homepage__section1__dashboard-btn"
              to='/dashboard'
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              Start Coding Challenges
            </Link>
          )}
        </div>
      </div>
  );
}
export default Section1;
