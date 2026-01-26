import { FaCode, FaRobot, FaClock, FaLayerGroup, FaTerminal, FaBrain } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./index.sass";

function SectionFeatures() {
  const handleDashboardClick = () => {
    window.location.href = "/js-homepage/dashboard";
    window.location.reload();
  };

  return (
    <div className="homepage__section-features">
      <div className="homepage__section-features__content">
        
        <h1 className="homepage__section-features__heading">
          <span className="homepage__section-features__main">Powerful Dashboard</span>
          <span className="homepage__section-features__sub">Everything you need to master JavaScript</span>
        </h1>

        <div className="homepage__section-features__grid">
          <div className="homepage__section-features__item">
            <FaCode className="homepage__section-features__icon" />
            <div className="homepage__section-features__text">
              <h3>Interactive Code Editor</h3>
              <p>Write and test JavaScript directly in your browser with instant feedback</p>
            </div>
          </div>

          <div className="homepage__section-features__item">
            <FaRobot className="homepage__section-features__icon homepage__section-features__icon--ai" />
            <div className="homepage__section-features__text">
              <h3>AI Assistant</h3>
              <p>Get intelligent hints and explanations when you're stuck on challenging problems</p>
            </div>
          </div>

          <div className="homepage__section-features__item">
            <FaClock className="homepage__section-features__icon homepage__section-features__icon--timer" />
            <div className="homepage__section-features__text">
              <h3>Practice Timer</h3>
              <p>Track your solving time and improve your speed with every challenge</p>
            </div>
          </div>

          <div className="homepage__section-features__item">
            <FaLayerGroup className="homepage__section-features__icon homepage__section-features__icon--categories" />
            <div className="homepage__section-features__text">
              <h3>Problem Categories</h3>
              <p>From algorithms to DOM manipulation - master every aspect of JavaScript</p>
            </div>
          </div>

          <div className="homepage__section-features__item">
            <FaTerminal className="homepage__section-features__icon homepage__section-features__icon--console" />
            <div className="homepage__section-features__text">
              <h3>Console Output</h3>
              <p>See your code execution results in real-time with detailed error messages</p>
            </div>
          </div>

          <div className="homepage__section-features__item">
            <FaBrain className="homepage__section-features__icon homepage__section-features__icon--progress" />
            <div className="homepage__section-features__text">
              <h3>Adaptive Learning</h3>
              <p>Problems adjust to your skill level for optimal learning progression</p>
            </div>
          </div>
        </div>

        <button className="homepage__section-features__cta" onClick={handleDashboardClick}>
          Explore Dashboard
        </button>

      </div>
    </div>
  );
}

export default SectionFeatures;
