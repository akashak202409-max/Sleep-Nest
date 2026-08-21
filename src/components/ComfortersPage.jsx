import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import {
  hybridLuxe,
  dualComfort,
  activeBounce,
  coolingGel
} from '../assets/images';
import './ComfortersPage.css';
import SEOContent from './SEOContent';

const COMFORTERS_CATALOG = [
  {
    id: 501,
    name: "All-Season Premium Microfiber Comforter",
    rating: 4.8,
    reviews: 930,
    badge: "All-Weather",
    type: "Comforter",
    warmth: "Medium",
    basePrice: 1699,
    originalPrice: 2499,
    sizes: ["Single", "Double"],
    sizeMultipliers: { "Single": 0.75, "Double": 1.0 },
    features: ["Hypoallergenic hollow siliconized fill", "Box-stitched pattern", "Soft brushed microfiber"],
    image: hybridLuxe
  },
  {
    id: 502,
    name: "Ultra Soft Hypoallergenic Duvet",
    rating: 4.7,
    reviews: 460,
    badge: "Super Soft",
    type: "Duvet Insert",
    warmth: "Heavy",
    basePrice: 1299,
    originalPrice: 1899,
    sizes: ["Single", "Double"],
    sizeMultipliers: { "Single": 0.75, "Double": 1.0 },
    features: ["Corner tabs for duvet covers", "Breathable shell fabric", "Fluffy cloud fill"],
    image: dualComfort
  },
  {
    id: 503,
    name: "Reversible Warm Winter Quilt",
    rating: 4.9,
    reviews: 310,
    badge: "Winter Warmth",
    type: "Quilt",
    warmth: "Heavy",
    basePrice: 2199,
    originalPrice: 2999,
    sizes: ["Single", "Double"],
    sizeMultipliers: { "Single": 0.75, "Double": 1.0 },
    features: ["Dual color reversible", "Thermal insulation tech", "Extremely cozy and light"],
    image: activeBounce
  },
  {
    id: 504,
    name: "Lightweight AC Blanket / Cotton Dohar",
    rating: 4.6,
    reviews: 580,
    badge: "Summer Cool",
    type: "Dohar",
    warmth: "Light",
    basePrice: 999,
    originalPrice: 1499,
    sizes: ["Single", "Double"],
    sizeMultipliers: { "Single": 0.75, "Double": 1.0 },
    features: ["100% Cotton flannel cover", "Ideal for AC rooms", "Breathable light weight"],
    image: coolingGel
  }
];

const ComfortersPage = ({ onAddToCart, onProductClick }) => {
  const [priceLimit, setPriceLimit] = useState(3000);
  const [selectedWarmth, setSelectedWarmth] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // State to track size & price dynamically for each card
  const [comforterSizes, setComforterSizes] = useState(
    COMFORTERS_CATALOG.reduce((acc, item) => ({ ...acc, [item.id]: "Double" }), {})
  );

  const handleSizeChange = (id, size) => {
    setComforterSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleWarmthChange = (w) => {
    setSelectedWarmth(prev => 
      prev.includes(w) ? prev.filter(item => item !== w) : [...prev, w]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Filter Catalog
  const filteredCatalog = COMFORTERS_CATALOG.filter(item => {
    if (item.basePrice > priceLimit) return false;
    if (selectedWarmth.length > 0 && !selectedWarmth.includes(item.warmth)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
    return true;
  });

  return (
    <div className="comforters-page-wrapper">
      
      {/* Category header crumbs */}
      <div className="page-breadcrumbs">
        <span>Home</span> &gt; <span className="active-crumb">Comforters & Blankets</span>
      </div>

      <div className="comforters-page-layout">
        
        {/* Left Sidebar Filter Section */}
        <aside className="sidebar-filters">
          <div className="filter-group">
            <h3>Filters</h3>
            <button className="clear-all-btn" onClick={() => {
              setPriceLimit(3000);
              setSelectedWarmth([]);
              setSelectedTypes([]);
            }}>Reset</button>
          </div>

          <div className="filter-divider"></div>

          {/* Price Range Selector */}
          <div className="filter-subgroup">
            <h4>Price Range</h4>
            <div className="range-labels">
              <span>₹500</span>
              <span>₹{priceLimit.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="800" 
              max="3000" 
              step="100"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-divider"></div>

          {/* Warmth Level Selectors */}
          <div className="filter-subgroup">
            <h4>Warmth Level</h4>
            {["Light", "Medium", "Heavy"].map(w => (
              <label key={w} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedWarmth.includes(w)}
                  onChange={() => handleWarmthChange(w)}
                />
                <span>{w} Warmth</span>
              </label>
            ))}
          </div>

          <div className="filter-divider"></div>

          {/* Type selectors */}
          <div className="filter-subgroup">
            <h4>Category Type</h4>
            {["Comforter", "Duvet Insert", "Quilt", "Dohar"].map(t => (
              <label key={t} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedTypes.includes(t)}
                  onChange={() => handleTypeChange(t)}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Right Main Content Section */}
        <main className="comforters-catalog-main">
          
          <div className="catalog-top-heading">
            <h2>Comforters & Blankets <span>({filteredCatalog.length} Products Available)</span></h2>
          </div>

          {/* Catalog products grid */}
          <div className="comforters-grid">
            {filteredCatalog.map(item => {
              const currentSize = comforterSizes[item.id] || "Double";
              const multiplier = item.sizeMultipliers[currentSize] || 1.0;
              const calculatedPrice = Math.round(item.basePrice * multiplier);
              const calculatedOrigPrice = Math.round(item.originalPrice * multiplier);
              const discountPercent = Math.round(((calculatedOrigPrice - calculatedPrice) / calculatedOrigPrice) * 100);

              return (
                <div key={item.id} className="catalog-card">
                  <span className="card-badge">{item.badge}</span>
                  <div className="card-img-container">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="card-image" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onProductClick && onProductClick({...item, category: "Comforters"})} 
                    />
                    <button className="favorite-btn" aria-label="Favorite">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="card-info">
                    <span className="card-item-type">{item.type} • {item.warmth} Warmth</span>
                    <h3 
                      className="card-title" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onProductClick && onProductClick({...item, category: "Comforters"})}
                    >
                      {item.name}
                    </h3>

                    {/* Ratings */}
                    <div className="card-rating">
                      <div className="stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} className="star-fill" />
                        ))}
                      </div>
                      <span className="rating-label">{item.rating} ({item.reviews} Reviews)</span>
                    </div>

                    {/* Size Selector pills */}
                    <div className="card-size-selectors">
                      {item.sizes.map(sz => (
                        <button 
                          key={sz} 
                          className={`size-selector-btn ${currentSize === sz ? 'selected' : ''}`}
                          onClick={() => handleSizeChange(item.id, sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    {/* Features list */}
                    <ul className="card-features-list">
                      {item.features.map((feat, idx) => (
                        <li key={idx}>✔ {feat}</li>
                      ))}
                    </ul>

                    {/* Price and Action row */}
                    <div className="card-price-action-row">
                      <div className="price-col">
                        <span className="price-rupees">₹{calculatedPrice.toLocaleString('en-IN')}</span>
                        <div className="orig-price-row">
                          <span className="price-original">₹{calculatedOrigPrice.toLocaleString('en-IN')}</span>
                          <span className="discount-badge-green">{discountPercent}% off</span>
                        </div>
                      </div>
                      <button 
                        className="btn-primary card-add-btn"
                        onClick={() => onAddToCart({
                          id: `${item.id}-${currentSize}`,
                          name: `${item.name} (${currentSize})`,
                          price: calculatedPrice,
                          category: "Comforters",
                          image: item.image
                        })}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SEO Detailed Points and FAQs Accordion */}
          <SEOContent category="Comforters" />

        </main>

      </div>
    </div>
  );
};

export default ComfortersPage;
