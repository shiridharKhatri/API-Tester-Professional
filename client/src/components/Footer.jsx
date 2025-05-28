import { Link } from "react-router-dom"
import { Rocket, Github, Twitter, Linkedin, Mail, Heart, Code, Zap, Shield } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "API Tester", href: "/tester" },
      { name: "Features", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "Documentation", href: "/docs" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Blog", href: "/blog" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
    social: [
      { name: "GitHub", href: "https://github.com", icon: Github },
      { name: "Twitter", href: "https://twitter.com", icon: Twitter },
      { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
      { name: "Email", href: "mailto:hello@apix.dev", icon: Mail },
    ],
  }

  const features = [
    { icon: Code, text: "Developer First" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Shield, text: "Enterprise Security" },
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          {/* Main Footer Content */}
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <Rocket className="footer-logo-icon" />
                <span className="footer-logo-text">Apix</span>
              </Link>
              <p className="footer-description">
                The most advanced API testing platform with intelligent media detection, real-time analysis, and
                enterprise-grade security.
              </p>
              <div className="footer-features">
                {features.map((feature, index) => (
                  <div key={index} className="footer-feature">
                    <feature.icon size={16} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="footer-links">
              <div className="footer-section">
                <h3 className="footer-section-title">Product</h3>
                <ul className="footer-section-links">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-section-title">Company</h3>
                <ul className="footer-section-links">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-section-title">Legal</h3>
                <ul className="footer-section-links">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-section-title">Connect</h3>
                <div className="footer-social">
                  {footerLinks.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="footer-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
                <div className="footer-newsletter">
                  <h4 className="newsletter-title">Stay Updated</h4>
                  <p className="newsletter-description">Get the latest updates and tips</p>
                  <div className="newsletter-form">
                    <input type="email" placeholder="Enter your email" className="newsletter-input" />
                    <button className="newsletter-button">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © {currentYear} Apix. All rights reserved. Made with <Heart size={14} className="footer-heart" /> for
                developers.
              </p>
              <div className="footer-bottom-links">
                <span className="footer-status">
                  <span className="status-indicator"></span>
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
