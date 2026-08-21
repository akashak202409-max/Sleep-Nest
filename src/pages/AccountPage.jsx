// Account Page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, LogOut, ChevronRight, Eye, EyeOff, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './AccountPage.css';

const tabs = [
  { id: 'login', label: 'Login', Icon: User },
];

const accountMenu = [
  { id: 'orders', label: 'My Orders', Icon: Package },
  { id: 'wishlist', label: 'Wishlist', Icon: Heart, path: '/wishlist' },
  { id: 'addresses', label: 'Addresses', Icon: MapPin },
  { id: 'payments', label: 'Payment Methods', Icon: CreditCard },
];

export default function AccountPage() {
  const { user, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' });

  const handleAuth = (e) => {
    e.preventDefault();
    const mockUser = { name: form.name || 'Valued Customer', email: form.email, phone: form.phone };
    dispatch({ type: 'SET_USER', payload: mockUser });
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  if (user) {
    return (
      <div className="account-page">
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <aside className="account-sidebar">
              <div className="account-profile">
                <div className="account-avatar">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="account-name">{user.name}</p>
                  <p className="account-email">{user.email}</p>
                </div>
              </div>
              <nav className="account-nav">
                {accountMenu.map(({ id, label, Icon, path }) => (
                  path ? (
                    <Link key={id} to={path} className="account-nav-item">
                      <Icon size={18} />
                      <span>{label}</span>
                      <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                    </Link>
                  ) : (
                    <button
                      key={id}
                      className={`account-nav-item ${activeTab === id ? 'active' : ''}`}
                      onClick={() => setActiveTab(id)}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                      <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                    </button>
                  )
                ))}
                <button className="account-nav-item account-logout" onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="account-content">
              {activeTab === 'orders' && (
                <div className="account-section">
                  <h2 className="account-section-title">My Orders</h2>
                  <div className="orders-empty">
                    <Package size={48} strokeWidth={1} style={{ color: 'var(--gray-200)' }} />
                    <h3>No orders yet</h3>
                    <p>Your orders will appear here after you make a purchase.</p>
                    <Link to="/" className="btn btn-primary">Start Shopping <ChevronRight size={16} /></Link>
                  </div>
                </div>
              )}
              {activeTab === 'addresses' && (
                <div className="account-section">
                  <h2 className="account-section-title">My Addresses</h2>
                  <div className="orders-empty">
                    <MapPin size={48} strokeWidth={1} style={{ color: 'var(--gray-200)' }} />
                    <h3>No addresses saved</h3>
                    <p>Add delivery addresses for faster checkout.</p>
                    <button className="btn btn-primary">+ Add Address</button>
                  </div>
                </div>
              )}
              {activeTab === 'payments' && (
                <div className="account-section">
                  <h2 className="account-section-title">Payment Methods</h2>
                  <div className="orders-empty">
                    <CreditCard size={48} strokeWidth={1} style={{ color: 'var(--gray-200)' }} />
                    <h3>No saved cards</h3>
                    <p>Save your card for faster payments next time.</p>
                    <button className="btn btn-primary">+ Add Card</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page account-auth-page">
      <div className="container">
        <div className="auth-container">
          {/* Left: Brand */}
          <div className="auth-brand">
            <div className="auth-brand-inner">
              <h1 className="auth-brand-name">SleepNest</h1>
              <p className="auth-brand-tagline">Sleep Better. Live Better.</p>
              <div className="auth-benefits">
                {[
                  '✓ Track your orders in real-time',
                  '✓ Save addresses for faster checkout',
                  '✓ Exclusive member discounts',
                  '✓ 100-night trial & easy returns',
                ].map((b) => (
                  <p key={b} className="auth-benefit">{b}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="auth-form-card">
            <div className="auth-tabs">
              <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
              <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Register</button>
            </div>

            <form onSubmit={handleAuth} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {isLogin && (
                  <button type="button" style={{ display: 'block', marginTop: 6, fontSize: 12, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                    Forgot password?
                  </button>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                {isLogin ? 'Login' : 'Create Account'}
              </button>

              <div className="auth-divider"><span>or continue with</span></div>

              <div className="auth-social">
                <button type="button" className="auth-social-btn">
                  <span>🇬</span> Google
                </button>
                <button type="button" className="auth-social-btn">
                  <span>📱</span> OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
