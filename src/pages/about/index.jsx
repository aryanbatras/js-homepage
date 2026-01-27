import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import aryanImage from "../../assets/aryan.png"
import "./index.sass"

function About() {
  return (
    <>
      <Navbar />
      <main className="about__container">
        <div className="about__content">
          <div className="about__hero">
            <h1 className="about__title">
              About <span>JavaScript Master</span>
            </h1>
            <p className="about__subtitle">
              Empowering developers to master JavaScript through interactive learning and real-world practice
            </p>
          </div>

          <div className="about__story">
            <div className="about__story-content">
              <h2>Our Story</h2>
              <p>
                JavaScript Master was born from a simple observation: while there are countless resources for learning JavaScript, 
                few provide the structured, hands-on practice needed to truly master the language. We set out to create a platform 
                that bridges the gap between theory and practice.
              </p>
              <p>
                Our mission is to help developers of all levels build confidence and competence in JavaScript through carefully 
                crafted problems, instant feedback, and personalized learning paths.
              </p>
            </div>
          </div>

          <div className="about__creator">
            <h2>Meet the Creator</h2>
            <div className="about__creator-card">
              <div className="about__creator-image">
                <img src={aryanImage} alt="Aryan Batra" className="about__creator-avatar-img" />
              </div>
              <div className="about__creator-info">
                <h3>Aryan Batra</h3>
                <p className="about__creator-title">3rd Year Student & Deep Learning Enthusiast</p>
                <p className="about__creator-bio">
                  I'm a 3rd year student with a deep passion for systems and deep learning. Currently exploring frontend development 
                  with a systems mindset, bringing my analytical approach to create elegant and efficient web solutions. 
                  JavaScript Master is my journey into making programming education more accessible and effective.
                </p>
                <div className="about__creator-skills">
                  <span className="about__skill">Systems</span>
                  <span className="about__skill">Deep Learning</span>
                  <span className="about__skill">Frontend</span>
                  <span className="about__skill">JavaScript</span>
                  <span className="about__skill">React</span>
                </div>
                <div className="about__creator-links">
                  <a href="https://github.com/aryanbatras" className="about__link" target="_blank" rel="noopener noreferrer">
                    {/* <span className="about__link-icon">⚡</span> */}
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/aryanbatra/" className="about__link" target="_blank" rel="noopener noreferrer">
                    {/* <span className="about__link-icon">💼</span> */}
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
