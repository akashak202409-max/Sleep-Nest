import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-badge">{product.badge || 'Best Seller'}</div>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <button 
          className="quick-add-btn" 
          onClick={() => onAddToCart(product)}
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"} 
              />
            ))}
          </div>
          <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
        </div>
        
        <div className="product-price-row">
          <span className="product-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
