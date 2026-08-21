import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { comforters } from '../data/products';
import './ComforterPage.css';

const seasons = [
  { id: 'summer', label: '☀️ Summer (Lightweight)', desc: '200 GSM' },
  { id: 'all-season', label: '🌤️ All-Season (Medium GSM)', desc: '300 GSM' },
  { id: 'autumn', label: '🍂 Autumn (Medium-Heavy)', desc: '350 GSM' },
  { id: 'winter', label: '❄️ Winter (Heavy GSM)', desc: '500+ GSM' }
];

const fillTypes = [
  { id: 'microfiber', label: 'Microfiber Fill', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', desc: 'Hypoallergenic, budget-friendly' },
  { id: 'down-alt', label: 'Down Alternative', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80', desc: 'Cruelty-free, cloud-soft' },
  { id: 'cotton', label: 'Cotton Fill', img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', desc: 'Breathable, natural' },
  { id: 'wool', label: 'Wool Blend', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', desc: 'Premium warmth, moisture-wicking' }
];

export default function ComforterPage() {
  const { addToCart } = useApp();
  const [selectedSeason, setSelectedSeason] = useState('all-season');

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 'Queen', 1);
    showToast(`Added ${product.name} to cart!`);
  };

  const products = comforters || [];

  return (
    <div className="comforter-page">
      {/* 3. Category Hero */}
      <section className="cp-hero">
        <div className="cp-hero-left">
          <div className="cp-hero-content">
            <span className="cp-tag-pill">COZY · WARM · LIGHT AS A CLOUD</span>
            <h1 className="cp-h1">Comforters to Curl Up In</h1>
            <p className="cp-sub">Soft, breathable and warm — the kind of coziness that makes mornings hard to leave.</p>
            <div className="cp-hero-actions">
              <a href="#products" className="cp-btn cp-btn-primary">Shop Comforters</a>
              <a href="#gsm-guide" className="cp-btn cp-btn-outline">Find Your Season</a>
            </div>
          </div>
        </div>
        <div className="cp-hero-right">
          <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80" alt="Made bed with fluffy comforter" loading="lazy" />
        </div>
      </section>

      {/* 4. Season Selector */}
      <section className="cp-season-sec">
        <div className="cp-container">
          <div className="cp-tabs-row">
            {seasons.map(s => (
              <div 
                key={s.id} 
                className={`cp-season-tab ${selectedSeason === s.id ? 'active' : ''}`}
                onClick={() => setSelectedSeason(s.id)}
              >
                <h4>{s.label}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Shop by Fill Type */}
      <section className="cp-fill-sec">
        <div className="cp-container">
          <div className="cp-fill-grid">
            {fillTypes.map(f => (
              <div key={f.id} className="cp-fill-card">
                <img src={f.img} alt={f.label} loading="lazy" />
                <h4>{f.label}</h4>
                <p>{f.desc}</p>
                <a href="#products" className="cp-fill-link">Shop <ChevronRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Filter + Product Grid */}
      <section id="products" className="cp-products-section">
        <div className="cp-container">
          <div className="cp-grid-layout">
            
            {/* Sidebar */}
            <aside className="cp-sidebar">
              <h3>Refine Your Search</h3>
              <div className="cp-filter-group">
                <h4>Size</h4>
                <div className="cp-chips">
                  {['Single', 'Double', 'Queen', 'King'].map(s => <button key={s} className="cp-chip">{s}</button>)}
                </div>
              </div>
              <div className="cp-filter-group">
                <h4>Season</h4>
                {['Summer', 'All-Season', 'Winter'].map(t => (
                  <label key={t} className="cp-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>
              <div className="cp-filter-group">
                <h4>Fill Weight (GSM)</h4>
                <div className="cp-chips">
                  {['150', '200', '250', '350', '500+'].map(s => <button key={s} className="cp-chip">{s}</button>)}
                </div>
              </div>
              <div className="cp-filter-group">
                <h4>Color</h4>
                <div className="cp-swatches-wrap">
                  <div className="cp-swatch" style={{background: '#FFFFF0'}} title="Ivory"></div>
                  <div className="cp-swatch" style={{background: '#F5F5DC'}} title="Beige"></div>
                  <div className="cp-swatch" style={{background: '#1E3A5F'}} title="Navy"></div>
                  <div className="cp-swatch" style={{background: '#FFD1DC'}} title="Pastel"></div>
                  <div className="cp-swatch" style={{background: '#D97757'}} title="Bold"></div>
                </div>
              </div>
            </aside>

            {/* Product Area */}
            <div className="cp-products-area">
              <div className="cp-products-grid">
                {products.map(product => (
                  <div key={product.id} className="cp-product-card">
                    <div className="cp-pc-img-wrap">
                      <img src={product.images[0] || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80'} alt={product.name} className="cp-pc-img" loading="lazy" />
                      {product.discount > 0 && <span className="cp-pc-badge">{product.discount}% OFF</span>}
                      <button className="cp-pc-wishlist"><Heart size={18} /></button>
                      <div className="cp-season-icon">🌤️</div>
                      <div className="cp-pc-hover-action">
                        <button className="cp-btn cp-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                      </div>
                    </div>
                    <div className="cp-pc-details">
                      <div className="cp-pc-features">
                        <span className="cp-pc-pill">300 GSM</span>
                        <span className="cp-pc-pill">Reversible</span>
                      </div>
                      <h3 className="cp-pc-name">{product.name}</h3>
                      <div className="cp-pc-rating">
                        <Star size={14} className="cp-star-filled" /> {product.rating} <span>({product.reviewCount})</span>
                      </div>
                      <div className="cp-pc-sizes">
                        {['S', 'D', 'Q', 'K'].map(s => <span key={s} className="cp-s-chip">{s}</span>)}
                      </div>
                      <div className="cp-pc-price-row">
                        <span className="cp-pc-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="cp-pc-orig">₹{product.originalPrice.toLocaleString()}</span>}
                      </div>
                      <p className="cp-pc-micro">Cover included</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Find Your Warmth GSM Slider */}
      <section id="gsm-guide" className="cp-gsm-sec">
        <div className="cp-container">
          <h2 className="cp-h2">Your Ideal GSM Weight</h2>
          <div className="cp-gsm-scale">
            <div className="cp-gsm-stop">
              <div className="cp-gsm-dot">150</div>
              <div className="cp-gsm-text">Perfect for summer & AC rooms</div>
            </div>
            <div className="cp-gsm-stop">
              <div className="cp-gsm-dot">250</div>
              <div className="cp-gsm-text">Great for monsoon & mild winters</div>
            </div>
            <div className="cp-gsm-stop">
              <div className="cp-gsm-dot">350</div>
              <div className="cp-gsm-text">Cozy for regular winters</div>
            </div>
            <div className="cp-gsm-stop">
              <div className="cp-gsm-dot">500+</div>
              <div className="cp-gsm-text">For deep winter warmth</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Fill Type Comparison Section */}
      <section className="cp-science-sec">
        <div className="cp-container">
          <div className="cp-science-row">
            <div className="cp-sc-img">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="Down Alternative Fluff" />
            </div>
            <div className="cp-sc-text">
              <h3>Cloud-Like Down Alternative</h3>
              <p>Experience the ultra-plush, cloud-like feel of traditional down without any of the allergens or cruelty. Our advanced microfiber fill perfectly mimics down to trap heat while remaining completely breathable and lightweight.</p>
            </div>
          </div>
          <div className="cp-science-row reverse">
            <div className="cp-sc-img">
              <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80" alt="Cotton Fill Texture" />
            </div>
            <div className="cp-sc-text">
              <h3>Naturally Breathable Cotton</h3>
              <p>Perfect for hot sleepers and Indian summers. Pure cotton fill naturally wicks away moisture and regulates your body temperature so you never wake up feeling sweaty or stuffy.</p>
            </div>
          </div>
          <div className="cp-science-row">
            <div className="cp-sc-img">
              <img src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&q=80" alt="Wool Blend" />
            </div>
            <div className="cp-sc-text">
              <h3>Premium Wool for Cold Winters</h3>
              <p>For those freezing winter nights, our wool blend comforters provide unparalleled insulation. Wool acts as a natural thermostat, adapting to your body heat to keep you perfectly warm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Mood Boards */}
      <section className="cp-mood-sec">
        <div className="cp-container">
          <h2 className="cp-h2 text-center">A Comforter for Every Style</h2>
          <div className="cp-mood-grid">
            <div className="cp-mood-card">
              <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" alt="Neutral Luxe" />
              <div className="cp-mood-text">
                <h3>Neutral Luxe</h3>
                <p>Ivory, beige, taupe tones</p>
              </div>
            </div>
            <div className="cp-mood-card">
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" alt="Modern Dark" />
              <div className="cp-mood-text">
                <h3>Modern Dark</h3>
                <p>Charcoal, navy, deep tones</p>
              </div>
            </div>
            <div className="cp-mood-card">
              <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80" alt="Boho Warm" />
              <div className="cp-mood-text">
                <h3>Boho Warm</h3>
                <p>Terracotta, mustard, prints</p>
              </div>
            </div>
            <div className="cp-mood-card">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Classic White" />
              <div className="cp-mood-text">
                <h3>Classic White</h3>
                <p>Crisp whites, hotel-inspired</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Carousel */}
      <section className="cp-carousel-sec">
        <div className="cp-container">
          <h2 className="cp-h2">Cozy Favorites</h2>
          <div className="cp-carousel">
            {products.map(product => (
              <div key={`car-${product.id}`} className="cp-product-card">
                <div className="cp-pc-img-wrap">
                  <img src={product.images[0] || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80'} alt={product.name} className="cp-pc-img" loading="lazy" />
                  <div className="cp-pc-hover-action">
                    <button className="cp-btn cp-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                  </div>
                </div>
                <div className="cp-pc-details">
                  <h3 className="cp-pc-name">{product.name}</h3>
                  <div className="cp-pc-price-row">
                    <span className="cp-pc-price">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Customer Reviews */}
      <section className="cp-reviews-sec">
        <div className="cp-container">
          <h2 className="cp-h2" style={{color: '#fff'}}>Warmth Approved by SleepNest Fam</h2>
          <div className="cp-reviews-grid">
            <div className="cp-review-card">
              <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80" alt="Review 1" />
              <div className="cp-pc-rating" style={{color: '#fff'}}>
                <Star size={14} className="cp-star-filled" /> 5.0
              </div>
              <p>"Perfect for Delhi winters! The 350 GSM is so fluffy and keeps me warm without feeling heavy. Best purchase ever."</p>
              <p style={{fontSize: '13px', color: '#7BA098', marginTop: '12px'}}>- Priya S., Delhi</p>
            </div>
            <div className="cp-review-card">
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80" alt="Review 2" />
              <div className="cp-pc-rating" style={{color: '#fff'}}>
                <Star size={14} className="cp-star-filled" /> 4.9
              </div>
              <p>"Got the AC Comforter (150 GSM) for Chennai. It's ridiculously soft and absolutely perfect for sleeping with the AC on."</p>
              <p style={{fontSize: '13px', color: '#7BA098', marginTop: '12px'}}>- Karthik V., Chennai</p>
            </div>
            <div className="cp-review-card">
              <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80" alt="Review 3" />
              <div className="cp-pc-rating" style={{color: '#fff'}}>
                <Star size={14} className="cp-star-filled" /> 5.0
              </div>
              <p>"The All-Season comforter is literally perfect for Bangalore weather year-round. It feels like sleeping in a luxury hotel."</p>
              <p style={{fontSize: '13px', color: '#7BA098', marginTop: '12px'}}>- Anita R., Bangalore</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Care & Washing Guide & 13. Size Guide */}
      <section className="cp-info-sec">
        <div className="cp-container">
          <div className="cp-info-grid">
            <div className="cp-care-guide">
              <h2 className="cp-h2">Keep Your Comforter Fluffy for Years</h2>
              <ul className="cp-care-tips">
                <li><Check size={18} color="#C9A876"/> <strong>Use a duvet cover</strong> to protect against stains</li>
                <li><Check size={18} color="#C9A876"/> <strong>Fluff daily</strong> to maintain the loft</li>
                <li><Check size={18} color="#C9A876"/> <strong>Machine wash gentle</strong> with cold water</li>
                <li><Check size={18} color="#C9A876"/> <strong>Air dry</strong> flat in shade when possible</li>
                <li><Check size={18} color="#C9A876"/> <strong>Store with lavender sachets</strong> to keep it fresh</li>
              </ul>
            </div>

            <div className="cp-size-guide">
              <h2 className="cp-h2">Comforter Size Guide</h2>
              <div className="cp-table-wrap">
                <table className="cp-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Dimensions</th>
                      <th>Recommended Bed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Single</td><td>60×90"</td><td>Single Bed</td></tr>
                    <tr><td>Double</td><td>90×100"</td><td>Double Bed</td></tr>
                    <tr><td>Queen</td><td>90×108"</td><td>Queen Bed</td></tr>
                    <tr><td>King</td><td>108×108"</td><td>King Bed</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQs */}
      <section className="cp-faq-sec">
        <div className="cp-container">
          <h2 className="cp-h2 text-center">Frequently Asked Questions</h2>
          <div className="cp-accordion">
            <details><summary>What GSM should I choose for my city?</summary><p>150 GSM is great for coastal cities (Mumbai/Chennai) or AC rooms. 250 GSM is ideal for moderate climates (Bangalore). 350+ GSM is for North Indian winters.</p></details>
            <details><summary>Is a duvet different from a comforter?</summary><p>A comforter is typically one piece (filling sewn into the cover), while a duvet is an insert meant to be used with a separate duvet cover.</p></details>
            <details><summary>Can I machine wash it at home?</summary><p>Yes! Use a gentle cycle with cold water. Ensure your machine is large enough so the comforter isn't crammed in.</p></details>
            <details><summary>How do I know it's hypoallergenic?</summary><p>Our microfiber fill is designed to resist common allergens like dust mites and mold, making it safe for allergy sufferers.</p></details>
          </div>
        </div>
      </section>

      {/* 15. Bundle Banner */}
      <section className="cp-bundle-banner">
        <div className="cp-container cp-bundle-inner">
          <h2>Complete Your Bed — Save 15% on Comforter + Bedsheet Set</h2>
        </div>
      </section>

      {/* 16. Related Categories */}
      <section className="cp-related-section">
        <div className="cp-container">
          <h3 className="cp-h3" style={{textAlign: 'center'}}>More Sleep Essentials</h3>
          <div className="cp-related-grid">
            {['Mattresses', 'Bedsheets', 'Pillows', 'Protectors'].map(cat => (
              <Link to={`/${cat.toLowerCase().replace('es','')}`} key={cat} className="cp-related-card">
                <div className="cp-rel-img"><img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&q=80" alt={cat}/></div>
                <h4>{cat}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
