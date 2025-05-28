"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react"
import "../../styles/auth.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSubmitted(true)
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) {
      setError("")
    }
  }

  if (isSubmitted) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/login" className="back-link">
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>

          <div className="auth-content single-column">
            <div className="auth-form-container">
              <div className="auth-form-header">
                <div className="auth-logo success">
                  <CheckCircle size={32} />
                </div>
                <h1 className="auth-title">Check Your Email</h1>
                <p className="auth-description">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>

              <div className="success-content">
                <div className="success-instructions">
                  <h3>What's next?</h3>
                  <ol>
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the reset link in the email</li>
                    <li>Create a new password</li>
                    <li>Sign in with your new password</li>
                  </ol>
                </div>

                <div className="success-actions">
                  <Link to="/login" className="btn btn-primary btn-large">
                    Back to Login
                  </Link>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setEmail("")
                    }}
                    className="btn btn-secondary btn-large"
                  >
                    Try Different Email
                  </button>
                </div>

                <div className="help-text">
                  <p>
                    Didn't receive the email? Check your spam folder or{" "}
                    <Link to="/contact" className="auth-link">
                      contact support
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/login" className="back-link">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>

        <div className="auth-content single-column">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <div className="auth-logo">
                <Mail size={32} />
              </div>
              <h1 className="auth-title">Reset Your Password</h1>
              <p className="auth-description">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="error-message">
                  <span>{error}</span>
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
                    className={`form-input ${error ? "error" : ""}`}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Remember your password?{" "}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
              <p className="auth-footer-text">
                Don't have an account?{" "}
                <Link to="/signup" className="auth-link">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
