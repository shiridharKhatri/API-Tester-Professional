"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, UserPlus, ArrowLeft, Check } from "lucide-react"
import "../../styles/auth.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getPasswordStrength = () => {
    const password = formData.password
    let strength = 0

    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    return strength
  }

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength()
    if (strength <= 2) return { text: "Weak", color: "red" }
    if (strength <= 3) return { text: "Fair", color: "orange" }
    if (strength <= 4) return { text: "Good", color: "blue" }
    return { text: "Strong", color: "green" }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful signup
      console.log("Signup successful:", formData)
      // Redirect to verification page or dashboard
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = getPasswordStrengthText()

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="auth-content">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <div className="auth-logo">
                <UserPlus size={32} />
              </div>
              <h1 className="auth-title">Create Your Account</h1>
              <p className="auth-description">Join Apix and start testing APIs like a professional</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {errors.submit && (
                <div className="error-message">
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`form-input ${errors.firstName ? "error" : ""}`}
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      autoComplete="given-name"
                    />
                  </div>
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`form-input ${errors.lastName ? "error" : ""}`}
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      autoComplete="family-name"
                    />
                  </div>
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className={`strength-fill strength-${passwordStrength.color}`}
                        style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`strength-text strength-${passwordStrength.color}`}>{passwordStrength.text}</span>
                  </div>
                )}
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>

              <div className="form-checkboxes">
                <label className={`checkbox-label ${errors.agreeToTerms ? "error" : ""}`}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    I agree to the{" "}
                    <Link to="/terms" className="auth-link">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="auth-link">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Subscribe to our newsletter for updates and tips</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="auth-side">
            <div className="auth-side-content">
              <h2 className="side-title">Why Choose Apix?</h2>
              <p className="side-description">
                Join thousands of developers who have revolutionized their API testing workflow with our advanced
                platform.
              </p>
              <ul className="side-features">
                <li>
                  <Check size={16} />
                  Intelligent media detection and extraction
                </li>
                <li>
                  <Check size={16} />
                  Real-time response analysis and debugging
                </li>
                <li>
                  <Check size={16} />
                  Bulk download capabilities for media files
                </li>
                <li>
                  <Check size={16} />
                  Enterprise-grade security and privacy
                </li>
                <li>
                  <Check size={16} />
                  Intuitive interface better than Postman
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
