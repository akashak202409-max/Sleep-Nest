import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { protectors } from '../data/products';
import './ProtectorPage.css';

const protectorTypes = [
  { id: 'fitted', label: 'Fitted Waterproof Protector', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', desc: 'Most popular waterproof fit' },
  { id: 'encasement', label: 'Zippered Encasement', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', desc: 'Full 6-sided protection' },
  { id: 'terry', label: 'Terry Cotton Protector', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80', desc: 'Soft, breathable, quiet' },
  { id: 'cooling', label: 'Cooling Protector', img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', desc: 'With cooling gel layer' }
];

export default function ProtectorPage() {
  const { addToCart } = useApp();
  
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 'Queen', 1);
    showToast(`Added ${product.name} to cart!`);
  };

  const products = protectors || [];

  return (
    <div className="protector-page">
      {/* 3. Category Hero */}
      <section className="pp-hero">
        <div className="pp-hero-left">
          <div className="pp-hero-content">
            <span className="pp-tag-pill">WATERPROOF · HYPOALLERGENIC · MACHINE WASHABLE</span>
            <h1 className="pp-h1">Protection Your Mattress Deserves</h1>
            <p className="pp-sub">Guard against spills, sweat, dust mites and allergens — without changing the feel of your mattress.</p>
            <div className="pp-hero-actions">
              <a href="#products" className="pp-btn pp-btn-primary">Shop Protectors</a>
              <a href="#demo" className="pp-btn pp-btn-outline">See How It Works</a>
            </div>
          </div>
        </div>
        <div className="pp-hero-right">
          <div className="pp-hero-split-img">
            <img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&q=80" alt="Water beading" className="pp-split-1" />
            <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80" alt="Fitted protector" className="pp-split-2" />
          </div>
        </div>
      </section>

      {/* 4. Trust Bar */}
      <section className="pp-trust-bar">
        <div className="pp-container">
          <div className="pp-trust-grid">
            <div className="pp-trust-item"><span>💧</span> 100% Waterproof</div>
            <div className="pp-trust-item"><span>🌬️</span> Breathable</div>
            <div className="pp-trust-item"><span>🦠</span> Anti-Microbial</div>
            <div className="pp-trust-item"><span>🌿</span> Hypoallergenic</div>
            <div className="pp-trust-item"><span>🧺</span> Machine Washable</div>
          </div>
        </div>
      </section>

      {/* 5. Shop by Type Cards */}
      <section className="pp-type-cards-sec">
        <div className="pp-container">
          <div className="pp-type-grid">
            {protectorTypes.map(t => (
              <div key={t.id} className="pp-tc-card">
                <img src={t.img} alt={t.label} loading="lazy" />
                <h4>{t.label}</h4>
                <p>{t.desc}</p>
                <a href="#products" className="pp-tc-link">Shop <ChevronRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Filter + Product Grid */}
      <section id="products" className="pp-products-section">
        <div className="pp-container">
          <div className="pp-grid-layout">
            
            {/* Sidebar */}
            <aside className="pp-sidebar">
              <h3>Refine Your Search</h3>
              <div className="pp-filter-group">
                <h4>Size</h4>
                <div className="pp-chips">
                  {['Single', 'Double', 'Queen', 'King', 'Custom'].map(s => <button key={s} className="pp-chip">{s}</button>)}
                </div>
              </div>
              <div className="pp-filter-group">
                <h4>Type</h4>
                {['Fitted', 'Encasement', 'Terry', 'Cooling'].map(t => (
                  <label key={t} className="pp-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>
              <div className="pp-filter-group">
                <h4>Waterproof Level</h4>
                <label className="pp-checkbox"><input type="checkbox" /> <span>100% Waterproof</span></label>
                <label className="pp-checkbox"><input type="checkbox" /> <span>Water-Resistant</span></label>
              </div>
              <div className="pp-filter-group">
                <h4>Features</h4>
                {['Anti-Microbial', 'Hypoallergenic', 'Dust-Mite Proof', 'Silent'].map(t => (
                  <label key={t} className="pp-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>
              <div className="pp-filter-group" style={{borderBottom: 'none'}}>
                <h4>Depth</h4>
                <div className="pp-chips">
                  {['5"', '8"', '10"', '12"', '15"'].map(s => <button key={s} className="pp-chip">Fits {s}</button>)}
                </div>
              </div>
            </aside>

            {/* Product Area */}
            <div className="pp-products-area">
              <div className="pp-products-grid">
                {products.map(product => (
                  <div key={product.id} className="pp-product-card">
                    <div className="pp-pc-img-wrap">
                      <img src={product.images[0]} alt={product.name} className="pp-pc-img" loading="lazy" />
                      {product.discount > 0 && <span className="pp-pc-badge">{product.discount}% OFF</span>}
                      <button className="pp-pc-wishlist"><Heart size={18} /></button>
                      <div className="pp-shield-icon">🛡️</div>
                      <div className="pp-pc-hover-action">
                        <button className="pp-btn pp-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                      </div>
                    </div>
                    <div className="pp-pc-details">
                      <div className="pp-pc-features">
                        <span className="pp-pc-pill">Waterproof</span>
                        <span className="pp-pc-pill">Anti-Microbial</span>
                      </div>
                      <h3 className="pp-pc-name">{product.name}</h3>
                      <div className="pp-pc-rating">
                        <Star size={14} className="pp-star-filled" /> {product.rating} <span>({product.reviewCount})</span>
                      </div>
                      
                      <div className="pp-pc-sizes">
                        {['S', 'D', 'Q', 'K'].map(s => <span key={s} className="pp-s-chip">{s}</span>)}
                      </div>
                      <p className="pp-pc-micro">Fits mattresses 5–12" thick</p>

                      <div className="pp-pc-price-row">
                        <span className="pp-pc-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="pp-pc-orig">₹{product.originalPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Why You Need a Protector */}
      <section className="pp-edu-sec">
        <div className="pp-container">
          <h2 className="pp-h2" style={{textAlign: 'center'}}>One Small Layer. A World of Protection.</h2>
          <div className="pp-edu-grid">
            <div className="pp-edu-item">
              <div className="pp-icon">💧</div>
              <h4>Blocks Liquids</h4>
              <p>Spills, sweat, and accidents never reach your mattress</p>
            </div>
            <div className="pp-edu-item">
              <div className="pp-icon">🦠</div>
              <h4>Stops Allergens</h4>
              <p>Dust mites, pet dander, and bacteria kept out</p>
            </div>
            <div className="pp-edu-item">
              <div className="pp-icon">🛏️</div>
              <h4>Extends Mattress Life</h4>
              <p>Adds years to your investment</p>
            </div>
            <div className="pp-edu-item">
              <div className="pp-icon">✅</div>
              <h4>Protects Warranty</h4>
              <p>Keeps your mattress warranty valid</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Demo Video */}
      <section id="demo" className="pp-video-sec">
        <div className="pp-container">
          <div className="pp-video-wrap">
            <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1200&q=80" alt="Video thumbnail" />
            <div className="pp-play-btn">▶</div>
            <div className="pp-video-caption">Watch how our protectors handle real spills</div>
          </div>
          <div className="pp-stat-cards">
            <div className="pp-stat-card">5-layer barrier</div>
            <div className="pp-stat-card">200ml water block test</div>
            <div className="pp-stat-card">3-year replacement warranty</div>
          </div>
        </div>
      </section>

      {/* 9. Cross Section */}
      <section className="pp-science-sec">
        <div className="pp-container">
          <div className="pp-science-grid">
            <div className="pp-sc-img">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="Layers" />
            </div>
            <div className="pp-sc-text">
              <h2 className="pp-h2">Engineered in 3 Precision Layers</h2>
              <ul className="pp-layers-list">
                <li>
                  <h4>1. Terry Cotton Top</h4>
                  <p>Ultra-soft, breathable, and silent. Absorbs moisture while keeping you cool.</p>
                </li>
                <li>
                  <h4>2. TPU Waterproof Membrane</h4>
                  <p>100% waterproof barrier that blocks liquids but allows air to flow.</p>
                </li>
                <li>
                  <h4>3. Skirt with Elastic</h4>
                  <p>Deep pocket stretch skirt ensures a snug fit that won't slip.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Use Cases */}
      <section className="pp-usecase-sec">
        <div className="pp-container">
          <h2 className="pp-h2" style={{textAlign: 'center'}}>Perfect for Every Home</h2>
          <div className="pp-usecase-grid">
            <div className="pp-usecase-card">
              <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80" alt="Kids" />
              <h4>👶 Homes with Kids</h4>
              <p>Bedwetting protection, spill-proof</p>
            </div>
            <div className="pp-usecase-card">
              <img src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80" alt="Pets" />
              <h4>🐕 Pet-Friendly Homes</h4>
              <p>Fur, drool, accidents covered</p>
            </div>
            <div className="pp-usecase-card">
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80" alt="Allergy" />
              <h4>🤧 Allergy Sufferers</h4>
              <p>Hypoallergenic barrier</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Comparison */}
      <section className="pp-comparison-sec">
        <div className="pp-container">
          <h2 className="pp-h2 text-center">Which Protector Fits Your Needs?</h2>
          <div className="pp-table-wrap">
            <table className="pp-compare-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Fitted</th>
                  <th>Encasement</th>
                  <th>Terry</th>
                  <th>Cooling</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Waterproof</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>Bed Bug Proof</td><td>No</td><td>Yes (6-sided)</td><td>No</td><td>No</td></tr>
                <tr><td>Depth Fit</td><td>Up to 12"</td><td>Up to 15"</td><td>Up to 10"</td><td>Up to 12"</td></tr>
                <tr><td>Breathability</td><td>High</td><td>Medium</td><td>Very High</td><td>Maximum</td></tr>
                <tr><td>Ideal For</td><td>Everyday</td><td>Allergies</td><td>Softness</td><td>Hot Sleepers</td></tr>
                <tr><td>Price</td><td>₹899</td><td>₹1,499</td><td>₹1,199</td><td>₹1,699</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 12. Care & Installation */}
      <section className="pp-care-sec">
        <div className="pp-container">
          <div className="pp-care-grid">
            <div className="pp-care-img">
              <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80" alt="Installation" />
            </div>
            <div className="pp-care-text">
              <h2 className="pp-h2">Care & Installation Guide</h2>
              <ul className="pp-care-tips">
                <li><Check size={18} color="#C9A876"/> <strong>Machine wash cold</strong> with mild detergent</li>
                <li><Check size={18} color="#C9A876"/> <strong>Tumble dry low</strong> or line dry</li>
                <li><Check size={18} color="#C9A876"/> <strong>Do not bleach</strong> or iron (damages TPU layer)</li>
                <li><Check size={18} color="#C9A876"/> <strong>Wash every 1–2 months</strong> for best hygiene</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Reviews */}
      <section className="pp-reviews-sec">
        <div className="pp-container">
          <h2 className="pp-h2" style={{color: '#fff'}}>Trusted by Parents & Pet Owners</h2>
          <div className="pp-reviews-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="pp-review-card">
                <div className="pp-review-user">
                  <div className="pp-avatar">R</div>
                  <div>
                    <h4>Rahul M.</h4>
                    <span style={{fontSize: '12px', color: '#7BA098'}}><Check size={12}/> Verified Buyer</span>
                  </div>
                </div>
                <div className="pp-pc-rating" style={{color: '#fff', margin: '12px 0'}}>
                  <Star size={14} className="pp-star-filled" /> 5.0
                </div>
                <p>"Saved my expensive mattress from my toddler's juice spill! Completely waterproof and doesn't make any crinkly noise."</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Bundle Banner */}
      <section className="pp-bundle-banner">
        <div className="pp-container pp-bundle-inner">
          <h2 className="pp-h2" style={{color: '#fff', margin: 0}}>Save ₹500 — Bundle any Mattress + Protector</h2>
          <Link to="/mattress" className="pp-btn pp-btn-outline" style={{borderColor: '#fff', color: '#fff'}}>Explore Bundles <ChevronRight size={16}/></Link>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="pp-faq-sec">
        <div className="pp-container">
          <h2 className="pp-h2 text-center">Frequently Asked Questions</h2>
          <div className="pp-accordion">
            <details><summary>Will a protector change how my mattress feels?</summary><p>No, our protectors are ultra-thin and flexible so you won't even notice they are there.</p></details>
            <details><summary>Is it noisy when I move?</summary><p>Our Terry Cotton and Bamboo protectors are completely silent with no crinkly plastic sounds.</p></details>
            <details><summary>How often should I wash it?</summary><p>We recommend washing every 1-2 months, or immediately after a spill.</p></details>
            <details><summary>Does it work on all mattress types?</summary><p>Yes! It works on memory foam, spring, latex, and hybrid mattresses.</p></details>
          </div>
        </div>
      </section>

      {/* 16. Related */}
      <section className="pp-related-section">
        <div className="pp-container">
          <h3 className="pp-h3" style={{textAlign: 'center'}}>Complete Your Bed</h3>
          <div className="pp-related-grid">
            {['Mattresses', 'Bedsheets', 'Pillows', 'Comforters'].map(cat => (
              <Link to={`/${cat.toLowerCase().replace('es','')}`} key={cat} className="pp-related-card">
                <div className="pp-rel-img"><img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&q=80" alt={cat}/></div>
                <h4>{cat}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
