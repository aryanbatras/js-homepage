import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.sass"
import { useState } from "react"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus("Please enter your name")
      return false
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setSubmitStatus("Please enter a valid email address")
      return false
    }
    if (!formData.subject.trim()) {
      setSubmitStatus("Please enter a subject")
      return false
    }
    if (!formData.message.trim()) {
      setSubmitStatus("Please enter your message")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus("")
    
    try {
      const mailtoLink = `mailto:batraaryan03@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      
      window.location.href = mailtoLink
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        })
        setSubmitStatus("Message sent successfully!")
        setIsSubmitting(false)
        
        setTimeout(() => {
          setSubmitStatus("")
        }, 5000)
      }, 1000)
      
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="contact__container">
        <div className="contact__content">
          <div className="contact__header">
            <h1 className="contact__title">
              Get in <span>Touch</span>
            </h1>
            <p className="contact__subtitle">
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>

          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__info-item">
                <div className="contact__info-icon">📧</div>
                <div className="contact__info-content">
                  <h3>Email</h3>
                  <p>batraaryan03@gmail.com</p>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">⚡</div>
                <div className="contact__info-content">
                  <h3>GitHub Repository</h3>
                  <p>Check out the source code</p>
                  <a href="https://github.com/aryanbatras/js-homepage" className="contact__info-link" target="_blank" rel="noopener noreferrer">View Repository</a>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">💼</div>
                <div className="contact__info-content">
                  <h3>LinkedIn</h3>
                  <p>Let's connect professionally</p>
                  <a href="https://www.linkedin.com/in/aryanbatra/" className="contact__info-link" target="_blank" rel="noopener noreferrer">Connect</a>
                </div>
              </div>

              {/* <div className="contact__info-item">
                <div className="contact__info-icon">🚀</div>
                <div className="contact__info-content">
                  <h3>Projects</h3>
                  <p>Explore my other work</p>
                  <a href="https://github.com/aryanbatras" className="contact__info-link" target="_blank" rel="noopener noreferrer">See Projects</a>
                </div>
              </div> */}
              
            </div>

            <div className="contact__form-section">
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact__button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                
                {submitStatus && (
                  <div className={`contact__status ${submitStatus.includes("successfully") ? "contact__status--success" : "contact__status--error"}`}>
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default Contact
