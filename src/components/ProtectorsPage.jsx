import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import {
  bambooProtector,
  cottonProtector,
  quiltedProtector,
  tencelProtector
} from '../assets/images';
import './ProtectorsPage.css';
import SEOContent from './SEOContent';

const PROTECTORS_CATALOG = [
  {
    id: 301,
    name: "Bamboo Waterproof Mattress Protector",
    rating: 4.8,
    reviews: 1240,
    badge: "Best Seller",
    type: "Waterproof TPU",
    material: "Bamboo Fabric",
    basePrice: 999,
    originalPrice: 1499,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["100% Waterproof", "Cooling Bamboo Viscose", "Deep Pocket elastic skirt"],
    image: bambooProtector
  },
  {
    id: 302,
    name: "Organic Cotton Breathable Mattress Cover",
    rating: 4.7,
    reviews: 430,
    badge: "Eco-Friendly",
    type: "Dust Mite Shield",
    material: "Organic Cotton",
    basePrice: 1299,
    originalPrice: 1799,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["GOTS Certified Cotton", "Hypoallergenic barrier", "Breathable knit design"],
    image: cottonProtector
  },
  {
    id: 303,
    name: "Quilted Microfiber Fitted Bed Protector",
    rating: 4.6,
    reviews: 560,
    badge: "Ultra Comfort",
    type: "Padded Comfort",
    material: "Microfiber Cushion",
    basePrice: 1499,
    originalPrice: 1999,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["Quilted plush layer", "Snug fit elastic band", "Machine washable"],
    image: quiltedProtector
  },
  {
    id: 304,
    name: "Cooling Tencel Waterproof Bed Shield",
    rating: 4.9,
    reviews: 280,
    badge: "Cooling Tech",
    type: "Premium Shield",
    material: "Tencel Lyocell",
    basePrice: 1799,
    originalPrice: 2499,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["Eucalyptus-derived Tencel", "Whisper-quiet back film", "Moisture wicking"],
    image: tencelProtector
  }
];

const ProtectorsPage = ({ onAddToCart, onProductClick }) => {
  const [priceLimit, setPriceLimit] = useState(2500);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // State to track size & price dynamically for each card
  const [protectorSizes, setProtectorSizes] = useState(
    PROTECTORS_CATALOG.reduce((acc, item) => ({ ...acc, [item.id]: "Queen" }), {})
  );

  const handleSizeChange = (id, size) => {
    setProtectorSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleMaterialChange = (mat) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Filter Catalog
  const filteredCatalog = PROTECTORS_CATALOG.filter(item => {
    if (item.basePrice > priceLimit) return false;
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(item.material)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
    return true;
  });

  return (
    <div className="protectors-page-wrapper">
      
      {/* Category header crumbs */}
      <div className="page-breadcrumbs">
        <span>Home</span> &gt; <span className="active-crumb">Mattress Protectors</span>
      </div>

      <div className="protectors-page-layout">
        
        {/* Left Sidebar Filter Section */}
        <aside className="sidebar-filters">
          <div className="filter-group">
            <h3>Filters</h3>
            <button className="clear-all-btn" onClick={() => {
              setPriceLimit(2500);
              setSelectedMaterials([]);
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
              min="1000" 
              max="2500" 
              step="100"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-divider"></div>

          {/* Material Selectors */}
          <div className="filter-subgroup">
            <h4>Material</h4>
            {["Bamboo Fabric", "Organic Cotton", "Microfiber Cushion", "Tencel Lyocell"].map(m => (
              <label key={m} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedMaterials.includes(m)}
                  onChange={() => handleMaterialChange(m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>

          <div className="filter-divider"></div>

          {/* Type selectors */}
          <div className="filter-subgroup">
            <h4>Protection Type</h4>
            {["Waterproof TPU", "Dust Mite Shield", "Padded Comfort", "Premium Shield"].map(t => (
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
        <main className="protectors-catalog-main">
          
          <div className="catalog-top-heading">
            <h2>Mattress Protectors <span>({filteredCatalog.length} Products Available)</span></h2>
          </div>

          {/* Catalog products grid */}
          <div className="protectors-grid">
            {filteredCatalog.map(item => {
              const currentSize = protectorSizes[item.id] || "Queen";
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
                      onClick={() => onProductClick && onProductClick({...item, category: "Protectors"})} 
                    />
                    <button className="favorite-btn" aria-label="Favorite">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="card-info">
                    <span className="card-item-type">{item.type} • {item.material}</span>
                    <h3 
                      className="card-title" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onProductClick && onProductClick({...item, category: "Protectors"})}
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
                          category: "Protectors",
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
          <SEOContent category="Protectors" />

        </main>

      </div>
    </div>
  );
};

export default ProtectorsPage;
