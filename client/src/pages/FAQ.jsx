"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, HelpCircle, Book, MessageCircle } from "lucide-react"
import "../styles/faq.css"

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Book size={20} />,
      questions: [
        {
          question: "What is Apix and how does it work?",
          answer:
            "Apix is an advanced API testing platform that allows you to test, analyze, and debug APIs with intelligent features like automatic media detection, bulk downloads, and real-time response analysis. Simply enter your API endpoint, configure headers and parameters, and send requests to get detailed responses with smart content extraction.",
        },
        {
          question: "How do I make my first API request?",
          answer:
            "Navigate to the API Tester, enter your API URL, select the HTTP method (GET, POST, etc.), add any required headers or parameters, and click 'Send Request'. The response will be displayed with syntax highlighting and automatic media detection.",
        },
        {
          question: "Do I need to create an account to use Apix?",
          answer:
            "You can use Apix without an account for basic testing. However, creating a free account gives you access to request history, saved configurations, and higher rate limits.",
        },
        {
          question: "What types of APIs can I test with Apix?",
          answer:
            "Apix supports all types of REST APIs, GraphQL endpoints, webhooks, and any HTTP-based API. It works with JSON, XML, form data, file uploads, and custom content types.",
        },
      ],
    },
    {
      title: "Features & Functionality",
      icon: <HelpCircle size={20} />,
      questions: [
        {
          question: "What is automatic media detection?",
          answer:
            "Apix automatically scans API responses for images, videos, and media files based on configurable key names and file extensions. Detected media is organized into galleries for easy viewing and bulk downloading.",
        },
        {
          question: "How does bulk downloading work?",
          answer:
            "When Apix detects media files in API responses, you can download all images and videos as organized ZIP archives with one click. Files are automatically categorized and named based on their source location in the response.",
        },
        {
          question: "Can I customize media detection keys?",
          answer:
            "Yes! You can add custom key names that Apix should look for when detecting media files. Common keys like 'image', 'photo', 'video' are included by default, but you can add API-specific keys like 'thumbnail_url' or 'avatar_image'.",
        },
        {
          question: "What request methods are supported?",
          answer:
            "Apix supports all standard HTTP methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, and HEAD. You can also send custom headers, query parameters, JSON payloads, and form data including file uploads.",
        },
        {
          question: "How do I handle authentication?",
          answer:
            "Add authentication headers like 'Authorization: Bearer token' or 'API-Key: your-key' in the Headers section. Apix supports all authentication methods including OAuth, API keys, basic auth, and custom authentication schemes.",
        },
      ],
    },
    {
      title: "Pricing & Plans",
      icon: <MessageCircle size={20} />,
      questions: [
        {
          question: "Is there a free plan available?",
          answer:
            "Yes! Our free plan includes 100 API requests per month, basic response analysis, media detection, and community support. It's perfect for getting started and small projects.",
        },
        {
          question: "What's included in the Pro plan?",
          answer:
            "The Pro plan ($19/month) includes 10,000 API requests, bulk media downloads, custom detection keys, priority support, custom themes, export capabilities, and request history.",
        },
        {
          question: "Can I upgrade or downgrade my plan anytime?",
          answer:
            "You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle. We also offer prorated billing for mid-cycle changes.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund, no questions asked.",
        },
        {
          question: "What happens if I exceed my request limit?",
          answer:
            "We'll notify you when you're approaching your limit. You can upgrade your plan for immediate access to more requests, or wait for your limit to reset at the next billing cycle.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: <Search size={20} />,
      questions: [
        {
          question: "Why am I getting CORS errors?",
          answer:
            "CORS (Cross-Origin Resource Sharing) errors occur when testing APIs from the browser that don't allow cross-origin requests. This is a browser security feature. The API server needs to include proper CORS headers, or you may need to test from a server environment.",
        },
        {
          question: "How do I debug failed requests?",
          answer:
            "Check the response status code and error message in the Response tab. Common issues include incorrect URLs, missing authentication headers, invalid request format, or network connectivity problems. The Raw tab shows the exact server response.",
        },
        {
          question: "Can I save and reuse request configurations?",
          answer:
            "Yes! Pro and Team plan users can save request configurations, create collections, and build reusable test suites. This makes it easy to test the same endpoints repeatedly or share configurations with team members.",
        },
        {
          question: "What file formats are supported for uploads?",
          answer:
            "Apix supports all file types for uploads including images (JPG, PNG, GIF), documents (PDF, DOC), archives (ZIP, RAR), and any custom file format your API accepts. File size limits depend on your plan.",
        },
        {
          question: "How do I test APIs that require complex authentication?",
          answer:
            "For complex auth flows like OAuth 2.0, you can manually add the required headers after obtaining tokens through the standard OAuth flow. Enterprise plans include advanced authentication helpers and automated token management.",
        },
      ],
    },
    {
      title: "Account & Security",
      icon: <Book size={20} />,
      questions: [
        {
          question: "How secure is my data with Apix?",
          answer:
            "We take security seriously. All requests are encrypted in transit, API keys are never logged or stored, and we follow industry-standard security practices. Enterprise plans include additional security features like SSO and audit logs.",
        },
        {
          question: "Can I delete my account and data?",
          answer:
            "Yes, you can delete your account at any time from your account settings. This will permanently remove all your data, request history, and saved configurations. This action cannot be undone.",
        },
        {
          question: "Do you store my API responses?",
          answer:
            "Response data is temporarily cached for the current session to enable features like media detection and downloads. We don't permanently store response content unless you explicitly save it to your request history (Pro+ plans).",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure reset link. If you don't receive the email, check your spam folder or contact support.",
        },
      ],
    },
  ]

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const allQuestions = faqCategories.flatMap((category) => category.questions)
  const totalQuestions = allQuestions.length

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="hero-description">
              Find answers to common questions about Apix. Can't find what you're looking for? Contact our support team.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <HelpCircle size={20} />
                <span>{totalQuestions} Questions Answered</span>
              </div>
              <div className="stat-item">
                <MessageCircle size={20} />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          {filteredCategories.length > 0 ? (
            <div className="faq-categories">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="faq-category">
                  <div className="category-header">
                    {category.icon}
                    <h2 className="category-title">{category.title}</h2>
                    <span className="category-count">({category.questions.length})</span>
                  </div>
                  <div className="faq-items">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex // Unique index
                      const isOpen = openItems.has(globalIndex)

                      return (
                        <div key={itemIndex} className={`faq-item ${isOpen ? "open" : ""}`}>
                          <button
                            className="faq-question"
                            onClick={() => toggleItem(globalIndex)}
                            aria-expanded={isOpen}
                          >
                            <span className="question-text">{item.question}</span>
                            {isOpen ? (
                              <ChevronUp size={20} className="chevron" />
                            ) : (
                              <ChevronDown size={20} className="chevron" />
                            )}
                          </button>
                          <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                            <div className="answer-content">
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={48} />
              <h3>No results found</h3>
              <p>Try adjusting your search terms or browse the categories above.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="support-section">
        <div className="container">
          <div className="support-content">
            <h2 className="support-title">Still need help?</h2>
            <p className="support-description">
              Can't find the answer you're looking for? Our support team is here to help you get the most out of Apix.
            </p>
            <div className="support-actions">
              <a href="/contact" className="btn btn-primary btn-large">
                <MessageCircle size={20} />
                Contact Support
              </a>
              <a href="/tester" className="btn btn-secondary btn-large">
                <HelpCircle size={20} />
                Try Apix Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
