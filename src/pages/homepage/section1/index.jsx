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
            <a 
              className="homepage__section1__dashboard-btn"
              href="/js-homepage/dashboard"
              onClick={() => {
                window.location.reload();
              }}  
              // reloadDocument
            >
              Start Coding Challenges
            </a>
          )}
        </div>
      </div>
  );
}
export default Section1;
