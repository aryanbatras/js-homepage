import { FaReact, FaNodeJs, FaGitAlt, FaNpm, FaDatabase, FaCloud } from "react-icons/fa";
import { SiTypescript, SiWebpack, SiBabel, SiEslint, SiPrettier, SiJest } from "react-icons/si";
import "./index.sass";

function SectionTechnology() {
  const modernJSFeatures = [
    { name: "ES6+ Syntax", description: "Arrow functions, destructuring, spread operator" },
    { name: "Async/Await", description: "Modern asynchronous programming patterns" },
    { name: "Modules", description: "Import/export for better code organization" },
    { name: "Classes & Prototypes", description: "Object-oriented programming in JavaScript" },
    { name: "Closures & Scope", description: "Advanced function behavior and memory" },
    { name: "DOM Manipulation", description: "Interactive web page interactions" }
  ];

  const techStack = [
    { icon: FaReact, name: "React", category: "Frontend" },
    { icon: FaNodeJs, name: "Node.js", category: "Backend" },
    { icon: SiTypescript, name: "TypeScript", category: "Type Safety" },
    { icon: FaGitAlt, name: "Git", category: "Version Control" },
    { icon: SiWebpack, name: "Webpack", category: "Build Tools" },
    { icon: SiBabel, name: "Babel", category: "Transpilation" },
    { icon: FaNpm, name: "NPM", category: "Package Manager" },
    { icon: FaDatabase, name: "Databases", category: "Storage" },
    { icon: SiEslint, name: "ESLint", category: "Code Quality" },
    { icon: SiPrettier, name: "Prettier", category: "Formatting" },
    { icon: SiJest, name: "Jest", category: "Testing" },
    { icon: FaCloud, name: "Cloud Services", category: "Deployment" }
  ];

  return (
    <div className="homepage__section-technology">
      <div className="homepage__section-technology__content">
        
        <h1 className="homepage__section-technology__heading">
          <span className="homepage__section-technology__main">Modern JavaScript Ecosystem</span>
          <span className="homepage__section-technology__sub">Master the tools and features developers use daily</span>
        </h1>

        <div className="homepage__section-technology__features">
          <h2 className="homepage__section-technology__subheading">Core JavaScript Features</h2>
          <div className="homepage__section-technology__grid">
            {modernJSFeatures.map((feature, index) => (
              <div key={index} className="homepage__section-technology__feature">
                <h3 className="homepage__section-technology__feature-title">{feature.name}</h3>
                <p className="homepage__section-technology__feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="homepage__section-technology__stack">
          <h2 className="homepage__section-technology__subheading">Professional Toolchain</h2>
          <div className="homepage__section-technology__tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="homepage__section-technology__tech-item">
                <tech.icon className="homepage__section-technology__tech-icon" />
                <div className="homepage__section-technology__tech-info">
                  <h4 className="homepage__section-technology__tech-name">{tech.name}</h4>
                  <span className="homepage__section-technology__tech-category">{tech.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="homepage__section-technology__insight">
          <div className="homepage__section-technology__insight-content">
            <h3 className="homepage__section-technology__insight-title">Industry-Ready Skills</h3>
            <p className="homepage__section-technology__insight-description">
              Learn the exact JavaScript features and tools that top companies use in production. 
              Our curriculum is designed to make you job-ready with practical, hands-on experience.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SectionTechnology;
