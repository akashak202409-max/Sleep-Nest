import React from 'react';
import { Sparkles, Percent, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { latexSupport, ecoCoir, smartgridElite, dualComfort, coolingGel } from '../assets/images';
import './ShowcaseGrid.css';

const ShowcaseGrid = ({ onSelectCategory }) => {
  const categories = [
    { name: "Mattresses", img: latexSupport },
    { name: "Bedsheets", img: ecoCoir },
    { name: "Protector", img: smartgridElite },
    { name: "Comforter", img: dualComfort },
    { name: "Pillows", img: coolingGel }
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
            <div className="promo-icon-wrapper">
              <Percent size={28} />
            </div>
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
              src={dualComfort} 
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
