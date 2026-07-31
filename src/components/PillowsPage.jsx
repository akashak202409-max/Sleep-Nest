import React, { useState } from 'react';
import { Star, Heart, ArrowRight } from 'lucide-react';
import './PillowsPage.css';
import SEOContent from './SEOContent';

const PILLOWS_CATALOG = [
  {
    id: 201,
    name: "Cushion | Pack of 5 | Hollow Fiber Filling",
    rating: 4.1,
    reviews: 3000,
    badge: "Hot Seller",
    type: "Hollow Fiber",
    pack: "Pack of 5",
    basePrice: 929,
    originalPrice: 1023,
    sizes: ["12\"x12\"", "16\"x16\"", "20\"x20\""],
    sizeMultipliers: { "12\"x12\"": 0.8, "16\"x16\"": 1.0, "20\"x20\"": 1.3 },
    features: ["Hollow Fiber filling", "Sofa & Bed use", "Fluffy and resilient"],
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 202,
    name: "Ergonomic Memory Foam Contour Pillow",
    rating: 4.7,
    reviews: 184,
    badge: "Spine Support",
    type: "Memory Foam",
    pack: "Single Pack",
    basePrice: 1499,
    originalPrice: 1999,
    sizes: ["Standard", "Queen", "King"],
    sizeMultipliers: { "Standard": 1.0, "Queen": 1.15, "King": 1.3 },
    features: ["Contouring support", "Relieves neck stiffness", "Premium outer cover"],
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 203,
    name: "Natural Latex Breathable Sleep Pillow",
    rating: 4.8,
    reviews: 92,
    badge: "100% Organic",
    type: "Latex",
    pack: "Single Pack",
    basePrice: 1999,
    originalPrice: 2499,
    sizes: ["Standard", "Queen"],
    sizeMultipliers: { "Standard": 1.0, "Queen": 1.2 },
    features: ["Natural Latex", "Anti-dustmite protection", "Ventilated design"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 204,
    name: "Microfiber Premium Bed Pillows (Pack of 2)",
    rating: 4.4,
    reviews: 512,
    badge: "Best Value",
    type: "Microfiber",
    pack: "Pack of 2",
    basePrice: 699,
    originalPrice: 999,
    sizes: ["Standard", "King"],
    sizeMultipliers: { "Standard": 1.0, "King": 1.3 },
    features: ["Down-alternative fill", "Cotton shell cover", "Machine washable"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 205,
    name: "Cooling Gel Infused Memory Foam Pillow",
    rating: 4.6,
    reviews: 140,
    badge: "Cooling Tech",
    type: "Memory Foam",
    pack: "Single Pack",
    basePrice: 1799,
    originalPrice: 2299,
    sizes: ["Standard", "Queen", "King"],
    sizeMultipliers: { "Standard": 1.0, "Queen": 1.15, "King": 1.3 },
    features: ["Gel heat dissipation", "Ideal for hot sleepers", "Removable bamboo cover"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 206,
    name: "Bamboo Charcoal Odor-Free Support Pillow",
    rating: 4.5,
    reviews: 73,
    badge: "Fresh Air",
    type: "Latex",
    pack: "Single Pack",
    basePrice: 1299,
    originalPrice: 1699,
    sizes: ["Standard", "Queen"],
    sizeMultipliers: { "Standard": 1.0, "Queen": 1.2 },
    features: ["Charcoal moisture absorption", "Anti-microbial shell", "Firm cervical rest"],
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
  }
];

const PillowsPage = ({ onAddToCart, onProductClick }) => {
  const [priceLimit, setPriceLimit] = useState(3000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPacks, setSelectedPacks] = useState([]);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState("All");

  // State to track size & price dynamically for each card
  const [pillowSizes, setPillowSizes] = useState(
    PILLOWS_CATALOG.reduce((acc, item) => ({ ...acc, [item.id]: item.sizes[0] }), {})
  );

  const handleSizeChange = (id, size) => {
    setPillowSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handlePackChange = (pack) => {
    setSelectedPacks(prev => 
      prev.includes(pack) ? prev.filter(p => p !== pack) : [...prev, pack]
    );
  };

  // Filter Catalog
  const filteredCatalog = PILLOWS_CATALOG.filter(item => {
    if (item.basePrice > priceLimit) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
    if (selectedPacks.length > 0 && !selectedPacks.includes(item.pack)) return false;
    return true;
  });

  return (
    <div className="pillows-page-wrapper">
      
      {/* Category header crumbs */}
      <div className="page-breadcrumbs">
        <span>Home</span> &gt; <span className="active-crumb">Pillows & Cushions</span>
      </div>

      <div className="pillows-page-layout">
        
        {/* Left Sidebar Filter Section */}
        <aside className="sidebar-filters">
          <div className="filter-group">
            <h3>Filters</h3>
            <button className="clear-all-btn" onClick={() => {
              setPriceLimit(3000);
              setSelectedTypes([]);
              setSelectedPacks([]);
              setSelectedSizeFilter("All");
            }}>Reset</button>
          </div>

          <div className="filter-divider"></div>

          {/* Price Range Selector */}
          <div className="filter-subgroup">
            <h4>Price Range</h4>
            <div className="range-labels">
              <span>₹200</span>
              <span>₹{priceLimit.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="3000" 
              step="100"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-divider"></div>

          {/* Type Selectors */}
          <div className="filter-subgroup">
            <h4>Fill Material</h4>
            {["Hollow Fiber", "Memory Foam", "Latex", "Microfiber"].map(t => (
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

          <div className="filter-divider"></div>

          {/* Pack size selectors */}
          <div className="filter-subgroup">
            <h4>Pack Size</h4>
            {["Single Pack", "Pack of 2", "Pack of 5"].map(p => (
              <label key={p} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedPacks.includes(p)}
                  onChange={() => handlePackChange(p)}
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Right Main Content Section */}
        <main className="pillows-catalog-main">
          
          <div className="catalog-top-heading">
            <h2>Pillows & Cushions <span>({filteredCatalog.length} Products Available)</span></h2>
          </div>

          {/* Catalog products grid */}
          <div className="pillows-grid">
            {filteredCatalog.map(item => {
              const currentSize = pillowSizes[item.id] || item.sizes[0];
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
                      onClick={() => onProductClick && onProductClick({...item, category: "Pillows"})} 
                    />
                    <button className="favorite-btn" aria-label="Favorite">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="card-info">
                    <span className="card-item-type">{item.type} • {item.pack}</span>
                    <h3 
                      className="card-title" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onProductClick && onProductClick({...item, category: "Pillows"})}
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
                          category: "Pillows",
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
          <SEOContent category="Pillows" />

        </main>

      </div>
    </div>
  );
};

export default PillowsPage;
