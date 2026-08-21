import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { pillows } from '../data/products';
import './PillowPage.css';

const sleepPositions = [
  { id: 'side', label: 'Side Sleeper Pillow', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80', desc: 'Firm & thick to fill neck gap' },
  { id: 'back', label: 'Back Sleeper Pillow', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80', desc: 'Medium loft with cervical curve support' },
  { id: 'stomach', label: 'Stomach Sleeper Pillow', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', desc: 'Soft & thin to keep neck neutral' }
];

const materials = [
  { id: 'memory-foam', label: '🧠 Memory Foam' },
  { id: 'latex', label: '🌿 Latex' },
  { id: 'cotton', label: '🌾 Cotton' },
  { id: 'down-alt', label: '🪶 Down Alternative' },
  { id: 'cooling-gel', label: '💧 Cooling Gel' }
];

export default function PillowPage() {
  const { addToCart } = useApp();
  const [selectedPos, setSelectedPos] = useState(null);
  const [selectedMat, setSelectedMat] = useState('memory-foam');

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 'Standard', 1);
    showToast(`Added ${product.name} to cart!`);
  };

  const products = pillows || [];

  return (
    <div className="pillow-page">
      {/* 3. Category Hero */}
      <section className="pil-hero">
        <div className="pil-hero-left">
          <div className="pil-hero-content">
            <span className="pil-tag-pill">NECK SUPPORT · PRESSURE RELIEF · BETTER SLEEP</span>
            <h1 className="pil-h1">The Right Pillow. The Best Sleep.</h1>
            <p className="pil-sub">Sleep-position-tested pillows engineered for perfect neck alignment and cloud-like comfort — night after night.</p>
            <div className="pil-hero-actions">
              <a href="#products" className="pil-btn pil-btn-primary">Shop Pillows</a>
              <a href="#quiz" className="pil-btn pil-btn-outline">Take the Pillow Quiz</a>
            </div>
          </div>
        </div>
        <div className="pil-hero-right">
          <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1200&q=80" alt="Memory foam pillow with indent" loading="lazy" />
        </div>
      </section>

      {/* 4. Sleep Position Grid */}
      <section className="pil-position-sec">
        <div className="pil-container">
          <div className="pil-pos-grid">
            {sleepPositions.map(pos => (
              <div 
                key={pos.id} 
                className={`pil-pos-card ${selectedPos === pos.id ? 'active' : ''}`}
                onClick={() => setSelectedPos(pos.id)}
              >
                <img src={pos.img} alt={pos.label} loading="lazy" />
                <h4>{pos.label}</h4>
                <p>{pos.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Shop by Material */}
      <section className="pil-mat-sec">
        <div className="pil-container">
          <div className="pil-mat-row">
            {materials.map(m => (
              <div 
                key={m.id} 
                className={`pil-mat-chip ${selectedMat === m.id ? 'active' : ''}`}
                onClick={() => setSelectedMat(m.id)}
              >
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Filter + Product Grid */}
      <section id="products" className="pil-products-section">
        <div className="pil-container">
          <div className="pil-grid-layout">
            
            {/* Sidebar */}
            <aside className="pil-sidebar">
              <h3>Refine Your Search</h3>
              <div className="pil-filter-group">
                <h4>Sleep Position</h4>
                {['Side', 'Back', 'Stomach', 'Combination'].map(t => (
                  <label key={t} className="pil-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>
              <div className="pil-filter-group">
                <h4>Material</h4>
                {['Memory Foam', 'Latex', 'Cotton', 'Fiber', 'Cooling Gel'].map(t => (
                  <label key={t} className="pil-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>
              <div className="pil-filter-group">
                <h4>Firmness</h4>
                <div className="pil-visual-scale">
                  <span>Soft</span><div className="pil-scale-track"></div><span>Firm</span>
                </div>
              </div>
              <div className="pil-filter-group">
                <h4>Loft (Height)</h4>
                {['Low (3-4")', 'Medium (4-5")', 'High (5-7")'].map(t => (
                  <label key={t} className="pil-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>
              <div className="pil-filter-group">
                <h4>Size</h4>
                <div className="pil-chips">
                  {['Standard', 'Queen', 'King', 'Kids'].map(s => <button key={s} className="pil-chip">{s}</button>)}
                </div>
              </div>
            </aside>

            {/* Product Area */}
            <div className="pil-products-area">
              <div className="pil-products-grid">
                {products.map(product => (
                  <div key={product.id} className="pil-product-card">
                    <div className="pil-pc-img-wrap">
                      <img src={product.images[0] || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80'} alt={product.name} className="pil-pc-img" loading="lazy" />
                      {product.discount > 0 && <span className="pil-pc-badge">{product.discount}% OFF</span>}
                      <button className="pil-pc-wishlist"><Heart size={18} /></button>
                      <div className="pil-pc-bestfor">For Neck Pain</div>
                      <div className="pil-pc-hover-action">
                        <button className="pil-btn pil-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                      </div>
                    </div>
                    <div className="pil-pc-details">
                      <div className="pil-pc-features">
                        <span className="pil-pc-pill">Memory Foam</span>
                        <span className="pil-pc-pill">Cooling Gel</span>
                      </div>
                      <h3 className="pil-pc-name">{product.name}</h3>
                      <div className="pil-pc-rating">
                        <Star size={14} className="pil-star-filled" /> {product.rating} <span>({product.reviewCount})</span>
                      </div>
                      
                      <div className="pil-pc-firmness">
                        Soft <div className="pil-f-track"><div className="pil-f-marker" style={{left: '60%'}}></div></div> Firm
                      </div>
                      <div className="pil-pc-loft">
                        Loft: 
                        <span className="pil-loft-dot">Low</span>
                        <span className="pil-loft-dot active">Med</span>
                        <span className="pil-loft-dot">High</span>
                      </div>

                      <div className="pil-pc-sizes">
                        {['Std', 'Q', 'K'].map(s => <span key={s} className="pil-s-chip">{s}</span>)}
                      </div>
                      <div className="pil-pc-price-row">
                        <span className="pil-pc-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="pil-pc-orig">₹{product.originalPrice.toLocaleString()}</span>}
                      </div>
                      <p className="pil-pc-micro">Removable washable cover</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Sleep Position Educator */}
      <section className="pil-edu-sec">
        <div className="pil-container">
          <h2 className="pil-h2">Sleep in Your Position, Perfectly Aligned</h2>
          <div className="pil-edu-grid">
            <div className="pil-edu-card">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80" alt="Side Sleeper" />
              <h4>Side Sleeper</h4>
              <p>Fill the gap between shoulder and neck. Look for firm, high-loft pillows.</p>
            </div>
            <div className="pil-edu-card">
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80" alt="Back Sleeper" />
              <h4>Back Sleeper</h4>
              <p>Support the natural cervical curve. Choose medium loft, medium firmness.</p>
            </div>
            <div className="pil-edu-card">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80" alt="Stomach Sleeper" />
              <h4>Stomach Sleeper</h4>
              <p>Keep spine neutral. A soft, thin pillow prevents neck strain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Material Deep-Dive */}
      <section className="pil-science-sec">
        <div className="pil-container">
          <div className="pil-science-row">
            <div className="pil-sc-img">
              <img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&q=80" alt="Memory Foam" />
            </div>
            <div className="pil-sc-text">
              <h3>Molds Perfectly to Your Neck</h3>
              <p>Our memory foam pillows adapt to the exact contours of your head and neck, relieving pressure points and absorbing motion so you sleep deeply.</p>
            </div>
          </div>
          <div className="pil-science-row reverse">
            <div className="pil-sc-img">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="Latex" />
            </div>
            <div className="pil-sc-text">
              <h3>Bouncy Support with Natural Cooling</h3>
              <p>Naturally derived from rubber trees, our latex pillows offer responsive, buoyant support and feature an open-cell structure for maximum airflow.</p>
            </div>
          </div>
          <div className="pil-science-row">
            <div className="pil-sc-img">
              <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80" alt="Cooling Gel" />
            </div>
            <div className="pil-sc-text">
              <h3>Stay Cool All Night Long</h3>
              <p>Tired of flipping your pillow to the cool side? Our advanced cooling gel layer dissipates body heat instantly, keeping your head perfectly cool.</p>
            </div>
          </div>
          <div className="pil-science-row reverse">
            <div className="pil-sc-img">
              <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80" alt="Down Alt" />
            </div>
            <div className="pil-sc-text">
              <h3>Cloud-Soft, Cruelty-Free Comfort</h3>
              <p>Experience the ultra-plush, huggable feel of traditional down in a 100% vegan, hypoallergenic microfiber alternative that won't clump.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Health Benefits */}
      <section className="pil-health-sec">
        <div className="pil-container">
          <h2 className="pil-h2" style={{color: '#fff'}}>A Better Pillow = A Better You</h2>
          <div className="pil-health-grid">
            <div>
              <div className="pil-icon">🦴</div>
              <h4>Neck Pain Relief</h4>
              <p>Wake up without stiffness</p>
            </div>
            <div>
              <div className="pil-icon">😴</div>
              <h4>Deeper Sleep</h4>
              <p>Aligned spine = fewer wake-ups</p>
            </div>
            <div>
              <div className="pil-icon">🧘</div>
              <h4>Better Posture</h4>
              <p>Long-term spine health</p>
            </div>
            <div>
              <div className="pil-icon">😌</div>
              <h4>Less Snoring</h4>
              <p>Open airways with proper elevation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Cross Section */}
      <section className="pil-layers-sec">
        <div className="pil-container">
          <div className="pil-science-row">
            <div className="pil-sc-img">
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80" alt="Layers" />
            </div>
            <div className="pil-sc-text">
              <h2 className="pil-h2">What's Inside Matters Most</h2>
              <ul className="pil-layers-list">
                <li>
                  <h4>1. Cooling Ice-Silk Cover</h4>
                  <p>A removable, machine-washable outer shell that feels instantly cool to the touch.</p>
                </li>
                <li>
                  <h4>2. Orthopedic Memory Foam Core</h4>
                  <p>High-density foam that provides the perfect balance of sink and support.</p>
                </li>
                <li>
                  <h4>3. Ventilated Base</h4>
                  <p>Pin-core holes punched through the foam to ensure constant air circulation.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Quiz Banner */}
      <section id="quiz" className="pil-quiz-sec">
        <div className="pil-container pil-quiz-inner">
          <div className="pil-quiz-img">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" alt="Confused sleeper" />
          </div>
          <div>
            <h2 className="pil-h2" style={{marginBottom: '16px'}}>Not Sure Which Pillow?</h2>
            <p style={{fontSize: '18px', color: '#6B7A8F', marginBottom: '24px'}}>Take our 30-second quiz to find your perfect match based on how you sleep.</p>
            <button className="pil-btn pil-btn-primary">Take the Quiz</button>
          </div>
        </div>
      </section>

      {/* 13. Special Categories */}
      <section className="pil-spec-sec">
        <div className="pil-container">
          <h2 className="pil-h2 text-center">Specialty Sleep Support</h2>
          <div className="pil-spec-grid">
            <div className="pil-spec-card">
              <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80" alt="Pregnancy" />
              <div className="pil-spec-text"><h3>Pregnancy Pillows</h3></div>
            </div>
            <div className="pil-spec-card">
              <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80" alt="Kids" />
              <div className="pil-spec-text"><h3>Kids Pillows</h3></div>
            </div>
            <div className="pil-spec-card">
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80" alt="Orthopedic" />
              <div className="pil-spec-text"><h3>Orthopedic Pillows</h3></div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Comparison Table */}
      <section className="pil-compare-sec">
        <div className="pil-container">
          <h2 className="pil-h2 text-center">Which Pillow Is Right for You?</h2>
          <div className="pil-table-wrap">
            <table className="pil-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Memory Foam</th>
                  <th>Latex</th>
                  <th>Cotton</th>
                  <th>Down Alt</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Firmness</td><td>Medium to Firm</td><td>Medium</td><td>Soft</td><td>Ultra Soft</td></tr>
                <tr><td>Cooling</td><td>Medium (Gel added)</td><td>High</td><td>High</td><td>Medium</td></tr>
                <tr><td>Support</td><td>Excellent (Contouring)</td><td>Excellent (Bouncy)</td><td>Low</td><td>Low to Medium</td></tr>
                <tr><td>Best For</td><td>Neck Pain</td><td>Hot Sleepers</td><td>Kids / Soft Lovers</td><td>Stomach Sleepers</td></tr>
                <tr><td>Washability</td><td>Cover Only</td><td>Cover Only</td><td>Fully Washable</td><td>Fully Washable</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 15. Reviews */}
      <section className="pil-reviews-sec">
        <div className="pil-container">
          <h2 className="pil-h2" style={{color: '#fff', textAlign: 'center'}}>Life-Changing Comfort</h2>
          <div className="pil-reviews-grid">
            <div className="pil-review-card">
              <div className="pil-review-user">
                <div className="pil-avatar">S</div>
                <div>
                  <h4>Sanjana T.</h4>
                  <span style={{fontSize: '12px', color: '#7BA098'}}><Check size={12}/> Verified Buyer</span>
                </div>
              </div>
              <div className="pil-pc-rating" style={{color: '#fff', margin: '12px 0'}}><Star size={14} className="pil-star-filled" /> 5.0</div>
              <p>"I've struggled with cervical spondylosis for years. This contour memory foam pillow literally changed my life. Zero neck pain in the morning!"</p>
            </div>
            <div className="pil-review-card">
              <div className="pil-review-user">
                <div className="pil-avatar">V</div>
                <div>
                  <h4>Vikram A.</h4>
                  <span style={{fontSize: '12px', color: '#7BA098'}}><Check size={12}/> Verified Buyer</span>
                </div>
              </div>
              <div className="pil-pc-rating" style={{color: '#fff', margin: '12px 0'}}><Star size={14} className="pil-star-filled" /> 5.0</div>
              <p>"The cooling gel layer actually works. I used to wake up sweating, but this pillow stays cool all night."</p>
            </div>
            <div className="pil-review-card">
              <div className="pil-review-user">
                <div className="pil-avatar">M</div>
                <div>
                  <h4>Megha R.</h4>
                  <span style={{fontSize: '12px', color: '#7BA098'}}><Check size={12}/> Verified Buyer</span>
                </div>
              </div>
              <div className="pil-pc-rating" style={{color: '#fff', margin: '12px 0'}}><Star size={14} className="pil-star-filled" /> 5.0</div>
              <p>"Bought the down alternative for my stomach-sleeping habit. It's so thin and squishy, absolutely perfect alignment."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 16 & 17. Care & Size Guide */}
      <section className="pil-science-sec">
        <div className="pil-container">
          <div className="pil-science-row">
            <div>
              <h2 className="pil-h2">Care Guide</h2>
              <ul className="pil-layers-list">
                <li><Check size={18} color="#1E3A5F"/> Wash removable cover monthly</li>
                <li><Check size={18} color="#1E3A5F"/> Fluff daily to maintain shape</li>
                <li><Check size={18} color="#1E3A5F"/> Replace every 2–3 years for hygiene</li>
                <li><Check size={18} color="#1E3A5F"/> <strong>Never</strong> machine wash memory foam core</li>
              </ul>
            </div>
            <div>
              <h2 className="pil-h2">Size Guide</h2>
              <div className="pil-table-wrap" style={{marginTop: 0}}>
                <table className="pil-table">
                  <thead>
                    <tr><th>Size</th><th>Dimensions</th><th>Best For</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Standard</td><td>17×27"</td><td>Single/Twin beds</td></tr>
                    <tr><td>Queen</td><td>17×27"</td><td>Most bedrooms</td></tr>
                    <tr><td>King</td><td>17×36"</td><td>King beds, tall people</td></tr>
                    <tr><td>Kids</td><td>12×20"</td><td>Ages 3–10</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 18. FAQ */}
      <section className="pil-faq-sec">
        <div className="pil-container">
          <h2 className="pil-h2 text-center">Frequently Asked Questions</h2>
          <div className="pil-accordion">
            <details><summary>How long do pillows last?</summary><p>A good quality memory foam or latex pillow lasts 2-3 years, while cotton or microfiber pillows should be replaced every 1-2 years.</p></details>
            <details><summary>Is memory foam safe to sleep on?</summary><p>Yes, all our memory foam is CertiPUR-US® certified, meaning it's made without harmful chemicals and has low VOC emissions.</p></details>
            <details><summary>Which pillow helps with snoring?</summary><p>A medium-high loft memory foam or orthopedic pillow helps elevate your head, keeping airways open to reduce snoring.</p></details>
            <details><summary>Are the covers machine washable?</summary><p>Yes! Our outer bamboo and ice-silk covers are completely removable and machine washable.</p></details>
          </div>
        </div>
      </section>

      {/* 19. Bundle Banner */}
      <section className="pil-bundle-sec">
        <div className="pil-container">
          <h2 className="pil-h2" style={{color: '#fff', margin: 0}}>Complete your sleep set — Save ₹1000 on Mattress + Pillow bundle</h2>
        </div>
      </section>

      {/* 20. Related */}
      <section className="pil-related-section">
        <div className="pil-container">
          <h3 className="pil-h3" style={{textAlign: 'center'}}>Complete Your Bed</h3>
          <div className="pil-related-grid">
            {['Mattresses', 'Bedsheets', 'Comforters', 'Protectors'].map(cat => (
              <Link to={`/${cat.toLowerCase().replace('es','')}`} key={cat} className="pil-related-card">
                <div className="pil-rel-img"><img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&q=80" alt={cat}/></div>
                <h4>{cat}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
