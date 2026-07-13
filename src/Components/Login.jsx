import React from 'react'

export default function Login() {
  return (
    <div>
       <div className="d-flex justify-content-center align-items-center w-100 px-3">
    <div className="login-card">

      <div className="trust-badge">
        <svg viewBox="0 0 24 24"><path d="M12 1l9 4v6c0 5.25-3.84 10.15-9 11.35C6.84 21.15 3 16.25 3 11V5l9-4z"/></svg>
        SSL secured
      </div>

      <h1 className="login-title">Welcome back</h1>
      <p className="login-sub">Sign in to your dashboard to continue.</p>

      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email" id="email" className="form-control" placeholder="you@company.com" autocomplete="email"/>
      </div>

      <div className="mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <label for="password" className="form-label mb-0">Password</label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
        <div className="pw-wrap mt-1">
          <input type="password" id="password" className="form-control" placeholder="Enter your password" autocomplete="current-password"/>
          <button type="button" className="pw-toggle" id="pwToggle" aria-label="Toggle password visibility">
            <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="form-check mb-4 mt-3">
        <input className="form-check-input" type="checkbox" id="remember"/>
        <label className="form-check-label ms-1" for="remember">Keep me signed in for 30 days</label>
      </div>

      

    </div>
  </div>
    </div>
  )
}
