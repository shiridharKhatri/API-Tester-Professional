"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Globe } from "lucide-react"
import "../styles/contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "general",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  const contactMethods = [
    {
      icon: <Mail className="contact-icon" />,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@apix.dev",
      link: "mailto:hello@apix.dev",
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MessageCircle className="contact-icon" />,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Start a conversation",
      link: "#",
    },
    {
      icon: <Globe className="contact-icon" />,
      title: "Help Center",
      description: "Browse our knowledge base",
      value: "Visit Help Center",
      link: "/faq",
    },
  ]

  const offices = [
    {
      title: "San Francisco HQ",
      address: "123 Market Street\nSuite 456\nSan Francisco, CA 94105",
      description: "Our main headquarters and development center",
    },
    {
      title: "New York Office",
      address: "789 Broadway\nFloor 12\nNew York, NY 10003",
      description: "Sales and customer success hub",
    },
    {
      title: "London Office",
      address: "456 Oxford Street\nSuite 789\nLondon, UK W1C 1AP",
      description: "European operations and support",
    },
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="hero-description">
              Have questions about Apix? We're here to help. Reach out to our team and we'll get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Send us a message</h2>
                <p className="form-description">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted ? (
                <div className="success-message">
                  <CheckCircle size={24} />
                  <div>
                    <h3>Message sent successfully!</h3>
                    <p>We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-input"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-input"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company" className="form-label">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="form-input"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-large btn-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-header">
                <h2 className="info-title">Other ways to reach us</h2>
                <p className="info-description">
                  Prefer to reach out directly? Here are all the ways you can get in touch with our team.
                </p>
              </div>

              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <div key={index} className="contact-method">
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-content">
                      <h3 className="method-title">{method.title}</h3>
                      <p className="method-description">{method.description}</p>
                      <a href={method.link} className="method-value link">
                        {method.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="additional-info">
                <h3 className="additional-title">Need immediate help?</h3>
                <p className="additional-description">
                  For urgent technical issues, check our status page or browse our comprehensive documentation and FAQ
                  section.
                </p>
                <div className="additional-actions">
                  <a href="/faq" className="btn btn-secondary">
                    View FAQ
                  </a>
                  <a href="/docs" className="btn btn-secondary">
                    Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="offices-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Offices</h2>
            <p className="section-description">Visit us at one of our global locations</p>
          </div>
          <div className="offices-grid">
            {offices.map((office, index) => (
              <div key={index} className="office-card">
                <div className="office-icon">
                  <MapPin size={24} color="white" />
                </div>
                <h3 className="office-title">{office.title}</h3>
                <p className="office-address">{office.address}</p>
                <p className="office-description">{office.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
