import React, { useState } from 'react';
import { X, User, ShieldCheck, ShoppingBag, LogOut, Settings, Eye, EyeOff } from 'lucide-react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('luxury.sleeper@somnus.com');
  const [name, setName] = useState('Alexander Vance');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login integration
    setName(provider === 'Google' ? 'Google Sleeper' : 'Facebook Sleeper');
    setEmail(`social.${provider.toLowerCase()}@sleepnest.com`);
    setIsLoggedIn(true);
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="profile-close-btn" onClick={onClose} aria-label="Close profile">
          <X size={20} />
        </button>

        {isLoggedIn ? (
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-avatar">
                <User size={32} />
              </div>
              <h3>Welcome back, {name}!</h3>
              <p>{email}</p>
              <span className="badge-member">Somnus Gold Tier</span>
            </div>

            <div className="profile-menu">
              <div className="menu-item-premium">
                <ShoppingBag size={18} />
                <div className="menu-text">
                  <h4>Order History</h4>
                  <p>Track, return or re-order items</p>
                </div>
                <span className="count-tag">2</span>
              </div>

              <div className="menu-item-premium">
                <ShieldCheck size={18} />
                <div className="menu-text">
                  <h4>Warranty & Support</h4>
                  <p>Register mattress warranty details</p>
                </div>
              </div>

              <div className="menu-item-premium">
                <Settings size={18} />
                <div className="menu-text">
                  <h4>Account Preferences</h4>
                  <p>Edit address, billing, & newsletter</p>
                </div>
              </div>
            </div>

            <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
              <LogOut size={16} />
              <span>Logout Account</span>
            </button>
          </div>
        ) : authMode === 'signin' ? (
          <div className="profile-login-form">
            <div className="login-header">
              <h3>Sign In</h3>
              <p>Access orders, exclusive offers, & sleep tips</p>
            </div>
            
            {/* Social Logins */}
            <div className="social-login-grid">
              <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')}>
                <svg viewBox="0 0 24 24" width="20" height="20" className="social-icon">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
              <button type="button" className="social-btn" onClick={() => handleSocialLogin('Facebook')}>
                <svg viewBox="0 0 24 24" width="20" height="20" className="social-icon">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="social-divider">
              <span>or sign in with email</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="name@email.com" 
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary login-submit-btn">
                Sign In to Somnus
              </button>
            </form>
            <p className="register-text">
              Don't have an account? <span onClick={() => setAuthMode('signup')}>Create one</span>
            </p>
          </div>
        ) : (
          <div className="profile-login-form">
            <div className="login-header">
              <h3>Create Account</h3>
              <p>Get access to order tracker, warranty & special pricing</p>
            </div>

            {/* Social Signups */}
            <div className="social-login-grid">
              <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')}>
                <svg viewBox="0 0 24 24" width="20" height="20" className="social-icon">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign up with Google</span>
              </button>
              <button type="button" className="social-btn" onClick={() => handleSocialLogin('Facebook')}>
                <svg viewBox="0 0 24 24" width="20" height="20" className="social-icon">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Sign up with Facebook</span>
              </button>
            </div>

            <div className="social-divider">
              <span>or sign up with email</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Your Full Name" 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="name@email.com" 
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    placeholder="Create password"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    placeholder="Confirm password"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary login-submit-btn">
                Create Account
              </button>
            </form>
            <p className="register-text">
              Already have an account? <span onClick={() => setAuthMode('signin')}>Sign In</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
