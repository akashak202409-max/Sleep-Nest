// SleepNest Header Component - Exact Wakefit layout mirrored
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { navLinks } from '../data/products';
import {
  Search, ShoppingCart, Heart, User, MapPin, Phone,
  ChevronDown, X, Menu, Zap, Tag, LogIn
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Header.css';

export default function Header() {
  const { cartCount, wishlist, searchQuery, selectedCity, dispatch, showToast } = useApp();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="announcement-bar">
        <div className="announcement-inner">
          {location.pathname === '/bedsheet' || location.pathname === '/bedsheets' ? (
            <>
              <span>🎁 Buy 2 Bedsheets, Get 1 Pillow Cover Free</span>
              <span className="ann-sep">|</span>
              <span>Free Delivery</span>
            </>
          ) : location.pathname === '/protector' || location.pathname === '/mattress-protector' || location.pathname === '/protectors' ? (
            <>
              <span>🛡️ Protect Your Mattress Investment</span>
              <span className="ann-sep">|</span>
              <span>Free Delivery on Orders Above ₹999</span>
            </>
          ) : location.pathname === '/comforter' || location.pathname === '/comforters' ? (
            <>
              <span>🍂 Winter Warmth Sale — Up to 40% Off Comforters</span>
              <span className="ann-sep">|</span>
              <span>Free Delivery</span>
            </>
          ) : location.pathname === '/pillow' || location.pathname === '/pillows' ? (
            <>
              <span>💆 Wake Up Pain-Free | Buy Any 2 Pillows, Save 20%</span>
            </>
          ) : (
            <>
              <span>🚚 Free Delivery + Setup</span>
              <span className="ann-sep">|</span>
              <span>100-Night Trial</span>
              <span className="ann-sep">|</span>
              <span>10-Year Warranty</span>
            </>
          )}
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Top Row */}
          <div className="header-top">
            {/* Left: Mobile Toggle + Logo */}
            <div className="logo-group">
              <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="logo-link">
                <div className="logo">
                  <img src={logoImg} alt="SleepNest Logo" className="header-logo-img" />
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <form className={`search-form ${searchFocus ? 'focused' : ''}`} onSubmit={handleSearch}>
              <button type="submit" className="search-icon-btn">
                <Search size={18} />
              </button>
              <input
                type="text"
                placeholder="Search for mattresses, beds, pillows, comforters..."
                value={searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                className="search-input"
              />
              {searchQuery && (
                <button type="button" className="search-clear" onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}>
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Right Actions */}
            <div className="header-actions">
              {/* City / Location */}
              <div className="city-selector-wrapper">
                <button className="action-btn text-link-btn" onClick={() => setCityOpen(!cityOpen)}>
                  <MapPin size={15} />
                  <span>{selectedCity || 'Chennai'}</span>
                  <ChevronDown size={12} />
                </button>
                {cityOpen && (
                  <div className="city-dropdown-menu">
                    <div className="city-dropdown-title">Select City</div>
                    {['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata'].map((city) => (
                      <button
                        key={city}
                        className={`city-option ${selectedCity === city ? 'active' : ''}`}
                        onClick={() => {
                          dispatch({ type: 'SET_CITY', payload: city });
                          setCityOpen(false);
                          showToast(`Location updated to ${city}`);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Support */}
              <a href="tel:+917676761001" className="action-btn icon-btn" title="Support">
                <Phone size={19} />
              </a>

              {/* Wishlist */}
              <Link to="/wishlist" className="action-btn icon-btn" title="Wishlist">
                <div className="icon-wrapper">
                  <Heart size={19} />
                  {wishlist.length > 0 && (
                    <span className="badge-dot">{wishlist.length}</span>
                  )}
                </div>
              </Link>

              {/* Account */}
              <Link to="/account" className="action-btn icon-btn" title="Account">
                <User size={19} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="action-btn cart-pill-btn">
                <ShoppingCart size={19} />
                <span className="cart-badge-val">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Row - Full Width Dark Navy Bar */}
        <nav className="site-nav" ref={menuRef}>
          <div className="nav-inner">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className={`nav-item ${activeMenu === link.label ? 'active' : ''}`}
                onMouseEnter={() => link.megaMenu && setActiveMenu(link.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link to={link.path} className="nav-link">
                  <span>{link.label}</span>
                </Link>

                {/* Mega Menu */}
                {link.megaMenu && activeMenu === link.label && (
                  <div className="mega-menu">
                    <div className="mega-menu-inner">
                      {link.megaMenu.map((section) => (
                        <div key={section.heading} className="mega-col">
                          <h4 className="mega-heading">{section.heading}</h4>
                          <ul className="mega-links">
                            {(section.items || section.links || []).map((item) => {
                              const label = typeof item === 'string' ? item : item.label;
                              const targetPath = typeof item === 'string' ? `${link.path}?filter=${encodeURIComponent(item)}` : item.path;
                              return (
                                <li key={label}>
                                  <Link to={targetPath} className="mega-link" onClick={() => setActiveMenu(null)}>{label}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}

                      {/* Mega Menu Featured Card */}
                      <div className="mega-promo">
                        <div className="mega-promo-inner">
                          <span className="mega-promo-badge">Up to 55% OFF</span>
                          <p className="mega-promo-title">{link.label} Sale</p>
                          <p className="mega-promo-sub">Starting ₹{link.label === 'Mattress' ? '6,999' : '12,999'}</p>
                          <Link to={link.path} className="btn btn-gold btn-sm">Shop Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-header">
              <Link to="/" onClick={() => setMobileOpen(false)} className="logo-link">
                <img src={logoImg} alt="SleepNest Logo" className="header-logo-img mobile" />
              </Link>
              <button onClick={() => setMobileOpen(false)}><X size={24} /></button>
            </div>

            <div className="mobile-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              />
            </div>

            <div className="mobile-nav">
              {navLinks.map((link) => (
                <div key={link.label} className="mobile-nav-item">
                  <button
                    className="mobile-nav-btn"
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                  >
                    <span>{link.label}</span>
                    {link.megaMenu && <ChevronDown size={16} className={mobileExpanded === link.label ? 'rotated' : ''} />}
                  </button>
                  {link.megaMenu && mobileExpanded === link.label && (
                    <div className="mobile-submenu">
                      {link.megaMenu.map((section) => (
                        <div key={section.heading}>
                          <p className="mobile-sub-heading">{section.heading}</p>
                          {section.links.map((l) => (
                            <Link key={l.label} to={l.path} className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mobile-footer">
              <Link to="/account" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                <LogIn size={16} /> Login / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
