import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CategoryProductCard.css';

export default function CategoryProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="category-product-card">
      <div className="cpc-image-wrapper">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        
        {/* Badges */}
        {product.badge && (
          <div className="cpc-badge-left">{product.badge}</div>
        )}
        {product.discount && (
          <div className="cpc-badge-right">{product.discount}% OFF</div>
        )}
        
        {/* Wishlist Button */}
        <button 
          className="cpc-wishlist-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Wishlist toggle logic
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="cpc-body">
        <h3 className="cpc-title">{product.name}</h3>
        
        <div className="cpc-price-row">
          <span className="cpc-current-price">₹{product.price?.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="cpc-original-price">₹{product.originalPrice?.toLocaleString()}</span>
          )}
        </div>
        
        <div className="cpc-rating-row">
          <Star size={14} fill="#f97316" color="#f97316" />
          <span className="cpc-rating-text">
            <strong>{product.rating}</strong> ({product.reviewCount} reviews)
          </span>
        </div>
        
        <button 
          className="cpc-add-cart-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to cart logic
          }}
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
