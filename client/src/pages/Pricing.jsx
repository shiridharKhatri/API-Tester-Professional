"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, X, Star, Zap, Users, Rocket, ArrowRight, CheckCircle } from "lucide-react"
import "../styles/pricing.css"

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started with API testing",
      popular: false,
      features: [
        { text: "100 API requests per month", included: true },
        { text: "Basic response analysis", included: true },
        { text: "Media detection", included: true },
        { text: "Community support", included: true },
        { text: "Basic themes", included: true },
        { text: "Bulk downloads", included: false },
        { text: "Custom detection keys", included: false },
        { text: "Priority support", included: false },
        { text: "Team collaboration", included: false },
        { text: "Advanced analytics", included: false },
      ],
      cta: "Get Started Free",
      ctaVariant: "secondary",
      icon: <Zap />,
      color: "blue",
    },
    {
      name: "Pro",
      price: { monthly: 19, annual: 15 },
      description: "For professional developers and small teams",
      popular: true,
      features: [
        { text: "10,000 API requests per month", included: true },
        { text: "Advanced response analysis", included: true },
        { text: "Smart media detection", included: true },
        { text: "Priority support", included: true },
        { text: "Custom themes", included: true },
        { text: "Bulk downloads", included: true },
        { text: "Custom detection keys", included: true },
        { text: "Request history", included: true },
        { text: "Export capabilities", included: true },
        { text: "Team collaboration", included: false },
      ],
      cta: "Start Pro Trial",
      ctaVariant: "primary",
      icon: <Rocket />,
      color: "purple",
    },
    {
      name: "Team",
      price: { monthly: 49, annual: 39 },
      description: "For growing teams and organizations",
      popular: false,
      features: [
        { text: "50,000 API requests per month", included: true },
        { text: "Advanced response analysis", included: true },
        { text: "AI-powered detection", included: true },
        { text: "Priority support", included: true },
        { text: "Custom themes & branding", included: true },
        { text: "Unlimited bulk downloads", included: true },
        { text: "Advanced detection rules", included: true },
        { text: "Unlimited request history", included: true },
        { text: "Advanced export options", included: true },
        { text: "Team collaboration (5 users)", included: true },
      ],
      cta: "Start Team Trial",
      ctaVariant: "primary",
      icon: <Users />,
      color: "green",
    },
  ]

  const comparisonFeatures = [
    {
      category: "Core Features",
      features: [
        { name: "API Requests per month", free: "100", pro: "10,000", team: "50,000" },
        { name: "Response Analysis", free: "Basic", pro: "Advanced", team: "Advanced" },
        { name: "Media Detection", free: "✓", pro: "✓", team: "AI-Powered" },
        { name: "Request History", free: "✗", pro: "✓", team: "✓" },
        { name: "Export Capabilities", free: "✗", pro: "✓", team: "Advanced" },
      ],
    },
    {
      category: "Advanced Features",
      features: [
        { name: "Bulk Downloads", free: "✗", pro: "✓", team: "Unlimited" },
        { name: "Custom Detection Keys", free: "✗", pro: "✓", team: "Advanced" },
        { name: "Team Collaboration", free: "✗", pro: "✗", team: "5 users" },
        { name: "Custom Themes", free: "Basic", pro: "✓", team: "Branding" },
        { name: "API Access", free: "✗", pro: "✗", team: "✓" },
      ],
    },
    {
      category: "Support & Security",
      features: [
        { name: "Support Level", free: "Community", pro: "Priority", team: "Priority" },
        { name: "SLA Guarantee", free: "✗", pro: "99.5%", team: "99.9%" },
        { name: "Security Features", free: "Standard", pro: "Enhanced", team: "Advanced" },
        { name: "Audit Logs", free: "✗", pro: "✗", team: "Basic" },
        { name: "SSO Integration", free: "✗", pro: "✗", team: "✗" },
      ],
    },
  ]

  const getCurrentPrice = (plan) => {
    if (typeof plan.price.monthly === "string") return plan.price.monthly
    return isAnnual ? plan.price.annual : plan.price.monthly
  }

  const getSavings = (plan) => {
    if (typeof plan.price.monthly === "string") return null
    const monthlyCost = plan.price.monthly * 12
    const annualCost = plan.price.annual * 12
    const savings = Math.round(((monthlyCost - annualCost) / monthlyCost) * 100)
    return savings > 0 ? savings : null
  }

  return (
    <div className="pricing-page page-content">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <motion.div className="pricing-hero-content" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 className="pricing-hero-title" variants={staggerItem}>
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </motion.h1>
            <motion.p className="pricing-hero-description" variants={staggerItem}>
              Choose the perfect plan for your API testing needs. Start free and scale as you grow.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div className="billing-toggle" variants={staggerItem}>
              <span className={`billing-label ${!isAnnual ? "active" : ""}`}>Monthly</span>
              <button className={`billing-switch ${isAnnual ? "active" : ""}`} onClick={() => setIsAnnual(!isAnnual)}>
                <div className="billing-slider" />
              </button>
              <span className={`billing-label ${isAnnual ? "active" : ""}`}>
                Annual
                <span className="billing-savings">Save 20%</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="container">
          <motion.div
            className="pricing-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`pricing-card ${plan.color} ${plan.popular ? "popular" : ""}`}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Star size={16} />
                    Most Popular
                  </div>
                )}

                <div className="plan-header">
                  <div className={`plan-icon ${plan.color}`}>{plan.icon}</div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">
                      {typeof getCurrentPrice(plan) === "string" ? getCurrentPrice(plan) : `$${getCurrentPrice(plan)}`}
                    </span>
                    {typeof getCurrentPrice(plan) !== "string" && <span className="period">/month</span>}
                    {isAnnual && getSavings(plan) && <div className="savings-indicator">Save {getSavings(plan)}%</div>}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-features">
                  <h4 className="features-title">What's included:</h4>
                  <ul className="features-list">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`feature-item ${!feature.included ? "limitation" : ""}`}>
                        <div className={`feature-icon ${feature.included ? "check" : "cross"}`}>
                          {feature.included ? <Check size={16} /> : <X size={16} />}
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-cta">
                  <Link
                    to="/signup"
                    className={`btn ${plan.ctaVariant === "primary" ? "btn-primary" : "btn-secondary"} btn-large btn-full`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="features-comparison">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Compare Plans</h2>
            <p className="section-description">Detailed comparison of features across all plans</p>
          </div>

          <motion.div
            className="comparison-table"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="table-header">
              <div className="feature-column">Features</div>
              <div className="plan-column">Free</div>
              <div className="plan-column">Pro</div>
              <div className="plan-column">Team</div>
            </div>
            <div className="table-body">
              {comparisonFeatures.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="category-header">{category.category}</div>
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="table-row">
                      <div className="feature-name">{feature.name}</div>
                      <div className="feature-value">
                        {feature.free === "✓" ? (
                          <Check className="check" size={16} />
                        ) : feature.free === "✗" ? (
                          <X className="cross" size={16} />
                        ) : (
                          feature.free
                        )}
                      </div>
                      <div className="feature-value">
                        {feature.pro === "✓" ? (
                          <Check className="check" size={16} />
                        ) : feature.pro === "✗" ? (
                          <X className="cross" size={16} />
                        ) : (
                          feature.pro
                        )}
                      </div>
                      <div className="feature-value">
                        {feature.team === "✓" ? (
                          <Check className="check" size={16} />
                        ) : feature.team === "✗" ? (
                          <X className="cross" size={16} />
                        ) : (
                          feature.team
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="cta-title" variants={staggerItem}>
              Ready to Get Started?
            </motion.h2>
            <motion.p className="cta-description" variants={staggerItem}>
              Join thousands of developers who trust Apix for their API testing needs. Start your free trial today.
            </motion.p>
            <motion.div className="cta-actions" variants={staggerItem}>
              <Link to="/signup" className="btn btn-primary btn-large">
                <Rocket size={20} />
                Start Free Trial
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Contact Sales
              </Link>
            </motion.div>
            <motion.div className="cta-features" variants={staggerItem}>
              <div className="cta-feature">
                <CheckCircle size={16} />
                No credit card required
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                14-day free trial
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
