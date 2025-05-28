import { Rocket, Users, Target, Award, Heart, Code, Globe, Zap } from 'lucide-react'
import "../styles/about.css"

const About = () => {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Former API architect at major tech companies. Passionate about developer tools.",
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Full-stack engineer with expertise in API testing and automation.",
    },
    {
      name: "Mike Rodriguez",
      role: "UX Designer",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Design expert focused on creating intuitive developer experiences.",
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Product strategist with deep understanding of developer workflows.",
    },
  ]

  const values = [
    {
      icon: <Code className="value-icon" />,
      title: "Developer First",
      description: "Every feature is designed with developers in mind, prioritizing efficiency and ease of use.",
    },
    {
      icon: <Zap className="value-icon" />,
      title: "Performance",
      description: "Lightning-fast API testing with real-time feedback and minimal latency.",
    },
    {
      icon: <Globe className="value-icon" />,
      title: "Accessibility",
      description: "Making powerful API testing tools accessible to developers worldwide.",
    },
    {
      icon: <Heart className="value-icon" />,
      title: "Community",
      description: "Building a supportive community of developers who help each other succeed.",
    },
  ]

  const stats = [
    { icon: <Users />, value: "50,000+", label: "Active Users" },
    { icon: <Target />, value: "1M+", label: "API Tests Run" },
    { icon: <Globe />, value: "150+", label: "Countries" },
    { icon: <Award />, value: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="about-page page-content">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              About <span className="gradient-text">Apix</span>
            </h1>
            <p className="hero-description">
              We're on a mission to revolutionize API testing and make it accessible, powerful, and enjoyable for
              developers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title">Our Story</h2>
              <p className="story-text">
                Apix was born from frustration with existing API testing tools. As developers, we found ourselves
                constantly switching between multiple tools, dealing with complex interfaces, and missing crucial
                features like intelligent media detection.
              </p>
              <p className="story-text">
                We decided to build the API testing platform we always wanted - one that's intuitive, powerful, and
                designed specifically for modern development workflows. Today, Apix serves thousands of developers
                worldwide, from indie hackers to enterprise teams.
              </p>
              <div className="story-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    {stat.icon}
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="story-image">
              <img src="/placeholder.svg?height=400&width=600" alt="Team working on Apix" className="story-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">The principles that guide everything we do at Apix</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-wrapper">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">The passionate people behind Apix</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-icon">
              <Rocket size={48} />
            </div>
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-description">
              To empower developers with the most intuitive, powerful, and comprehensive API testing platform ever
              created. We believe that great tools should get out of your way and let you focus on building amazing
              products.
            </p>
            <div className="mission-actions">
              <a href="/tester" className="btn btn-primary btn-large">
                <Rocket size={20} />
                Try Apix Now
              </a>
              <a href="/contact" className="btn btn-secondary btn-large">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
