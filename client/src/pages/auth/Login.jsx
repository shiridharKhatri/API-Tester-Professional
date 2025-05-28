"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft } from "lucide-react"
import "../../styles/auth.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
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

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful login
      console.log("Login successful:", formData)
      // Redirect to dashboard or previous page
    } catch (error) {
      setErrors({ submit: "Invalid email or password. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

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
                <LogIn size={32} />
              </div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-description">Sign in to your Apix account to continue testing APIs</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {errors.submit && (
                <div className="error-message">
                  <span>{errors.submit}</span>
                </div>
              )}

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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Don't have an account?{" "}
                <Link to="/signup" className="auth-link">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          <div className="auth-side">
            <div className="auth-side-content">
              <h2 className="side-title">Start Testing APIs Today</h2>
              <p className="side-description">
                Join thousands of developers who trust Apix for their API testing needs. Get started with our powerful
                features and intuitive interface.
              </p>
              <ul className="side-features">
                <li>✨ Intelligent media detection</li>
                <li>⚡ Lightning-fast response analysis</li>
                <li>🔒 Enterprise-grade security</li>
                <li>📊 Advanced debugging tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
