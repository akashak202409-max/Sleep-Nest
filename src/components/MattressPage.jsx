import React, { useState, useEffect } from 'react';
import { Star, Shield, HelpCircle, ArrowRight, Heart } from 'lucide-react';
import {
  hybridLuxe,
  dualComfort,
  latexSupport,
  activeBounce,
  organicLatex,
  smartgridElite
} from '../assets/images';
import './MattressPage.css';
import SEOContent from './SEOContent';

// Rich Mock Mattress Database for the India catalog
const MATTRESSES_CATALOG = [
  {
    id: 101,
    name: "Somnus Ortho Memory Foam",
    rating: 4.9,
    reviews: 328,
    badge: "Best Seller",
    type: "Memory Foam",
    comfort: "Medium Firm",
    height: "6 inch",
    basePrice: 8229,
    originalPrice: 10999,
    features: ["Pressure Relief", "Cooling Gel layer", "Zero Partner Disturbance"],
    image: hybridLuxe
  },
  {
    id: 102,
    name: "Luxe Hybrid Pocket Spring",
    rating: 4.8,
    reviews: 142,
    badge: "Highly Rated",
    type: "Ortho Hybrid",
    comfort: "Firm",
    height: "8 inch",
    basePrice: 12499,
    originalPrice: 15999,
    features: ["Spine Alignment", "Individually Encased Coils", "Edge Support"],
    image: dualComfort
  },
  {
    id: 103,
    name: "Natural Latex Organic Bed",
    rating: 4.9,
    reviews: 86,
    badge: "Eco-Friendly",
    type: "Natural Latex",
    comfort: "Soft",
    height: "8 inch",
    basePrice: 18249,
    originalPrice: 22999,
    features: ["100% Natural Latex", "Hypoallergenic", "Breathable Pincores"],
    image: latexSupport
  },
  {
    id: 104,
    name: "Ergo-Comfort Dual Mattress",
    rating: 4.7,
    reviews: 94,
    badge: "Reversible",
    type: "Memory Foam",
    comfort: "Dual Comfort",
    height: "5 inch",
    basePrice: 6599,
    originalPrice: 8499,
    features: ["Dual-sided Usable", "Firm & Soft options", "Lightweight design"],
    image: activeBounce
  },
  {
    id: 105,
    name: "Somnus Elite Triple-Layer Hybrid",
    rating: 4.9,
    reviews: 412,
    badge: "Premium Choice",
    type: "Ortho Hybrid",
    comfort: "Medium Firm",
    height: "10 inch",
    basePrice: 22499,
    originalPrice: 28999,
    features: ["High Density Base", "Latex & Memory Foam Combo", "Airflow border mesh"],
    image: organicLatex
  },
  {
    id: 106,
    name: "Spine-Care Coir Mattress",
    rating: 4.6,
    reviews: 57,
    badge: "Ortho Care",
    type: "Coil Mattresses",
    comfort: "Firm",
    height: "5 inch",
    basePrice: 7499,
    originalPrice: 9499,
    features: ["Natural Coir Ventilation", "Reinforced back alignment", "Eco-materials"],
    image: smartgridElite
  }
];

const MattressPage = ({ onAddToCart, onProductClick, onLoginClick, initialSizeFilter = "All" }) => {
  // Filters State
  const [priceLimit, setPriceLimit] = useState(30000);
  const [selectedComforts, setSelectedComforts] = useState([]);
  const [selectedHeights, setSelectedHeights] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState(initialSizeFilter);

  // State to track size & price dynamically for each card
  const [mattressSizes, setMattressSizes] = useState(
    MATTRESSES_CATALOG.reduce((acc, item) => ({ ...acc, [item.id]: initialSizeFilter === "All" ? "Queen" : initialSizeFilter }), {})
  );

  // Sync selected size filter from parent prop (Navbar selection)
  useEffect(() => {
    setSelectedSizeFilter(initialSizeFilter);
    setMattressSizes(prev => {
      const next = { ...prev };
      MATTRESSES_CATALOG.forEach(item => {
        next[item.id] = initialSizeFilter === "All" ? "Queen" : initialSizeFilter;
      });
      return next;
    });
  }, [initialSizeFilter]);

  const sizePricingMultipliers = {
    Single: 0.8,
    Queen: 1.0,
    King: 1.2
  };

  const handleSizeChange = (id, size) => {
    setMattressSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleSizeFilterChange = (size) => {
    setSelectedSizeFilter(size);
    setMattressSizes(prev => {
      const next = { ...prev };
      MATTRESSES_CATALOG.forEach(item => {
        next[item.id] = size === "All" ? "Queen" : size;
      });
      return next;
    });
  };

  const handleComfortChange = (comfort) => {
    setSelectedComforts(prev => 
      prev.includes(comfort) ? prev.filter(c => c !== comfort) : [...prev, comfort]
    );
  };

  const handleHeightChange = (height) => {
    setSelectedHeights(prev => 
      prev.includes(height) ? prev.filter(h => h !== height) : [...prev, height]
    );
  };

  // Filter Catalog
  const filteredCatalog = MATTRESSES_CATALOG.filter(item => {
    // Price limit (Queen price base)
    if (item.basePrice > priceLimit) return false;
    
    // Comfort filter
    if (selectedComforts.length > 0 && !selectedComforts.includes(item.comfort)) return false;
    
    // Height filter
    if (selectedHeights.length > 0 && !selectedHeights.includes(item.height)) return false;
    
    // Type filter
    if (selectedType !== "All" && item.type !== selectedType) return false;

    return true;
  });

  return (
    <div className="mattress-page-wrapper">
      
      {/* Category header crumbs */}
      <div className="page-breadcrumbs">
        <span>Home</span> &gt; <span className="active-crumb">Mattress</span>
      </div>

      <div className="mattress-page-layout">
        
        {/* Left Sidebar Filter Section */}
        <aside className="sidebar-filters">
          <div className="filter-group">
            <h3>Filters</h3>
            <button className="clear-all-btn" onClick={() => {
              setPriceLimit(30000);
              setSelectedComforts([]);
              setSelectedHeights([]);
              setSelectedType("All");
              setSelectedSizeFilter("All");
            }}>Reset</button>
          </div>

          <div className="filter-divider"></div>

          {/* Price range selector */}
          <div className="filter-subgroup">
            <h4>Price Range</h4>
            <div className="range-labels">
              <span>₹5,000</span>
              <span>₹{priceLimit.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="30000" 
              step="1000"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-divider"></div>

          {/* Comfort Selectors */}
          <div className="filter-subgroup">
            <h4>Comfort Level</h4>
            {["Soft", "Medium Firm", "Firm", "Dual Comfort"].map(c => (
              <label key={c} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedComforts.includes(c)}
                  onChange={() => handleComfortChange(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className="filter-divider"></div>

          {/* Height selectors */}
          <div className="filter-subgroup">
            <h4>Height (Inches)</h4>
            {["5 inch", "6 inch", "8 inch", "10 inch"].map(h => (
              <label key={h} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedHeights.includes(h)}
                  onChange={() => handleHeightChange(h)}
                />
                <span>{h}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Right Main Content Section */}
        <main className="mattress-catalog-main">
          
          <div className="catalog-top-heading">
            <h2>Mattress <span>({filteredCatalog.length} Products Available)</span></h2>
          </div>

          {/* Filters quick bar - Size & type selectors */}
          <div className="quick-selection-bar">
            
            <div className="quick-filter-row">
              <span className="row-label">Size:</span>
              <div className="quick-filter-buttons">
                {["All", "Single", "Queen", "King"].map(size => (
                  <button 
                    key={size} 
                    className={`quick-pill ${selectedSizeFilter === size ? 'active' : ''}`}
                    onClick={() => handleSizeFilterChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quick-filter-row">
              <span className="row-label">Type:</span>
              <div className="quick-filter-buttons">
                {["All", "Memory Foam", "Ortho Hybrid", "Natural Latex"].map(type => (
                  <button 
                    key={type} 
                    className={`quick-pill ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Catalog products grid */}
          <div className="mattress-grid">
            {filteredCatalog.map(item => {
              const currentSize = mattressSizes[item.id] || "Queen";
              const multiplier = sizePricingMultipliers[currentSize] || 1.0;
              const calculatedPrice = Math.round(item.basePrice * multiplier);
              const calculatedOrigPrice = Math.round(item.originalPrice * multiplier);

              return (
                <div key={item.id} className="catalog-card">
                  <span className="card-badge">{item.badge}</span>
                  <div className="card-img-container">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="card-image" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onProductClick && onProductClick({...item, category: "Mattresses"})} 
                    />
                    <button 
                      className={`favorite-btn ${wishlist && wishlist.some(w => w.id === item.id) ? 'active' : ''}`}
                      onClick={() => onToggleWishlist && onToggleWishlist({ ...item, category: "Mattresses" })}
                      aria-label="Favorite"
                    >
                      <Heart 
                        size={18} 
                        fill={wishlist && wishlist.some(w => w.id === item.id) ? "var(--accent)" : "none"} 
                        color={wishlist && wishlist.some(w => w.id === item.id) ? "var(--accent)" : "currentColor"}
                      />
                    </button>
                  </div>

                  <div className="card-info">
                    <span className="card-item-type">{item.type} • {item.comfort}</span>
                    <h3 
                      className="card-title" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onProductClick && onProductClick({...item, category: "Mattresses"})}
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
                      {["Single", "Queen", "King"].map(sz => (
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
                        <span className="price-original">₹{calculatedOrigPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <button 
                        className="btn-primary card-add-btn"
                        onClick={() => onAddToCart({
                          id: `${item.id}-${currentSize}`,
                          name: `${item.name} (${currentSize})`,
                          price: calculatedPrice,
                          category: "Mattresses",
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

          <div className="promo-row">
            <div className="promo-banner-orange" onClick={onLoginClick}>
              <div className="banner-text">
                <h3>Log in to unlock more offers!</h3>
                <p>Exclusive deals for SleepNest account members.</p>
              </div>
              <button className="banner-cta-btn">Login Now <ArrowRight size={16} /></button>
            </div>
          </div>

          {/* Recently Viewed Products Section */}
          <div className="recently-viewed-block">
            <h3>Recently Viewed Products</h3>
            <div className="recent-grid">
              {MATTRESSES_CATALOG.slice(0, 2).map(item => (
                <div key={`recent-${item.id}`} className="recent-card">
                  <img src={item.image} alt={item.name} className="recent-img" />
                  <div className="recent-info">
                    <h4>{item.name}</h4>
                    <span className="recent-price">₹{item.basePrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Detailed Points and FAQs Accordion */}
          <SEOContent category="Mattresses" />

        </main>

      </div>
    </div>
  );
};

export default MattressPage;
