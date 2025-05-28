"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll } from "framer-motion"
import {
  Rocket,
  Zap,
  Shield,
  Code,
  Download,
  Play,
  CheckCircle,
  ArrowRight,
  Send,
  BarChart3,
  Brain,
  ImageIcon,
  LinkIcon,
  FileCode,
  Users,
  Target,
  Star,
  Smartphone,
  Monitor,
  Database,
  Settings,
  Activity,
  Quote,
  Globe,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import "../styles/landing.css"

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const workflowRef = useRef(null)

 

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const features = [
    {
      icon: <Send />,
      title: "Smart API Testing",
      description: "Send HTTP requests with intelligent response analysis and real-time debugging capabilities.",
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      iconBg: "from-violet-400 to-purple-600",
      glowColor: "violet",
    },
    {
      icon: <Brain />,
      title: "AI-Powered Detection",
      description: "Automatically detect and extract media files, links, and structured data from API responses.",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      iconBg: "from-pink-400 to-rose-600",
      glowColor: "pink",
    },
    {
      icon: <Download />,
      title: "Bulk Operations",
      description: "Download all detected media files as organized ZIP archives with one click.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      iconBg: "from-emerald-400 to-teal-600",
      glowColor: "emerald",
    },
    {
      icon: <Shield />,
      title: "Enterprise Security",
      description: "Bank-grade security with encrypted requests and industry-standard data protection.",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      iconBg: "from-orange-400 to-amber-600",
      glowColor: "orange",
    },
    {
      icon: <BarChart3 />,
      title: "Performance Insights",
      description: "Comprehensive metrics, response time analysis, and debugging tools for optimization.",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      iconBg: "from-blue-400 to-indigo-600",
      glowColor: "blue",
    },
    {
      icon: <Code />,
      title: "Developer Friendly",
      description: "Intuitive interface with syntax highlighting, code generation, and export capabilities.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      iconBg: "from-green-400 to-emerald-600",
      glowColor: "green",
    },
  ]

  const stats = [
    {
      value: "50K+",
      label: "Active Developers",
      icon: <Users />,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "from-blue-400 to-cyan-600",
    },
    {
      value: "1M+",
      label: "API Tests Run",
      icon: <Activity />,
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "from-emerald-400 to-teal-600",
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      icon: <Target />,
      gradient: "from-purple-500 to-violet-500",
      iconBg: "from-purple-400 to-violet-600",
    },
    {
      value: "4.9/5",
      label: "User Rating",
      icon: <Star />,
      gradient: "from-amber-500 to-orange-500",
      iconBg: "from-amber-400 to-orange-600",
    },
  ]

  const platforms = [
    {
      icon: <Monitor />,
      title: "Web Application",
      description: "Full-featured browser-based testing suite with advanced capabilities",
      gradient: "from-blue-500 to-indigo-600",
      iconBg: "from-blue-400 to-indigo-600",
      glowColor: "blue",
    },
    {
      icon: <Smartphone />,
      title: "Mobile Optimized",
      description: "Responsive design for seamless testing on any device, anywhere",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "from-emerald-400 to-teal-600",
      glowColor: "emerald",
    },
    {
      icon: <Database />,
      title: "API Integration",
      description: "Programmatic access via comprehensive REST API with full documentation",
      gradient: "from-purple-500 to-violet-600",
      iconBg: "from-purple-400 to-violet-600",
      glowColor: "purple",
    },
  ]

  const workflow = [
    {
      step: "01",
      title: "Configure Request",
      description:
        "Set up your API endpoint, headers, and parameters with our intuitive drag-and-drop interface. Support for all HTTP methods and authentication types.",
      icon: <Settings />,
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      iconBg: "from-violet-400 to-purple-600",
      glowColor: "violet",
      features: ["All HTTP Methods", "Custom Headers", "Authentication", "Request Body"],
    },
    {
      step: "02",
      title: "Send & Analyze",
      description:
        "Execute requests instantly and get real-time analysis with AI-powered content detection. View formatted responses with syntax highlighting.",
      icon: <Send />,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      iconBg: "from-pink-400 to-rose-600",
      glowColor: "pink",
      features: ["Real-time Analysis", "AI Detection", "Syntax Highlighting", "Response Metrics"],
    },
    {
      step: "03",
      title: "Extract & Download",
      description:
        "Automatically extract media files, links, and structured data. Download everything in organized ZIP files or export in multiple formats.",
      icon: <Download />,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      iconBg: "from-emerald-400 to-teal-600",
      glowColor: "emerald",
      features: ["Auto Extraction", "ZIP Downloads", "Multiple Formats", "Organized Files"],
    },
  ]

  const testimonials = [
    {
      quote:
        "Apix has revolutionized our API testing workflow. The intelligent media detection saves us hours every day.",
      author: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      avatar: "SC",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      quote: "The best API testing tool I've ever used. Clean interface, powerful features, and excellent performance.",
      author: "Mike Rodriguez",
      role: "DevOps Engineer",
      company: "StartupXYZ",
      avatar: "MR",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      quote: "Enterprise-grade security with developer-friendly features. Perfect for our team's needs.",
      author: "Emily Johnson",
      role: "Tech Lead",
      company: "Enterprise Inc",
      avatar: "EJ",
      gradient: "from-emerald-500 to-teal-600",
    },
  ]

  return (
    <div className="landing-page">
      {/* Mouse Follower */}
      <motion.div
        className="mouse-follower"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg-effects">
          <motion.div
            className="hero-gradient-orb hero-orb-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="hero-gradient-orb hero-orb-2"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="hero-gradient-orb hero-orb-3"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <motion.div className="hero-text" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div className="hero-badge" variants={staggerItem}>
                <motion.div
                  className="badge-icon"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Zap size={16} />
                </motion.div>
                Professional API Testing Platform
                <motion.div
                  className="badge-sparkle"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles size={12} />
                </motion.div>
              </motion.div>

              <motion.h1 className="hero-title" variants={staggerItem}>
                Test APIs Like a <span className="hero-highlight">Professional</span>
              </motion.h1>

              <motion.p className="hero-description" variants={staggerItem}>
                The most advanced API testing platform with intelligent media detection, real-time analysis, and
                enterprise-grade security. Built for developers who demand excellence.
              </motion.p>

              <motion.div className="hero-actions" variants={staggerItem}>
                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/tester" className="btn btn-primary btn-large hero-btn-primary">
                    <Rocket size={20} />
                    Start Testing Free
                    <div className="btn-glow"></div>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/about" className="btn btn-secondary btn-large hero-btn-secondary">
                    <Play size={20} />
                    Watch Demo
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div className="hero-stats" variants={staggerItem}>
                <div className="hero-stat">
                  <CheckCircle size={16} />
                  No credit card required
                </div>
                <div className="hero-stat">
                  <CheckCircle size={16} />
                  Free forever plan
                </div>
                <div className="hero-stat">
                  <CheckCircle size={16} />
                  Cancel anytime
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="hero-demo" initial="hidden" animate="visible" variants={fadeInRight}>
              <motion.div
                className="api-demo-container"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="demo-header">
                  <div className="demo-dots">
                    <motion.div
                      className="demo-dot red"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    />
                    <motion.div
                      className="demo-dot yellow"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                    <motion.div
                      className="demo-dot green"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    />
                  </div>
                  <div className="demo-title">API Tester - Apix</div>
                </div>
                <div className="demo-content">
                  <div className="demo-request">
                    <div className="demo-method">
                      <motion.div
                        className="method-badge"
                        animate={{
                          boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.4)", "0 0 0 10px rgba(16, 185, 129, 0)"],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        GET
                      </motion.div>
                      <span>API Request</span>
                    </div>
                    <div className="demo-url">https://api.unsplash.com/photos/featured</div>
                  </div>
                  <div className="demo-response">
                    <div className="response-status">
                      <div className="status-code">200 OK</div>
                      <div className="response-time">142ms</div>
                    </div>
                    <div className="response-preview">
                      <div>{"{"}</div>
                      <div>
                        {" "}
                        <span className="json-key">"id"</span>: <span className="json-string">"abc123"</span>,
                      </div>
                      <div>
                        {" "}
                        <span className="json-key">"urls"</span>: {"{"}
                      </div>
                      <div>
                        {" "}
                        <span className="json-key">"regular"</span>: <span className="json-string">"https://..."</span>
                      </div>
                      <div> {"}"},</div>
                      <div>
                        {" "}
                        <span className="json-key">"likes"</span>: <span className="json-number">1247</span>
                      </div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="stats-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div className="stats-grid" variants={staggerContainer}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                variants={staggerItem}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className={`stat-icon bg-gradient-to-r ${stat.iconBg}`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {stat.icon}
                  <div className="icon-glow"></div>
                </motion.div>
                <motion.div
                  className="stat-value"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        ref={featuresRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div className="features-header" variants={staggerContainer}>
            <motion.div className="section-badge" variants={staggerItem}>
              <Sparkles size={16} />
              Features
            </motion.div>
            <motion.h2 className="features-title" variants={staggerItem}>
              Powerful Features for Modern APIs
            </motion.h2>
            <motion.p className="features-description" variants={staggerItem}>
              Everything you need to test, analyze, and debug APIs with unprecedented efficiency and precision
            </motion.p>
          </motion.div>

          <motion.div className="features-grid" variants={staggerContainer}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={staggerItem}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className={`feature-icon bg-gradient-to-r ${feature.iconBg}`}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                  }}
                >
                  {feature.icon}
                  <div className={`icon-glow glow-${feature.glowColor}`}></div>
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-card-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section
        className="workflow-section"
        ref={workflowRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="workflow-bg">
          <motion.div
            className="workflow-gradient-orb workflow-orb-1"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="workflow-gradient-orb workflow-orb-2"
            animate={{
              x: [0, -40, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>
        <div className="container">
          <motion.div className="workflow-header" variants={staggerContainer}>
            <motion.div className="section-badge" variants={staggerItem}>
              <TrendingUp size={16} />
              How It Works
            </motion.div>
            <motion.h2 className="section-title" variants={staggerItem}>
              Simple, Powerful Workflow
            </motion.h2>
            <motion.p className="section-description" variants={staggerItem}>
              From API request to organized results in three simple steps. Experience the future of API testing.
            </motion.p>
          </motion.div>

          <motion.div className="workflow-container" variants={staggerContainer}>
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                className="workflow-step-card"
                variants={staggerItem}
                whileHover={{
                  y: -20,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="workflow-step-header">
                  <motion.div
                    className="workflow-step-number"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div
                    className={`workflow-step-icon bg-gradient-to-r ${step.iconBg}`}
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                  >
                    {step.icon}
                    <div className={`icon-glow glow-${step.glowColor}`}></div>
                  </motion.div>
                </div>
                <div className="workflow-step-content">
                  <h3 className="workflow-step-title">{step.title}</h3>
                  <p className="workflow-step-description">{step.description}</p>
                  <div className="workflow-features">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="workflow-feature"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle size={14} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {index < workflow.length - 1 && (
                  <div className="workflow-connector">
                    <div className="connector-line"></div>
                    <motion.div
                      className="connector-arrow"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                )}
                <div className="workflow-card-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Demo Section */}
      <motion.section
        className="demo-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <div className="demo-showcase">
            <motion.div className="demo-text" variants={fadeInLeft}>
              <motion.div className="section-badge" variants={staggerItem}>
                <Activity size={16} />
                Live Demo
              </motion.div>
              <motion.h2 className="section-title" variants={staggerItem}>
                See Intelligent Detection in Action
              </motion.h2>
              <motion.p className="section-description" variants={staggerItem}>
                Watch how Apix automatically detects and organizes media files, links, and structured data from your API
                responses in real-time.
              </motion.p>
              <motion.div variants={staggerItem}>
                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/tester" className="btn btn-primary demo-btn">
                    <Send size={20} />
                    Try It Now
                    <ArrowRight size={16} />
                    <div className="btn-glow"></div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="demo-visual" variants={fadeInRight}>
              <motion.div
                className="demo-window"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="demo-tabs">
                  <div className="demo-tab active">
                    <BarChart3 size={16} />
                    Response
                  </div>
                  <div className="demo-tab">
                    <ImageIcon size={16} />
                    Media
                  </div>
                  <div className="demo-tab">
                    <LinkIcon size={16} />
                    Links
                  </div>
                </div>
                <div className="demo-body">
                  <motion.div
                    className="demo-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div className="demo-item" variants={staggerItem}>
                      <div className="demo-item-icon">
                        <ImageIcon />
                      </div>
                      <div className="demo-item-title">Images</div>
                      <div className="demo-item-count">12 detected</div>
                    </motion.div>
                    <motion.div className="demo-item" variants={staggerItem}>
                      <div className="demo-item-icon">
                        <LinkIcon />
                      </div>
                      <div className="demo-item-title">Links</div>
                      <div className="demo-item-count">8 found</div>
                    </motion.div>
                    <motion.div className="demo-item" variants={staggerItem}>
                      <div className="demo-item-icon">
                        <FileCode />
                      </div>
                      <div className="demo-item-title">JSON</div>
                      <div className="demo-item-count">Formatted</div>
                    </motion.div>
                  </motion.div>
                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="btn btn-outline btn-small">
                      <Download size={16} />
                      Download All Media
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Platforms Section */}
      <motion.section
        className="platforms-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div className="platforms-header" variants={staggerContainer}>
            <motion.div className="section-badge" variants={staggerItem}>
              <Globe size={16} />
              Platforms
            </motion.div>
            <motion.h2 className="section-title" variants={staggerItem}>
              Available Everywhere
            </motion.h2>
            <motion.p className="section-description" variants={staggerItem}>
              Access Apix on any device, anywhere, anytime with our responsive design and cross-platform compatibility
            </motion.p>
          </motion.div>

          <motion.div className="platforms-grid" variants={staggerContainer}>
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                className="platform-card"
                variants={staggerItem}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className={`platform-icon bg-gradient-to-r ${platform.iconBg}`}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.4,
                  }}
                >
                  {platform.icon}
                  <div className={`icon-glow glow-${platform.glowColor}`}></div>
                </motion.div>
                <h3 className="platform-title">{platform.title}</h3>
                <p className="platform-description">{platform.description}</p>
                <div className="platform-card-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div className="testimonials-header" variants={staggerContainer}>
            <motion.div className="section-badge" variants={staggerItem}>
              <Star size={16} />
              Testimonials
            </motion.div>
            <motion.h2 className="section-title" variants={staggerItem}>
              Loved by Developers Worldwide
            </motion.h2>
            <motion.p className="section-description" variants={staggerItem}>
              See what developers are saying about their experience with Apix
            </motion.p>
          </motion.div>

          <motion.div className="testimonials-grid" variants={staggerContainer}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                variants={staggerItem}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="testimonial-quote"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  <Quote size={24} />
                </motion.div>
                <p className="testimonial-text">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <motion.div
                    className={`author-avatar bg-gradient-to-r ${testimonial.gradient}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="cta-bg-effects">
          <motion.div
            className="cta-gradient-orb cta-orb-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="cta-gradient-orb cta-orb-2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="cta-gradient-orb cta-orb-3"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>
        <div className="container">
          <motion.div className="cta-content" variants={staggerContainer}>
            <motion.div
              className="cta-icon"
              variants={scaleIn}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Rocket size={32} />
              <div className="cta-icon-glow"></div>
            </motion.div>

            <motion.h2 className="cta-title" variants={staggerItem}>
              Ready to Transform Your API Testing?
            </motion.h2>

            <motion.p className="cta-description" variants={staggerItem}>
              Join thousands of developers who trust Apix for their API testing needs. Start your free trial today and
              experience the difference.
            </motion.p>

            <motion.div className="cta-actions" variants={staggerItem}>
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/tester" className="btn btn-white btn-large cta-btn-primary">
                  <Rocket size={20} />
                  Start Testing Free
                  <div className="btn-glow"></div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/pricing" className="btn btn-outline-white btn-large">
                  View Pricing
                </Link>
              </motion.div>
            </motion.div>

            <motion.div className="cta-features" variants={staggerItem}>
              <div className="cta-feature">
                <CheckCircle size={16} />
                No credit card required
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                Free forever plan
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default LandingPage
