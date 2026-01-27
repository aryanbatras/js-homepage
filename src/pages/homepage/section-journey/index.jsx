import { FaPlay, FaTrophy, FaRocket, FaStar } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.sass";

function SectionJourney() {
  const handleDashboardClick = () => {
    window.location.href = "/js-homepage/dashboard";
    window.location.reload();
  };

  const journeyStages = [
    {
      icon: FaPlay,
      title: "Foundation",
      description: "Master variables, functions, and basic JavaScript concepts",
      completed: true,
      color: "#f39c12"
    },
    {
      icon: FaStar,
      title: "Intermediate",
      description: "Explore arrays, objects, and DOM manipulation",
      completed: true,
      color: "#e67e22"
    },
    {
      icon: FaTrophy,
      title: "Advanced",
      description: "Conquer async programming, closures, and design patterns",
      completed: false,
      color: "#d68910"
    },
    {
      icon: FaRocket,
      title: "Mastery",
      description: "Build real applications and optimize performance",
      completed: false,
      color: "#ca6f1e"
    }
  ];

  return (
    <div className="homepage__section-journey">
      <div className="homepage__section-journey__content">
        
        <h1 className="homepage__section-journey__heading">
          <span className="homepage__section-journey__main">Your Learning Journey</span>
          <span className="homepage__section-journey__sub">Progress from beginner to JavaScript expert</span>
        </h1>

        <div className="homepage__section-journey__timeline">
          {journeyStages.map((stage, index) => (
            <div key={index} className="homepage__section-journey__stage">
              <div className="homepage__section-journey__stage-header">
                <div 
                  className="homepage__section-journey__icon-wrapper"
                  style={{ backgroundColor: stage.color }}
                >
                  <stage.icon className="homepage__section-journey__icon" />
                </div>
                <div className="homepage__section-journey__stage-info">
                  <h3 className="homepage__section-journey__stage-title">{stage.title}</h3>
                  <p className="homepage__section-journey__stage-description">{stage.description}</p>
                </div>
                {stage.completed && (
                  <FaCheckCircle className="homepage__section-journey__completed" />
                )}
              </div>
              {index < journeyStages.length - 1 && (
                <div className="homepage__section-journey__connector" />
              )}
            </div>
          ))}
        </div>

        <div className="homepage__section-journey__stats">
          <div className="homepage__section-journey__stat">
            <span className="homepage__section-journey__stat-number">50+</span>
            <span className="homepage__section-journey__stat-label">Coding Challenges</span>
          </div>
          <div className="homepage__section-journey__stat">
            <span className="homepage__section-journey__stat-number">17</span>
            <span className="homepage__section-journey__stat-label">Real Projects</span>
          </div>
          <div className="homepage__section-journey__stat">
            <span className="homepage__section-journey__stat-number">4</span>
            <span className="homepage__section-journey__stat-label">Skill Levels</span>
          </div>
        </div>

        <button className="homepage__section-journey__cta" onClick={handleDashboardClick}>
          <a href="/js-homepage/dashboard" style={{textDecoration: "none"}}>Continue Your Journey</a>
        </button>

      </div>
    </div>
  );
}

export default SectionJourney;
