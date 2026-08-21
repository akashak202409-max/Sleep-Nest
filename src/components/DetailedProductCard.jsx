import { Link } from 'react-router-dom';
import { Star, Check } from 'lucide-react';
import './DetailedProductCard.css';

export default function DetailedProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="detailed-product-card">
      <div className="dpc-image-container">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
      </div>
      
      <div className="dpc-body">
        <div className="dpc-rating-row">
          <Star size={14} fill="#f97316" color="#f97316" />
          <span className="dpc-rating-text">
            {product.rating}({product.purchases} Purchases)
          </span>
        </div>
        
        <h3 className="dpc-title">{product.name}</h3>
        
        <ul className="dpc-features">
          {product.features?.map((feature, idx) => (
            <li key={idx}>
              <Check size={14} className="dpc-check-icon" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="dpc-footer">
        <div className="dpc-price-section">
          <div className="dpc-mrp-row">
            <span className="dpc-mrp">MRP ₹{product.originalPrice?.toLocaleString()}</span>
            {product.discount && (
              <span className="dpc-discount-pill">{product.discount}% OFF</span>
            )}
          </div>
          <div className="dpc-current-price-row">
            <span className="dpc-price">₹{product.price?.toLocaleString()}</span>
            <span className="dpc-tax-note">(Incl. of all taxes)</span>
          </div>
        </div>
        
        <button className="dpc-shop-btn" onClick={(e) => { e.preventDefault(); /* handle add to cart or navigate */ }}>
          Shop Now
        </button>
      </div>
    </Link>
  );
}
