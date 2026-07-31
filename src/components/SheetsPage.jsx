import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import './SheetsPage.css';
import SEOContent from './SEOContent';

const SHEETS_CATALOG = [
  {
    id: 401,
    name: "Luxe Cotton Bed Sheet (300 TC)",
    rating: 4.8,
    reviews: 850,
    badge: "100% Cotton",
    type: "Flat Sheet",
    material: "Pure Cotton",
    basePrice: 1199,
    originalPrice: 1699,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["300 Thread Count", "Soft sateen weave", "Includes 2 pillow covers"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 402,
    name: "Organic Bamboo Cooling Sheets Set",
    rating: 4.9,
    reviews: 420,
    badge: "Premium Cooling",
    type: "Fitted Sheet",
    material: "Bamboo Viscose",
    basePrice: 1899,
    originalPrice: 2499,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["100% Organic Bamboo", "Naturally moisture-wicking", "Deep pocket fit"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 403,
    name: "Satin Premium Stripe Bed Sheet",
    rating: 4.7,
    reviews: 290,
    badge: "Luxury Touch",
    type: "Flat Sheet",
    material: "Satin Polyester",
    basePrice: 1499,
    originalPrice: 1999,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["Glossy striped texture", "Wrinkle-resistant fabric", "Rich color fastness"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 404,
    name: "Microfiber Deep Pocket Fitted Sheet",
    rating: 4.5,
    reviews: 610,
    badge: "Best Value",
    type: "Fitted Sheet",
    material: "Brushed Microfiber",
    basePrice: 799,
    originalPrice: 1199,
    sizes: ["Single", "Double", "Queen", "King"],
    sizeMultipliers: { "Single": 0.8, "Double": 0.95, "Queen": 1.0, "King": 1.2 },
    features: ["Super soft double brushed", "All-around snug elastic", "Fade resistant"],
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80"
  }
];

const SheetsPage = ({ onAddToCart, onProductClick }) => {
  const [priceLimit, setPriceLimit] = useState(2500);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // State to track size & price dynamically for each card
  const [sheetSizes, setSheetSizes] = useState(
    SHEETS_CATALOG.reduce((acc, item) => ({ ...acc, [item.id]: "Queen" }), {})
  );

  const handleSizeChange = (id, size) => {
    setSheetSizes(prev => ({ ...prev, [id]: size }));
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
  const filteredCatalog = SHEETS_CATALOG.filter(item => {
    if (item.basePrice > priceLimit) return false;
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(item.material)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
    return true;
  });

  return (
    <div className="sheets-page-wrapper">
      
      {/* Category header crumbs */}
      <div className="page-breadcrumbs">
        <span>Home</span> &gt; <span className="active-crumb">Bed Sheets</span>
      </div>

      <div className="sheets-page-layout">
        
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
              min="800" 
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
            {["Pure Cotton", "Bamboo Viscose", "Satin Polyester", "Brushed Microfiber"].map(m => (
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
            <h4>Sheet Type</h4>
            {["Flat Sheet", "Fitted Sheet"].map(t => (
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
        <main className="sheets-catalog-main">
          
          <div className="catalog-top-heading">
            <h2>Bed Sheets <span>({filteredCatalog.length} Products Available)</span></h2>
          </div>

          {/* Catalog products grid */}
          <div className="sheets-grid">
            {filteredCatalog.map(item => {
              const currentSize = sheetSizes[item.id] || "Queen";
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
                      onClick={() => onProductClick && onProductClick({...item, category: "Bed Sheets"})} 
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
                      onClick={() => onProductClick && onProductClick({...item, category: "Bed Sheets"})}
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
                          category: "Bed Sheets",
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
          <SEOContent category="Bed Sheets" />

        </main>

      </div>
    </div>
  );
};

export default SheetsPage;
