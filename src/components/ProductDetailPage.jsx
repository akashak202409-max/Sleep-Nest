import React, { useState, useEffect } from 'react';
import { Star, Heart, Share2, MapPin, ShieldCheck, Truck, RefreshCw, HelpCircle, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { 
  dualComfort, 
  hybridLuxe, 
  latexSupport, 
  kingBedVideo,
  luxuryMattressVideo2,
  kidsMattressVideo,
  cottonSheets,
  bambooSheets,
  satinSheets,
  microfiberSheets,
  bambooProtector,
  cottonProtector,
  quiltedProtector,
  tencelProtector
} from '../assets/images';
import './ProductDetailPage.css';

const ProductDetailPage = ({ product, onAddToCart, onBack, onToggleWishlist, wishlist }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSeries, setSelectedSeries] = useState("Essential");
  const [selectedSize, setSelectedSize] = useState("Queen | 72\" x 60\" x 6\"");
  const [pincode, setPincode] = useState("600011");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 47, seconds: 36 });

  const isSheet = product.category === "Bed Sheets";
  const sheetStyles = [cottonSheets, bambooSheets, satinSheets, microfiberSheets];
  const altSheets = sheetStyles.filter(img => img !== product.image);

  const isProtector = product.category === "Protectors";
  const protectorStyles = [bambooProtector, cottonProtector, quiltedProtector, tencelProtector];
  const altProtectors = protectorStyles.filter(img => img !== product.image);

  const isMattress = product.category === "Mattresses";

  // Choose the video based on selected size for Mattress category
  let mattressVideo = null;
  if (isMattress) {
    if (selectedSize && selectedSize.includes("King")) {
      mattressVideo = { type: 'video', url: kingBedVideo };
    } else if (selectedSize && selectedSize.includes("Queen")) {
      mattressVideo = { type: 'video', url: luxuryMattressVideo2 };
    } else if (selectedSize && (selectedSize.includes("Single") || selectedSize.includes("Kids") || selectedSize.includes("Double"))) {
      mattressVideo = { type: 'video', url: kidsMattressVideo };
    } else {
      mattressVideo = { type: 'video', url: luxuryMattressVideo2 };
    }
  }

  // Mock alternative images for gallery based on category or product properties
  const galleryItems = isSheet ? [
    { type: 'image', url: product.image },
    product.fabricImage ? { type: 'image', url: product.fabricImage } : null,
    { type: 'image', url: altSheets[0] || satinSheets },
    { type: 'image', url: altSheets[1] || bambooSheets },
    { type: 'image', url: altSheets[2] || microfiberSheets }
  ].filter(Boolean).slice(0, 5) : isProtector ? [
    { type: 'image', url: product.image },
    { type: 'image', url: altProtectors[0] || cottonProtector },
    { type: 'image', url: altProtectors[1] || quiltedProtector },
    { type: 'image', url: altProtectors[2] || tencelProtector }
  ].filter(Boolean).slice(0, 5) : [
    { type: 'image', url: product.image },
    mattressVideo,
    product.fabricImage ? { type: 'image', url: product.fabricImage } : null,
    { type: 'image', url: dualComfort },
    { type: 'image', url: hybridLuxe },
    !product.fabricImage ? { type: 'image', url: latexSupport } : null
  ].filter(Boolean).slice(0, 5);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute pricing based on selected series and size
  const getPricing = () => {
    let base = product.basePrice || 999;
    let originalBase = product.originalPrice || 1499;

    // Series multiplier
    if (selectedSeries === "Classic") {
      base *= 1.25;
      originalBase *= 1.25;
    } else if (selectedSeries === "Infinity") {
      base *= 1.6;
      originalBase *= 1.6;
    } else if (selectedSeries === "Ultra") {
      base *= 2.1;
      originalBase *= 2.1;
    }

    // Size multiplier
    if (selectedSize.includes("Single")) {
      base *= 0.8;
      originalBase *= 0.8;
    } else if (selectedSize.includes("Double")) {
      base *= 0.95;
      originalBase *= 0.95;
    } else if (selectedSize.includes("King")) {
      base *= 1.2;
      originalBase *= 1.2;
    }

    return {
      price: Math.round(base),
      original: Math.round(originalBase),
      bankOffer: Math.round(base * 0.93) // 7% extra discount for bank offer
    };
  };

  const pricing = getPricing();

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryChecked(true);
    } else {
      alert("Please enter a valid 6-digit Indian pincode.");
    }
  };

  return (
    <div className="pdp-page-wrapper">
      
      {/* Back to Catalog button */}
      <button className="pdp-back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div className="pdp-layout">
        
        {/* Left Side: Image Gallery */}
        <div className="pdp-gallery-col">
          
          <div className="gallery-layout-row">
            {/* Vertical thumbnails */}
            <div className="vertical-thumbnails">
              {galleryItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`thumb-card ${activeImgIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveImgIdx(idx)}
                >
                  {item.type === 'video' ? (
                    <div className="thumb-video-wrapper">
                      <video src={item.url} muted playsInline className="thumb-video" />
                      <div className="thumb-play-overlay">
                        <Play size={12} fill="currentColor" />
                      </div>
                    </div>
                  ) : (
                    <img src={item.url} alt={`view-${idx}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Main view image */}
            <div className="main-image-container">
              {galleryItems[activeImgIdx].type === 'video' ? (
                <video 
                  src={galleryItems[activeImgIdx].url} 
                  className="main-display-video" 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              ) : (
                <img src={galleryItems[activeImgIdx].url} alt={product.name} className="main-display-img" />
              )}
              
              {/* Arrow navigation inside image */}
              <button 
                className="gallery-nav-arrow arrow-left" 
                onClick={() => setActiveImgIdx(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
              >
                &lt;
              </button>
              <button 
                className="gallery-nav-arrow arrow-right" 
                onClick={() => setActiveImgIdx(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1))}
              >
                &gt;
              </button>

              <div className="gallery-action-overlays">
                <button className="zoom-badge-btn">🔍 Zoom</button>
                <div className="fav-share-row">
                   <button 
                    className={`action-circle-btn ${wishlist && wishlist.some(w => w.id === product.id) ? 'active' : ''}`}
                    onClick={() => onToggleWishlist && onToggleWishlist(product)}
                    aria-label="Favorite"
                  >
                    <Heart 
                      size={16} 
                      fill={wishlist && wishlist.some(w => w.id === product.id) ? "var(--accent)" : "none"}
                      color={wishlist && wishlist.some(w => w.id === product.id) ? "var(--accent)" : "currentColor"}
                    />
                  </button>
                  <button className="action-circle-btn"><Share2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights strip below image */}
          <div className="gallery-highlights-strip">
            <div className="highlight-item">
              <RefreshCw size={24} className="hl-icon" />
              <div className="hl-text">
                <h5>Try for 100 Days</h5>
                <p>Not satisfied? Money back</p>
              </div>
            </div>
            <div className="highlight-item">
              <Truck size={24} className="hl-icon" />
              <div className="hl-text">
                <h5>Free Shipping</h5>
                <p>Doorstep delivery</p>
              </div>
            </div>
            <div className="highlight-item">
              <ShieldCheck size={24} className="hl-icon" />
              <div className="hl-text">
                <h5>10 Year Warranty</h5>
                <p>Manufacturer guarantee</p>
              </div>
            </div>
            <div className="highlight-item">
              <HelpCircle size={24} className="hl-icon" />
              <div className="hl-text">
                <h5>Need Custom Size?</h5>
                <p>Order custom dimensions</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Options Selector Panel */}
        <div className="pdp-details-col">
          
          <h1 className="pdp-main-title">{product.name} | Premium Support & Comfort</h1>
          
          {/* Choose Series block */}
          <div className="pdp-selection-group">
            <div className="group-header">
              <h3>Choose Series</h3>
              <button className="compare-series-btn">📊 Compare Series</button>
            </div>

            <div className="series-list">
              {[
                { id: "Essential", tag: "Best Value", desc: "Just the right support to help you fall asleep", discount: "34%" },
                { id: "Classic", tag: "Bestseller", desc: "Orthopaedic foam for side and back sleepers", discount: "36%" },
                { id: "Infinity", tag: "Advanced", desc: "Lumbar-reinforced foam for long-term back health", discount: "33%" },
                { id: "Ultra", tag: "Premium", desc: "Full-body contouring for luxury sleep with advanced air flow", discount: "32%" }
              ].map(s => {
                // Approximate prices for display inside radio cards
                let multiplier = 1.0;
                if (s.id === "Classic") multiplier = 1.25;
                if (s.id === "Infinity") multiplier = 1.6;
                if (s.id === "Ultra") multiplier = 2.1;
                
                const cardPrice = Math.round(product.basePrice * multiplier);
                const bankOfferPrice = Math.round(cardPrice * 0.93);

                return (
                  <label key={s.id} className={`series-radio-card ${selectedSeries === s.id ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="series-selector"
                      checked={selectedSeries === s.id}
                      onChange={() => setSelectedSeries(s.id)}
                    />
                    <div className="radio-content">
                      <div className="radio-left">
                        <div className="series-name-row">
                          <span className="series-id">{s.id}</span>
                          <span className="series-tag-badge">{s.tag}</span>
                        </div>
                        <p className="series-desc-text">{s.desc}</p>
                      </div>
                      <div className="radio-right">
                        <span className="series-discount-text">({s.discount} Off)</span>
                        <span className="series-price-rupees">₹{cardPrice.toLocaleString('en-IN')}</span>
                        <span className="series-bank-offer-text">With bank offer <span>₹{bankOfferPrice.toLocaleString('en-IN')}</span></span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Choose Size dropdown */}
          <div className="pdp-selection-group">
            <h3>Choose Size</h3>
            <div className="size-dropdown-wrapper">
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="pdp-size-dropdown"
              >
                <option value='Single | 72" x 36" x 6"'>Single | 72" x 36" x 6"</option>
                <option value='Double | 72" x 48" x 6"'>Double | 72" x 48" x 6"</option>
                <option value='Queen | 72" x 60" x 6"'>Queen | 72" x 60" x 6"</option>
                <option value='King | 72" x 72" x 6"'>King | 72" x 72" x 6"</option>
              </select>
            </div>
          </div>

          {/* Dynamic Pricing / Add To Cart block */}
          <div className="pdp-price-cart-container">
            
            <div className="price-summary-row">
              <div className="pdp-final-price-col">
                <span className="pdp-final-price">₹{pricing.price.toLocaleString('en-IN')}</span>
                <span className="pdp-original-price">₹{pricing.original.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                className="btn-primary pdp-add-to-cart-btn"
                onClick={() => onAddToCart({
                  id: `${product.id}-${selectedSeries}-${selectedSize.split(' ')[0]}`,
                  name: `${product.name} (${selectedSeries} - ${selectedSize.split(' ')[0]})`,
                  price: pricing.price,
                  category: product.category,
                  image: product.image
                })}
              >
                Add To Cart
              </button>
            </div>

            <p className="size-info-help-text">✔ Confirm {selectedSize.split(' | ')[1]} size fits your bed frame before ordering.</p>
          </div>

          {/* Pincode and Delivery details */}
          <div className="pdp-delivery-check">
            <form onSubmit={handlePincodeCheck} className="pincode-form">
              <MapPin size={18} className="pincode-icon" />
              <input 
                type="text" 
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter Pincode"
                className="pincode-input"
              />
              <button type="submit" className="pincode-check-btn">Check</button>
            </form>

            <div className="delivery-status-msg">
              <span className="delivery-status-bold">Get it by Tomorrow</span>
              <span className="delivery-order-within"> | Order within {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s</span>
            </div>
          </div>

          {/* Home sale banner */}
          <div className="pdp-sales-banner">
            <span className="sale-text">🔥 HOME sale ends in {countdown.hours} H : {countdown.minutes} M : {countdown.seconds} S</span>
          </div>

          {/* Bank / Payment offers horizontal grid slider */}
          <div className="pdp-bank-offers-container">
            <h3>Available Bank Offers</h3>
            <div className="bank-offers-row">
              {[
                { title: "Card Offer", details: `₹${pricing.bankOffer.toLocaleString('en-IN')} flat on major Credit Cards`, sub: "Instant 7% discount" },
                { title: "UPI-Snapmint", details: `₹${Math.round(pricing.price / 3).toLocaleString('en-IN')}/month (3 EMI)`, sub: "No Cost EMI" },
                { title: "UPI Offer", details: "Extra 2% cashbacks on instant checkout UPI payments", sub: "GPay / PhonePe" }
              ].map((b, idx) => (
                <div key={idx} className="pdp-bank-offer-card">
                  <h4>{b.title}</h4>
                  <p className="offer-details-text">{b.details}</p>
                  <span className="offer-sub-label">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
