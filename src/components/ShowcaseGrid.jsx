import React from 'react';
import { Sparkles, Percent, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import './ShowcaseGrid.css';

const ShowcaseGrid = ({ onSelectCategory }) => {
  const categories = [
    { name: "Mattresses", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=300&h=300&q=80" },
    { name: "Bedsheets", img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=300&h=300&q=80" },
    { name: "Protector", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&h=300&q=80" },
    { name: "Comforter", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&h=300&q=80" },
    { name: "Pillows", img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&h=300&q=80" }
  ];


  return (
    <div className="showcase-grid-section">
      {/* 1. Shop by Category (12 items grid) */}
      <section className="categories-circular-section">
        <div className="categories-header-wrapper">
          <h2 className="section-title-premium-left">Shop By Categories</h2>
          <div className="title-underline"></div>
        </div>
        <div className="categories-grid-container">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="category-grid-card"
              onClick={() => onSelectCategory(cat.name)}
            >
              <div className="grid-img-wrapper">
                <img src={cat.img} alt={cat.name} className="grid-img" />
              </div>
              <span className="grid-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Gift Card Banner */}
      <section className="gift-card-promo-banner">
        <div className="gift-card-content">
          <div className="gift-card-left">
            <Percent size={28} className="promo-icon-gold" />
            <div>
              <h3>Corporate Gifting & Gift Vouchers</h3>
              <p>Delight your employees or loved ones with ultimate comfort vouchers.</p>
            </div>
          </div>
          <button className="btn-outline-dark">Know More <ArrowRight size={14} /></button>
        </div>
      </section>

      {/* 3. Spine Support Mattress Highlight block */}
      <section className="spine-support-highlight">
        <div className="spine-grid">
          <div className="spine-image-side">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80" 
              alt="Ortho Spine Mattress Construction" 
              className="spine-main-img" 
            />
            <div className="floating-spine-tag">
              <ShieldCheck size={18} /> Recommended by Orthopedists
            </div>
          </div>
          <div className="spine-text-side">
            <span className="accent-sub">SPINE ALIGNMENT TECHNOLOGY</span>
            <h2>Orthopedic Spine-Support Mattress</h2>
            <p>
              Specifically designed for deep compression support. Corrects posture, aligns the vertebral column, and reduces morning aches by 87%.
            </p>
            <ul className="spine-benefits-list">
              <li>5-Zone Contoured Pressure Relief</li>
              <li>High-Density Breathable Coils</li>
              <li>Cooling Gel Memory Foam Topper</li>
            </ul>
            <button className="btn-accent-large" onClick={() => onSelectCategory("Mattresses")}>
              Configure Your Size
            </button>
          </div>
        </div>
      </section>



    </div>
  );
};

export default ShowcaseGrid;
