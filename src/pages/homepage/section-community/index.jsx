import { FaUsers, FaChartLine, FaMedal, FaCodeBranch, FaComments, FaTrophy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./index.sass";

function SectionCommunity() {
  const handleDashboardClick = () => {
    window.location.href = "/js-homepage/dashboard";
    window.location.reload();
  };

  const achievements = [
    { icon: FaMedal, title: "Problem Solver", description: "Complete 10 coding challenges", count: "10+" },
    { icon: FaTrophy, title: "Speed Coder", description: "Solve problems under time limit", count: "5min" },
    { icon: FaCodeBranch, title: "Code Master", description: "Master all JavaScript concepts", count: "100%" },
    { icon: FaChartLine, title: "Consistency King", description: "30-day coding streak", count: "30days" }
  ];

  const communityStats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "50,000+", label: "Problems Solved" },
    { number: "1,000+", label: "Daily Active Users" },
    { number: "17", label: "Real Projects" }
  ];

  return (
    <div className="homepage__section-community">
      <div className="homepage__section-community__content">
        
        <h1 className="homepage__section-community__heading">
          <span className="homepage__section-community__main">Join the Community</span>
          <span className="homepage__section-community__sub">Track progress, earn achievements, connect with learners</span>
        </h1>

        <div className="homepage__section-community__achievements">
          <h2 className="homepage__section-community__subheading">Achievement System</h2>
          <div className="homepage__section-community__achievement-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="homepage__section-community__achievement">
                <div className="homepage__section-community__achievement-icon-wrapper">
                  <achievement.icon className="homepage__section-community__achievement-icon" />
                </div>
                <h3 className="homepage__section-community__achievement-title">{achievement.title}</h3>
                <p className="homepage__section-community__achievement-description">{achievement.description}</p>
                <span className="homepage__section-community__achievement-count">{achievement.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="homepage__section-community__stats">
          <h2 className="homepage__section-community__subheading">Community Impact</h2>
          <div className="homepage__section-community__stats-grid">
            {communityStats.map((stat, index) => (
              <div key={index} className="homepage__section-community__stat-item">
                <span className="homepage__section-community__stat-number">{stat.number}</span>
                <span className="homepage__section-community__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="homepage__section-community__features">
          <div className="homepage__section-community__feature">
            <FaUsers className="homepage__section-community__feature-icon" />
            <div className="homepage__section-community__feature-content">
              <h3>Collaborative Learning</h3>
              <p>Join discussions, share solutions, and learn from peers</p>
            </div>
          </div>
          <div className="homepage__section-community__feature">
            <FaChartLine className="homepage__section-community__feature-icon homepage__section-community__feature-icon--progress" />
            <div className="homepage__section-community__feature-content">
              <h3>Progress Tracking</h3>
              <p>Monitor your learning journey with detailed analytics</p>
            </div>
          </div>
          <div className="homepage__section-community__feature">
            <FaComments className="homepage__section-community__feature-icon homepage__section-community__feature-icon--social" />
            <div className="homepage__section-community__feature-content">
              <h3>Peer Support</h3>
              <p>Get help from community when you're stuck on challenges</p>
            </div>
          </div>
        </div>

        <button className="homepage__section-community__cta" onClick={handleDashboardClick}>
          <a href="/js-homepage/dashboard" style={{textDecoration: "none"}}>Start Your Journey</a>
        </button>

      </div>
    </div>
  );
}

export default SectionCommunity;
