import React, { useState } from 'react';
import { X, User, ShieldCheck, ShoppingBag, LogOut, Settings } from 'lucide-react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState('luxury.sleeper@somnus.com');
  const [name, setName] = useState('Alexander Vance');

  if (!isOpen) return null;

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
        ) : (
          <div className="profile-login-form">
            <div className="login-header">
              <h3>Sign In</h3>
              <p>Access orders, exclusive offers, & sleep tips</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
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
                <input 
                  type="password" 
                  defaultValue="••••••••" 
                  required 
                />
              </div>

              <button type="submit" className="btn-primary login-submit-btn">
                Sign In to Somnus
              </button>
            </form>
            <p className="register-text">
              Don't have an account? <span onClick={() => setIsLoggedIn(true)}>Create one</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
