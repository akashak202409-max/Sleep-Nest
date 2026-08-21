import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

// Social icons as inline SVGs since lucide-react doesn't export social brand icons
const SocialIcons = {
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
};

const footerLinks = {
  'Sleep Products': [
    { label: 'Mattresses', path: '/mattress' },
    { label: 'Pillows', path: '/pillows' },
    { label: 'Mattress Protectors', path: '/mattress-protector' },
    { label: 'Bedsheets', path: '/bedsheets' },
    { label: 'Comforters', path: '/comforters' },
  ],
  'Company': [
    { label: 'About SleepNest', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Press', path: '/press' },
    { label: 'SleepNest Stores', path: '/stores' },
    { label: 'Our Materials', path: '/materials' },
  ],
  'Support': [
    { label: 'Help Center', path: '/help' },
    { label: 'Track Order', path: '/track-order' },
    { label: 'Returns & Refunds', path: '/returns' },
    { label: 'EMI Options', path: '/emi' },
    { label: 'Sleep Trial FAQ', path: '/sleep-trial' },
    { label: 'Warranty Claims', path: '/warranty' },
  ],
  'Legal': [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Accessibility', path: '/accessibility' },
  ],
};

const paymentMethods = ['Visa', 'Mastercard', 'UPI', 'NetBanking', 'EMI', 'COD'];

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Features Strip */}
      <div className="footer-features">
        <div className="container">
          <div className="footer-features-grid">
            {[
              { icon: '🛡️', title: '100-Night Trial', sub: 'Risk-free sleep trial' },
              { icon: '🏆', title: '10 Year Warranty', sub: 'Long-term guarantee' },
              { icon: '🚚', title: 'Free Delivery', sub: 'All over India' },
              { icon: '♻️', title: 'Eco-Friendly', sub: 'Sustainable materials' },
              { icon: '💎', title: 'Premium Quality', sub: 'Certified materials' },
              { icon: '🤝', title: 'Easy Returns', sub: 'Hassle-free process' },
            ].map((f) => (
              <div key={f.title} className="footer-feature">
                <span className="footer-feature-icon">{f.icon}</span>
                <div>
                  <p className="footer-feature-title">{f.title}</p>
                  <p className="footer-feature-sub">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={logoImg} alt="SleepNest Logo" className="footer-logo-img" />
              </Link>
              <p className="footer-desc">
                India's premium sleep & furniture brand. We believe quality sleep is the foundation of a great life. 
                Our products are designed to give you the best sleep of your life, backed by science and crafted with care.
              </p>
              <div className="footer-contact">
                <a href="tel:+917676761001" className="footer-contact-item">
                  <Phone size={14} />
                  <span>+91 7676 761 001</span>
                </a>
                <a href="mailto:support@sleepnest.in" className="footer-contact-item">
                  <Mail size={14} />
                  <span>support@sleepnest.in</span>
                </a>
                <div className="footer-contact-item">
                  <MapPin size={14} />
                  <span>12th Floor, Brigade Tower, Chennai 600001</span>
                </div>
              </div>
              {/* Social */}
              <div className="footer-social">
                {[
                  { Icon: SocialIcons.Facebook, href: '#', label: 'Facebook' },
                  { Icon: SocialIcons.Instagram, href: '#', label: 'Instagram' },
                  { Icon: SocialIcons.Twitter, href: '#', label: 'Twitter' },
                  { Icon: SocialIcons.Youtube, href: '#', label: 'YouTube' },
                  { Icon: SocialIcons.Linkedin, href: '#', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="social-link">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-col">
                <h4 className="footer-col-title">{title}</h4>
                <ul className="footer-col-links">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="footer-link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Downloads */}
      <div className="footer-app">
        <div className="container">
          <div className="footer-app-inner">
            <div className="footer-app-text">
              <p className="footer-app-title">Download the SleepNest App</p>
              <p className="footer-app-sub">Exclusive app-only deals and easy order tracking</p>
            </div>
            <div className="footer-app-badges">
              <a href="#" className="app-badge">
                <span>🍎</span>
                <div>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="app-badge">
                <span>▶️</span>
                <div>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
            {/* Payment Methods */}
            <div className="footer-payment">
              <p className="footer-payment-title">Accepted Payments</p>
              <div className="payment-badges">
                {paymentMethods.map((m) => (
                  <span key={m} className="payment-badge">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} SleepNest India Pvt. Ltd. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
