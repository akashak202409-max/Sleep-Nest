import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShowcaseGrid from './components/ShowcaseGrid';
import B2BSection from './components/B2BSection';
import BankOffers from './components/BankOffers';
import TestimonialsVideo from './components/TestimonialsVideo';
import MattressPage from './components/MattressPage';
import PillowsPage from './components/PillowsPage';
import ProtectorsPage from './components/ProtectorsPage';
import SheetsPage from './components/SheetsPage';
import ComfortersPage from './components/ComfortersPage';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProfileModal from './components/ProfileModal';
import ProductDetailPage from './components/ProductDetailPage';
import PaymentPage from './components/PaymentPage';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Truck, Flame } from 'lucide-react';
import logo from './assets/logo.png';
import {
  activeBounce,
  coolingGel,
  dualComfort,
  ecoCoir,
  hybridLuxe,
  latexPillow,
  latexSupport,
  organicLatex,
  smartgridElite,
  cottonSheets,
  satinSheets,
  cottonFabric,
  satinFabric,
  luxuryMattressVideo2,
  bambooProtector,
  tencelProtector
} from './assets/images';
import './App.css';

// Rich Mock Product Database
const PRODUCT_DATA = [
  {
    id: 1,
    name: "The Somnus Hybrid Luxe",
    category: "Mattresses",
    price: 1499,
    originalPrice: 1799,
    rating: 4.9,
    reviews: 328,
    badge: "Best Seller",
    image: hybridLuxe
  },
  {
    id: 2,
    name: "Classic Latex Support",
    category: "Mattresses",
    price: 1199,
    rating: 4.8,
    reviews: 142,
    badge: "Eco-Friendly",
    image: latexSupport
  },
  {
    id: 3,
    name: "Essential Memory Comfort",
    category: "Mattresses",
    price: 899,
    originalPrice: 999,
    rating: 4.7,
    reviews: 94,
    badge: "Great Value",
    image: dualComfort
  },
  {
    id: 4,
    name: "Bamboo Waterproof Guard",
    category: "Protectors",
    price: 89,
    rating: 4.9,
    reviews: 412,
    badge: "Organic",
    image: bambooProtector
  },
  {
    id: 5,
    name: "Cooling Microfiber Protector",
    category: "Protectors",
    price: 69,
    originalPrice: 79,
    rating: 4.6,
    reviews: 87,
    badge: "Cooling Tech",
    image: tencelProtector
  },
  {
    id: 6,
    name: "Artisan Silk-Blend Sheet Set",
    category: "Bed Sheets",
    price: 189,
    rating: 4.9,
    reviews: 219,
    badge: "Pure Luxury",
    image: satinSheets,
    fabricImage: satinFabric,
    video: luxuryMattressVideo2
  },
  {
    id: 7,
    name: "Organic Egyptian Cotton Sheets",
    category: "Bed Sheets",
    price: 149,
    originalPrice: 169,
    rating: 4.8,
    reviews: 154,
    badge: "1000 Thread Count",
    image: cottonSheets,
    fabricImage: cottonFabric,
    video: luxuryMattressVideo2
  },
  {
    id: 8,
    name: "All-Season Down Comforter",
    category: "Comforters",
    price: 249,
    rating: 4.8,
    reviews: 98,
    badge: "Warm & Cozy",
    image: activeBounce
  },
  {
    id: 9,
    name: "Cloud-Fill Hypoallergenic Duvet",
    category: "Comforters",
    price: 179,
    originalPrice: 199,
    rating: 4.7,
    reviews: 63,
    badge: "Hypoallergenic",
    image: dualComfort
  },
  {
    id: 10,
    name: "Dual-Zone Contour Gel Pillow",
    category: "Pillows",
    price: 99,
    rating: 4.9,
    reviews: 580,
    badge: "Ergonomic Support",
    image: coolingGel
  },
  {
    id: 11,
    name: "Premium Shredded Memory Foam Pillow",
    category: "Pillows",
    price: 79,
    originalPrice: 89,
    rating: 4.7,
    reviews: 134,
    badge: "Adjustable Loft",
    image: latexSupport
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState(false);
  
  const shopRef = useRef(null);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the drawer so the user sees feedback immediately
  };

  const handleUpdateQuantity = (id, newQty) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const scrollToShop = () => {
    if (shopRef.current) {
      shopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = selectedCategory 
    ? PRODUCT_DATA.filter((p) => p.category === selectedCategory)
    : PRODUCT_DATA;

  return (
    <div className="app-container">
      {/* Dynamic Navigation */}
      <Navbar 
        cartCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onShopClick={scrollToShop}
        onCategoryClick={(cat) => {
          const categoryMap = {
            "Bedsheets": "Bed Sheets",
            "Protector": "Protectors",
            "Comforter": "Comforters"
          };
          setSelectedCategory(categoryMap[cat] || cat);
          setSelectedProduct(null);
          setCheckoutMode(false);
          scrollToShop();
        }}
        activeCategory={selectedCategory}
      />

      {checkoutMode ? (
        <PaymentPage 
          cartItems={cart} 
          onBack={() => setCheckoutMode(false)} 
          onClearCart={() => setCart([])} 
        />
      ) : selectedProduct ? (
        <ProductDetailPage 
          product={selectedProduct} 
          onAddToCart={handleAddToCart} 
          onBack={() => setSelectedProduct(null)} 
        />
      ) : selectedCategory === "Mattresses" ? (
        <MattressPage onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
      ) : selectedCategory === "Pillows" ? (
        <PillowsPage onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
      ) : selectedCategory === "Protectors" ? (
        <ProtectorsPage onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
      ) : selectedCategory === "Bed Sheets" ? (
        <SheetsPage onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
      ) : selectedCategory === "Comforters" ? (
        <ComfortersPage onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
      ) : (
        <>
          {/* Hero section */}
          <Hero onShopClick={scrollToShop} />

          {/* Flash Sale Banner below Hero Carousel */}
          <section className="flash-sale-banner-full">
            <div className="flash-sale-container">
              <div className="flash-sale-title-box">
                <Flame size={32} className="flash-sale-fire" />
                <div>
                  <span className="flash-sale-tag">LIMITED PERIOD OFFER</span>
                  <h2>MIDNIGHT FLASH SALE</h2>
                </div>
              </div>
              <div className="flash-sale-timer-box">
                <div className="timer-unit"><strong>04</strong><span>Hours</span></div>
                <div className="timer-unit"><strong>29</strong><span>Mins</span></div>
                <div className="timer-unit"><strong>58</strong><span>Secs</span></div>
              </div>
              <button className="btn-accent" onClick={scrollToShop}>
                Grab Deal Now
              </button>
            </div>
          </section>

          {/* Shopping Showcase / Catalog */}
          <main className="catalog-section" ref={shopRef}>
            <div className="catalog-container">
              <ShowcaseGrid onSelectCategory={(cat) => setSelectedCategory(cat)} />
            </div>
          </main>

          {/* White Background Guarantee Strip with Navy Blue and Beige Icons */}
          <section className="trust-strip-white">
            <div className="trust-strip-white-container">
              <div className="trust-strip-white-card">
                <div className="trust-strip-white-icon-wrapper">
                  <Truck size={20} />
                </div>
                <div className="trust-strip-white-text">
                  <h4>Free Setup & Delivery</h4>
                  <p>In-home assembly, packaging removal</p>
                </div>
              </div>
              <div className="trust-strip-white-card">
                <div className="trust-strip-white-icon-wrapper">
                  <RefreshCw size={20} />
                </div>
                <div className="trust-strip-white-text">
                  <h4>100 Night Sleep Trial</h4>
                  <p>Risk-free comfort guarantee</p>
                </div>
              </div>
              <div className="trust-strip-white-card">
                <div className="trust-strip-white-icon-wrapper">
                  <ShieldCheck size={20} />
                </div>
                <div className="trust-strip-white-text">
                  <h4>10-Year Warranty</h4>
                  <p>Honest, durable spine support</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2 Side-by-Side White Background Promo Banners */}
          <section className="promo-banners-split-section">
            <div className="promo-banners-split-container">
              <div className="promo-banner-split-card">
                <div className="promo-banner-split-text">
                  <span className="promo-banner-split-tag">ORTHOPEDIC SPECIAL</span>
                  <h3>Active Spine Support</h3>
                  <p className="promo-banner-split-price">Starting @ ₹9,999</p>
                  <button className="btn-outline-dark-small" onClick={scrollToShop}>Shop Now</button>
                </div>
                <div className="promo-banner-split-image-wrapper">
                  <img src={latexSupport} alt="Ortho Mattress" />
                </div>
              </div>
              <div className="promo-banner-split-card">
                <div className="promo-banner-split-text">
                  <span className="promo-banner-split-tag">CLOUD COMFORT</span>
                  <h3>Memory Foam Pillows</h3>
                  <p className="promo-banner-split-price">Buy 1 Get 1 Free</p>
                  <button className="btn-outline-dark-small" onClick={scrollToShop}>Grab Offer</button>
                </div>
                <div className="promo-banner-split-image-wrapper">
                  <img src={coolingGel} alt="Memory Pillow" />
                </div>
              </div>
            </div>
          </section>

          {/* B2B / Business Banner Section */}
          <B2BSection />

          {/* Bank Offers Section */}
          <BankOffers />

        </>
      )}

      {/* Video Customer Testimonials Section */}
      <TestimonialsVideo />

      {/* Dynamic Newsletter Banner */}
      <section className="newsletter-banner">
        <div className="newsletter-container">
          <Sparkles size={32} className="newsletter-sparkle" />
          <h2 className="newsletter-title">Unlock Your Best Sleep</h2>
          <p className="newsletter-description">
            Join the Somnus Club to receive $100 off your first mattress order and sleep science tips directly to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit" className="btn-accent">
              Unlock Offer <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* Page Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <img src={logo} alt="SOMNUS Logo" className="logo-img" />
            </h3>
            <p>Handcrafting the future of regenerative rest. Designed for body alignment, made from ethically-sourced components.</p>
            <div className="footer-social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-links-col">
            <h4>Collection</h4>
            <ul>
              <li><a href="#mattresses" onClick={() => setSelectedCategory("Mattresses")}>Mattresses</a></li>
              <li><a href="#protectors" onClick={() => setSelectedCategory("Protectors")}>Protectors</a></li>
              <li><a href="#sheets" onClick={() => setSelectedCategory("Bed Sheets")}>Bed Sheets</a></li>
              <li><a href="#comforters" onClick={() => setSelectedCategory("Comforters")}>Comforters</a></li>
              <li><a href="#pillows" onClick={() => setSelectedCategory("Pillows")}>Pillows</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">Our Science</a></li>
              <li><a href="#reviews">Testimonials</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#terms">Warranty & Trial</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Somnus Inc. All rights reserved. Designed for optimal posture and wellness.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setCheckoutMode(true);
        }}
      />

      {/* Account Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}

export default App;
