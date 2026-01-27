import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.sass"

function Pricing() {
  return (
    <>
      <Navbar />
      <main className="pricing__container">
        <div className="pricing__content">
          <div className="pricing__header">
            <h1 className="pricing__title">
              Simple <span>Pricing</span>
            </h1>
            <p className="pricing__subtitle">
              Choose the perfect plan for your JavaScript journey
            </p>
          </div>

          <div className="pricing__grid">
            <div className="pricing__card pricing__card--basic">
              <div className="pricing__card-header">
                <h3>Basic</h3>
                <div className="pricing__price">
                  <span className="pricing__currency">$</span>
                  <span className="pricing__amount">0</span>
                  <span className="pricing__period">/month</span>
                </div>
                <p className="pricing__description">Perfect for getting started</p>
              </div>
              <ul className="pricing__features">
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Access to basic problems
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Light theme only
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Basic editor features
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Limited AI usage (10 hints/month)
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Community support
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Progress tracking
                </li>
                {/* <li className="pricing__feature pricing__feature--disabled">
                  <span className="pricing__cross">✗</span>
                  Dark theme
                </li> */}
                <li className="pricing__feature pricing__feature--disabled">
                  <span className="pricing__cross">✗</span>
                  Advanced analytics
                </li>
                {/* <li className="pricing__feature pricing__feature--disabled">
                  <span className="pricing__cross">✗</span>
                  Custom practice sessions
                </li> */}
              </ul>
              <button className="pricing__button pricing__button--outline">
                Get Started
              </button>
            </div>

            <div className="pricing__card pricing__card--pro">
              <div className="pricing__card-header">
                <div className="pricing__badge">Most Popular</div>
                <h3>Pro</h3>
                <div className="pricing__price">
                  <span className="pricing__currency">$</span>
                  <span className="pricing__amount">2</span>
                  <span className="pricing__period">/month</span>
                </div>
                <p className="pricing__description">For serious developers</p>
              </div>
              <ul className="pricing__features">
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Unlimited problem access
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Dark theme support
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Advanced editor customizations
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Unlimited AI usage
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Priority support
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Custom practice sessions
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Advanced analytics
                </li>
              </ul>
              <button className="pricing__button pricing__button--outline">
                Start Free Trial
              </button>
            </div>

            <div className="pricing__card pricing__card--enterprise">
              <div className="pricing__card-header">
                <h3>EdTech</h3>
                <div className="pricing__price">
                  <span className="pricing__amount">Custom</span>
                </div>
                <p className="pricing__description">For educational institutions</p>
              </div>
              <ul className="pricing__features">
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Everything in Pro
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Collaborative environment via websockets
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Add your own custom problems
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Advanced admin dashboard
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Premium support
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Student progress analytics
                </li>
                <li className="pricing__feature">
                  <span className="pricing__check">✓</span>
                  Bulk user management
                </li>
              </ul>
              <button className="pricing__button pricing__button--outline">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="pricing__faq">
            <h2 className="pricing__faq-title">Frequently Asked Questions</h2>
            <div className="pricing__faq-grid">
              <div className="pricing__faq-item">
                <h3>Can I change plans anytime?</h3>
                <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="pricing__faq-item">
                <h3>Is there a free trial?</h3>
                <p>Pro plans come with a 14-day free trial. No credit card required to start.</p>
              </div>
              <div className="pricing__faq-item">
                <h3>What payment methods do you accept?</h3>
                <p>We accept all major credit cards, PayPal, and wire transfers for enterprise plans.</p>
              </div>
              <div className="pricing__faq-item">
                <h3>Can I cancel anytime?</h3>
                <p>Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Pricing
