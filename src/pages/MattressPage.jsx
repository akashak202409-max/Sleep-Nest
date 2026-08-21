import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, Info, Check, X, Star } from 'lucide-react';
import { mattresses } from '../data/products';
import { useApp } from '../context/AppContext';
import './MattressPage.css';

const mattressTypes = [
  { id: 'memory-foam', label: 'Memory Foam', price: '₹6,999', desc: 'Adaptive comfort that hugs your body', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
  { id: 'orthopedic', label: 'Orthopedic', price: '₹9,599', desc: 'Firm support for spinal alignment', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80' },
  { id: 'spring', label: 'Spring', price: '₹7,499', desc: 'Bouncy, breathable, and responsive', img: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=600&q=80' },
  { id: 'latex', label: 'Latex', price: '₹12,999', desc: 'Eco-friendly and naturally cooling', img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80' },
  { id: 'hybrid', label: 'Hybrid', price: '₹10,999', desc: 'The best of foam and springs', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80' },
];

export default function MattressPage() {
  const { addToCart } = useApp();
  const [selectedType, setSelectedType] = useState('memory-foam');

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 'Queen', 1);
    showToast(`Added ${product.name} to cart!`);
  };

  return (
    <div className="mattress-page">
      {/* 3. Category Hero Banner */}
      <section className="mp-hero">
        <div className="mp-hero-left">
          <div className="mp-hero-content">
            <span className="mp-tag-pill">INDIA'S #1 MATTRESS BRAND</span>
            <h1 className="mp-h1">Mattresses Built for Deeper Sleep</h1>
            <p className="mp-sub">From cloud-soft memory foam to sturdy orthopedic support — find the mattress your body's been waiting for.</p>
            <div className="mp-hero-actions">
              <Link to="/sleep-quiz" className="mp-btn mp-btn-primary">Take the Sleep Quiz</Link>
              <a href="#products" className="mp-btn mp-btn-outline">Explore Bestsellers</a>
            </div>
            <div className="mp-trust-row">
              <span className="mp-stars">★★★★★</span> 4.8/5 · 2,50,000+ happy sleepers
            </div>
          </div>
        </div>
        <div className="mp-hero-right">
          <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80" alt="Cinematic morning bedroom" loading="lazy" />
        </div>
      </section>

      {/* 4. Mattress Type Selector */}
      <section className="mp-type-selector">
        <div className="mp-container">
          <div className="mp-pills-bar">
            {mattressTypes.map((type) => (
              <button 
                key={type.id} 
                className={`mp-type-pill ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="mp-type-label">{type.label}</div>
                <div className="mp-type-price">Starting {type.price}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sub-Hero: Shop by Type Cards */}
      <section className="mp-shop-by-type">
        <div className="mp-container">
          <div className="mp-type-cards-grid">
            {mattressTypes.map((type) => (
              <div key={type.id} className="mp-type-card">
                <div className="mp-tc-img-wrap">
                  <img src={type.img} alt={type.label} loading="lazy" />
                </div>
                <div className="mp-tc-content">
                  <h3 className="mp-tc-title">{type.label}</h3>
                  <p className="mp-tc-desc">{type.desc}</p>
                  <span className="mp-tc-link">Explore <ChevronRight size={14} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 6. Filter + Product Grid */}
      <section id="products" className="mp-products-section">
        <div className="mp-container">
          <div className="mp-grid-layout">
            
            {/* Left Sidebar Filters */}
            <aside className="mp-sidebar">
              <h3 className="mp-filter-title">Refine Your Search</h3>
              <a href="#" className="mp-clear-filters">Clear all</a>
              
              <div className="mp-filter-group">
                <h4>Mattress Type</h4>
                {['Memory Foam', 'Ortho', 'Spring', 'Latex', 'Hybrid'].map(t => (
                  <label key={t} className="mp-checkbox">
                    <input type="checkbox" /> <span>{t}</span>
                  </label>
                ))}
              </div>

              <div className="mp-filter-group">
                <h4>Size</h4>
                <div className="mp-chip-group">
                  {['Single', 'Double', 'Queen', 'King', 'Custom'].map(s => (
                    <button key={s} className="mp-filter-chip">{s}</button>
                  ))}
                </div>
              </div>

              <div className="mp-filter-group">
                <h4>Firmness</h4>
                <div className="mp-firmness-slider">
                  <div className="mp-fs-labels"><span>Soft</span><span>Medium</span><span>Firm</span></div>
                  <input type="range" min="1" max="10" defaultValue="7" className="mp-slider-input" />
                </div>
              </div>
            </aside>

            {/* Right Product Grid */}
            <div className="mp-products-area">
              <div className="mp-products-header">
                <p>Showing {mattresses.length} products</p>
                <select className="mp-sort-select">
                  <option>Popularity</option>
                  <option>Price L-H</option>
                  <option>Price H-L</option>
                  <option>Newest</option>
                  <option>Rating</option>
                </select>
              </div>

              <div className="mp-products-grid">
                {mattresses.map(product => (
                  <div key={product.id} className="mp-product-card">
                    <div className="mp-pc-img-wrap">
                      <img src={product.images.length > 1 ? product.images[1] : product.images[0]} alt={product.name} loading="lazy" />
                      <span className="mp-pc-badge">{product.discount}% OFF</span>
                      <button className="mp-pc-wishlist"><Heart size={18} /></button>
                      <div className="mp-pc-hover-action">
                        <button className="mp-btn mp-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                      </div>
                    </div>
                    <div className="mp-pc-details">
                      <span className="mp-pc-type">{product.subcategory || 'Memory Foam'}</span>
                      <h3 className="mp-pc-name">{product.name}</h3>
                      <div className="mp-pc-rating">
                        <Star size={14} className="mp-star-filled" /> {product.rating} <span className="mp-review-cnt">({product.purchases})</span>
                      </div>
                      
                      <div className="mp-pc-firmness-bar">
                        <span className="mp-f-label">Soft</span>
                        <div className="mp-f-track"><div className="mp-f-marker" style={{ left: '70%' }}></div></div>
                        <span className="mp-f-label">Firm</span>
                      </div>

                      <div className="mp-pc-sizes">
                        {['S', 'D', 'Q', 'K'].map(s => <span key={s} className="mp-s-chip">{s}</span>)}
                      </div>

                      <div className="mp-pc-price-row">
                        <span className="mp-pc-price">₹{product.price.toLocaleString()}</span>
                        <span className="mp-pc-orig">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      <p className="mp-pc-emi">Or ₹541/month · No Cost EMI</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* 7. Storytelling Strip */}
      <section className="mp-story-strip">
        <div className="mp-container">
          <div className="mp-story-grid">
            <div className="mp-story-item">
              <div className="mp-icon">🌡️</div>
              <h4>Cool Comfort</h4>
              <p>Gel-infused foam keeps you cool through the night</p>
            </div>
            <div className="mp-story-item">
              <div className="mp-icon">🦴</div>
              <h4>7-Zone Support</h4>
              <p>Aligns spine and relieves pressure points</p>
            </div>
            <div className="mp-story-item">
              <div className="mp-icon">🌿</div>
              <h4>Zero Chemicals</h4>
              <p>CertiPUR-US® certified, non-toxic foams</p>
            </div>
            <div className="mp-story-item">
              <div className="mp-icon">💤</div>
              <h4>Motion Isolation</h4>
              <p>Sleep undisturbed even with a partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Comparison Table */}
      <section className="mp-comparison-section">
        <div className="mp-container">
          <h2 className="mp-h2">Which SleepNest Mattress Is Right for You?</h2>
          <div className="mp-table-wrapper">
            <table className="mp-compare-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Original</th>
                  <th>Hybrid</th>
                  <th>Latex</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Firmness</td><td>Medium Firm</td><td>Medium</td><td>Firm</td><td>Medium Soft</td></tr>
                <tr><td>Cooling</td><td>Standard</td><td>Advanced</td><td>Natural</td><td>Max Cooling</td></tr>
                <tr><td>Best For</td><td>Back Pain</td><td>Couples</td><td>Allergies</td><td>Hot Sleepers</td></tr>
                <tr><td>Rating</td><td>4.7★</td><td>4.8★</td><td>4.9★</td><td>4.9★</td></tr>
                <tr><td>Price</td><td>₹9,599</td><td>₹10,999</td><td>₹12,999</td><td>₹15,990</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. Quiz Banner */}
      <section className="mp-quiz-banner">
        <div className="mp-container mp-quiz-inner">
          <div className="mp-quiz-img">
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80" alt="Confused sleeper" />
          </div>
          <div className="mp-quiz-text">
            <h2>Take the 60-Second Sleep Quiz</h2>
            <p>Answer a few questions about how you sleep, and we'll match you with your perfect mattress.</p>
            <Link to="/sleep-quiz" className="mp-btn mp-btn-primary">Find My Mattress</Link>
          </div>
        </div>
      </section>

      {/* 10. Sleep Science Section */}
      <section className="mp-science-section">
        <div className="mp-container">
          <h2 className="mp-h2 text-center">Engineered for Deep Sleep</h2>
          
          <div className="mp-science-row">
            <div className="mp-sc-img"><img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="Mattress layers" /></div>
            <div className="mp-sc-text">
              <h3>Engineered in 5 Precision Layers</h3>
              <p>Every SleepNest mattress is built with carefully selected foams and springs that work together to provide the perfect balance of support, breathability, and plush comfort.</p>
            </div>
          </div>

          <div className="mp-science-row reverse">
            <div className="mp-sc-img"><img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&q=80" alt="Foam pressing" /></div>
            <div className="mp-sc-text">
              <h3>Memory That Molds to You</h3>
              <p>Our proprietary HALO® memory foam adapts instantly to your body shape, relieving pressure points on your hips and shoulders so you wake up pain-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Customer Reviews */}
      <section className="mp-reviews-section">
        <div className="mp-container">
          <h2 className="mp-h2 text-white">2,50,000+ Sleepers. One Loved Mattress.</h2>
          <div className="mp-reviews-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="mp-review-card">
                <div className="mp-review-header">
                  <div className="mp-reviewer-avatar">S</div>
                  <div>
                    <h4>Sneha R.</h4>
                    <span className="mp-verified"><Check size={12}/> Verified Buyer</span>
                  </div>
                </div>
                <div className="mp-stars">★★★★★</div>
                <p>"This mattress completely changed my sleep. My back pain is gone and it sleeps so cool!"</p>
                <div className="mp-review-product">SleepNest Hybrid Mattress</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 & 13. Buying Guide & FAQ */}
      <section className="mp-guide-faq-section">
        <div className="mp-container">
          <div className="mp-guide-faq-grid">
            <div className="mp-guide-content">
              <h2>How to Choose the Right Mattress</h2>
              <div className="mp-accordion">
                <details><summary>Understanding mattress types</summary><p>Memory foam is soft, ortho is firm...</p></details>
                <details><summary>Firmness and body weight</summary><p>Heavier sleepers need firmer support...</p></details>
                <details><summary>Size guide with dimensions</summary><p>Single 36×72, Queen 60×78...</p></details>
              </div>
            </div>
            <div className="mp-faq-content">
              <h2>Frequently Asked Questions</h2>
              <div className="mp-accordion">
                <details><summary>How long does it take to expand?</summary><p>Up to 48 hours for full expansion.</p></details>
                <details><summary>Can I try before I buy?</summary><p>Yes, we offer a 100-night risk-free trial.</p></details>
                <details><summary>How do I claim warranty?</summary><p>Contact our support team directly.</p></details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Related Categories */}
      <section className="mp-related-section">
        <div className="mp-container">
          <h3 className="mp-h3">Complete Your Bed</h3>
          <div className="mp-related-grid">
            {['Pillows', 'Bedsheets', 'Protectors', 'Comforters'].map(cat => (
              <Link to={`/${cat.toLowerCase()}`} key={cat} className="mp-related-card">
                <div className="mp-rel-img"><img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80" alt={cat}/></div>
                <h4>{cat}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Newsletter */}
      <section className="mp-newsletter-section">
        <div className="mp-container mp-news-inner">
          <h3>Get ₹500 off your first mattress</h3>
          <form className="mp-news-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="mp-btn mp-btn-primary">Subscribe</button>
          </form>
        </div>
      </section>

    </div>
  );
}
