import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
// We'll use the bedsheets export if it exists, otherwise fallback to an empty array (it does exist based on my check)
import { bedsheets } from '../data/products';
import './BedsheetPage.css';

const fabrics = [
  { id: 'cotton', label: '🌾 Pure Cotton', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', tc: '200–300 TC', desc: 'Breathable everyday softness' },
  { id: 'sateen', label: '✨ Sateen', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80', tc: '400–600 TC', desc: 'Silky-smooth luxury' },
  { id: 'bamboo', label: '🌿 Bamboo', img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', tc: '300 TC', desc: 'Eco-friendly & cooling' },
  { id: 'egyptian', label: '💎 Egyptian Cotton', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', tc: '600+ TC', desc: 'The gold standard' },
  { id: 'blend', label: '🧵 Poly-Cotton Blend', img: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&q=80', tc: '144–200 TC', desc: 'Durable & wrinkle-free' },
];

export default function BedsheetPage() {
  const { addToCart } = useApp();
  const [selectedFabric, setSelectedFabric] = useState('cotton');

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 'Queen', 1);
    showToast(`Added ${product.name} to cart!`);
  };

  // Ensure we have bedsheets, fallback if not
  const products = bedsheets || [];

  return (
    <div className="bedsheet-page">
      {/* 3. Category Hero */}
      <section className="bp-hero">
        <div className="bp-hero-left">
          <div className="bp-hero-content">
            <span className="bp-tag-pill">SOFT · BREATHABLE · LUXURIOUS</span>
            <h1 className="bp-h1">Bedsheets That Feel Like a Hug</h1>
            <p className="bp-sub">Woven from the finest cotton and premium blends — luxury you'll feel with every stitch.</p>
            <div className="bp-hero-actions">
              <a href="#products" className="bp-btn bp-btn-primary">Shop Bedsheets</a>
              <a href="#fabric-guide" className="bp-btn bp-btn-outline">View Fabric Guide</a>
            </div>
          </div>
        </div>
        <div className="bp-hero-right">
          <img src="/images/generated/bedsheet_hero.jpg" alt="Folded bedsheet stack macro" loading="lazy" />
        </div>
      </section>

      {/* 4 & 5. Shop by Fabric */}
      <section className="bp-fabric-tabs-sec">
        <div className="bp-container">
          <div className="bp-tabs-row">
            {fabrics.map(f => (
              <button 
                key={f.id} 
                className={`bp-fabric-tab ${selectedFabric === f.id ? 'active' : ''}`}
                onClick={() => setSelectedFabric(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bp-fabric-cards-sec">
        <div className="bp-container">
          <div className="bp-fabric-grid">
            {fabrics.map(f => (
              <div key={f.id} className="bp-fc-card">
                <img src={f.img} alt={f.label} loading="lazy" />
                <h4>{f.label.split(' ')[1]} {f.label.split(' ')[2] || ''}</h4>
                <p>{f.desc}<br/>({f.tc})</p>
                <a href="#products" className="bp-fc-link">Explore <ChevronRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Filter + Product Grid */}
      <section id="products" className="bp-products-section">
        <div className="bp-container">
          <div className="bp-grid-layout">
            
            {/* Sidebar */}
            <aside className="bp-sidebar">
              <h3>Refine Your Search</h3>
              
              <div className="bp-filter-group">
                <h4>Size</h4>
                <div className="bp-chips">
                  {['Single', 'Double', 'Queen', 'King'].map(s => <button key={s} className="bp-chip">{s}</button>)}
                </div>
              </div>

              <div className="bp-filter-group">
                <h4>Fabric</h4>
                {['Cotton', 'Sateen', 'Bamboo', 'Egyptian', 'Blend'].map(t => (
                  <label key={t} className="bp-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>

              <div className="bp-filter-group">
                <h4>Thread Count</h4>
                {['144TC', '200TC', '300TC', '400TC', '600TC+'].map(t => (
                  <label key={t} className="bp-checkbox"><input type="checkbox" /> <span>{t}</span></label>
                ))}
              </div>

              <div className="bp-filter-group">
                <h4>Color Family</h4>
                <div className="bp-color-swatches">
                  <div className="bp-swatch" style={{background: '#E8DCC4'}} title="Beige"></div>
                  <div className="bp-swatch" style={{background: '#1E3A5F'}} title="Navy"></div>
                  <div className="bp-swatch" style={{background: '#FFFFFF'}} title="White"></div>
                  <div className="bp-swatch" style={{background: '#FFD1DC'}} title="Pastel"></div>
                  <div className="bp-swatch" style={{background: '#D97757'}} title="Bold"></div>
                  <div className="bp-swatch" style={{background: 'url(https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=100&q=80)'}} title="Prints"></div>
                </div>
              </div>
            </aside>

            {/* Product Area */}
            <div className="bp-products-area">
              <div className="bp-products-header">
                <p>Showing {products.length} products</p>
                <select className="bp-sort-select">
                  <option>Popularity</option>
                  <option>Price L-H</option>
                  <option>Price H-L</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="bp-products-grid">
                {products.map(product => (
                  <div key={product.id} className="bp-product-card">
                    <div className="bp-pc-img-wrap">
                      <img src={product.images[0]} alt={product.name} className="bp-pc-img" loading="lazy" />
                      {product.discount > 0 && <span className="bp-pc-badge">{product.discount}% OFF</span>}
                      <button className="bp-pc-wishlist"><Heart size={18} /></button>
                      <div className="bp-pc-hover-action">
                        <button className="bp-btn bp-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                      </div>
                    </div>
                    <div className="bp-pc-details">
                      <span className="bp-pc-type">{product.subcategory || 'Cotton · 300TC'}</span>
                      <h3 className="bp-pc-name">{product.name}</h3>
                      <div className="bp-pc-rating">
                        <Star size={14} className="bp-star-filled" /> {product.rating} <span>({product.reviewCount})</span>
                      </div>
                      
                      <div className="bp-pc-sizes">
                        {['S', 'D', 'Q', 'K'].map(s => <span key={s} className="bp-s-chip">{s}</span>)}
                      </div>

                      <div className="bp-pc-price-row">
                        <span className="bp-pc-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="bp-pc-orig">₹{product.originalPrice.toLocaleString()}</span>}
                      </div>
                      <p className="bp-pc-micro">Includes 2 pillow covers</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Fabric Storytelling */}
      <section id="fabric-guide" className="bp-story-strip">
        <div className="bp-container">
          <h2 className="bp-h2">Feel the Difference</h2>
          <div className="bp-story-grid">
            <div className="bp-story-item">
              <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80" alt="Cotton" />
              <h4>200–300 TC Cotton</h4>
              <p>Everyday comfort, machine washable</p>
            </div>
            <div className="bp-story-item">
              <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80" alt="Sateen" />
              <h4>400–600 TC Sateen</h4>
              <p>Silky-smooth luxury with a soft sheen</p>
            </div>
            <div className="bp-story-item">
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80" alt="Bamboo" />
              <h4>Bamboo Fiber</h4>
              <p>Eco-friendly, cooling, hypoallergenic</p>
            </div>
            <div className="bp-story-item">
              <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80" alt="Egyptian Cotton" />
              <h4>Egyptian Cotton</h4>
              <p>The gold standard of premium bedding</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Thread Count Educator */}
      <section className="bp-tc-sec">
        <div className="bp-container">
          <h2 className="bp-h2">What Does Thread Count Actually Mean?</h2>
          <div className="bp-tc-scale">
            {['144', '200', '300', '400', '600'].map((tc) => (
              <div key={tc} className="bp-tc-dot" title={`${tc} TC`}>{tc}</div>
            ))}
          </div>
          <p className="bp-tc-guide">Higher TC = softer feel, but weave and fiber matter too.</p>
        </div>
      </section>

      {/* 9. Mood Board */}
      <section className="bp-mood-sec">
        <div className="bp-container">
          <h2 className="bp-h2">Style Your Bedroom</h2>
          <div className="bp-mood-grid">
            <div className="bp-mood-card">
              <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" alt="Calm Neutrals" />
              <div className="bp-mood-text">
                <h3>Calm Neutrals</h3>
                <p>Cream, beige, ivory bedsheet setups</p>
              </div>
            </div>
            <div className="bp-mood-card">
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" alt="Deep Elegance" />
              <div className="bp-mood-text">
                <h3>Deep Elegance</h3>
                <p>Navy, charcoal, forest themes</p>
              </div>
            </div>
            <div className="bp-mood-card">
              <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80" alt="Fresh Pastels" />
              <div className="bp-mood-text">
                <h3>Fresh Pastels</h3>
                <p>Mint, blush, powder blue freshness</p>
              </div>
            </div>
            <div className="bp-mood-card">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Bold Prints" />
              <div className="bp-mood-text">
                <h3>Bold Prints</h3>
                <p>Florals, geometrics, and ethnic designs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Bestseller Carousel */}
      <section className="bp-carousel-sec">
        <div className="bp-container">
          <h2 className="bp-h2">Our Most-Loved Bedsheets</h2>
          <div className="bp-carousel">
            {products.slice(0, 6).map(product => (
              <div key={`carousel-${product.id}`} className="bp-product-card">
                <div className="bp-pc-img-wrap">
                  <img src={product.images[0]} alt={product.name} className="bp-pc-img" loading="lazy" />
                  <div className="bp-pc-hover-action">
                    <button className="bp-btn bp-btn-primary" onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
                  </div>
                </div>
                <div className="bp-pc-details">
                  <h3 className="bp-pc-name">{product.name}</h3>
                  <div className="bp-pc-price-row">
                    <span className="bp-pc-price">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Customer Reviews */}
      <section className="bp-reviews-sec">
        <div className="bp-container">
          <h2 className="bp-h2" style={{color: '#fff'}}>Real Homes. Real Comfort.</h2>
          <div className="bp-reviews-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="bp-review-card">
                <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80" alt="Review photo" />
                <div className="bp-pc-rating" style={{color: '#fff'}}>
                  <Star size={14} className="bp-star-filled" /> 5.0
                </div>
                <p>"These are genuinely the softest bedsheets I've ever slept on. The sateen finish feels so luxurious!"</p>
                <span style={{fontSize: '12px', color: '#7BA098'}}><Check size={12}/> Verified Buyer</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 & 13. Care & Size Guide */}
      <section className="bp-info-sec">
        <div className="bp-container">
          <div className="bp-info-grid">
            <div className="bp-care-guide">
              <h2 className="bp-h2">How to Care for Your Bedsheets</h2>
              <ul className="bp-care-tips">
                <li><Check size={18} color="#C9A876"/> Wash cold on gentle cycle</li>
                <li><Check size={18} color="#C9A876"/> Skip fabric softener to maintain absorbency</li>
                <li><Check size={18} color="#C9A876"/> Line dry when possible to preserve fibers</li>
                <li><Check size={18} color="#C9A876"/> Iron on medium heat if needed</li>
                <li><Check size={18} color="#C9A876"/> Store in breathable cotton bags</li>
              </ul>
              <a href="#" className="bp-btn bp-btn-outline">Read Full Care Guide</a>
            </div>

            <div className="bp-size-guide">
              <h2 className="bp-h2">Bedsheet Size Guide</h2>
              <div className="bp-table-wrap">
                <table className="bp-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Flat Sheet</th>
                      <th>Fitted Sheet</th>
                      <th>Pillow Covers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Single</td><td>60×90"</td><td>36×72"</td><td>17×27"</td></tr>
                    <tr><td>Double</td><td>90×100"</td><td>48×75"</td><td>17×27" (×2)</td></tr>
                    <tr><td>Queen</td><td>90×108"</td><td>60×78"</td><td>17×27" (×2)</td></tr>
                    <tr><td>King</td><td>108×108"</td><td>72×78"</td><td>17×27" (×2)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQs */}
      <section className="bp-info-sec" style={{paddingTop: 0}}>
        <div className="bp-container">
          <h2 className="bp-h2 text-center">Frequently Asked Questions</h2>
          <div className="bp-accordion" style={{maxWidth: '800px', margin: '0 auto'}}>
            <details><summary>Which fabric is best for Indian summers?</summary><p>Pure cotton and Bamboo are highly recommended for hot summers due to their breathability and moisture-wicking properties.</p></details>
            <details><summary>Are bedsheets pre-washed?</summary><p>Yes, all our premium bedsheets are pre-washed to minimize shrinkage and ensure they are soft right out of the box.</p></details>
            <details><summary>Will colors fade after washing?</summary><p>We use high-quality, fade-resistant dyes. Following our care guide (washing in cold water and drying away from direct sunlight) ensures colors stay vibrant for years.</p></details>
            <details><summary>Can I return if the size doesn't fit?</summary><p>Yes, we offer a 30-day hassle-free return policy if the product is unused and in its original packaging.</p></details>
          </div>
        </div>
      </section>

      {/* 15. Related Categories */}
      <section className="bp-related-section">
        <div className="bp-container">
          <h3 className="bp-h3" style={{textAlign: 'center'}}>Complete Your Bed</h3>
          <div className="bp-related-grid">
            {['Mattresses', 'Pillows', 'Protectors', 'Comforters'].map(cat => (
              <Link to={`/${cat.toLowerCase().replace('es','')}`} key={cat} className="bp-related-card">
                <div className="bp-rel-img"><img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&q=80" alt={cat}/></div>
                <h4>{cat}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 16. Newsletter */}
      <section className="bp-newsletter-section">
        <div className="bp-container bp-news-inner">
          <h3>Get ₹300 off your first bedsheet set</h3>
          <form className="bp-news-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="bp-btn bp-btn-primary">Subscribe</button>
          </form>
        </div>
      </section>

    </div>
  );
}
