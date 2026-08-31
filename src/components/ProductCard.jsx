// ProductCard Component
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const navigate = useNavigate();
  const [hoveredImg, setHoveredImg] = useState(0);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes?.[0] || 'Standard';
    addToCart(product, size);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card" style={{ display: 'block', textDecoration: 'none' }}>
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 2,
          background: 'var(--primary)', color: 'var(--white)',
          fontSize: '10px', fontWeight: 700, padding: '3px 8px',
          borderRadius: 'var(--radius-full)', letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {product.badge}
        </div>
      )}

      {/* Discount */}
      {product.discount && (
        <div style={{
          position: 'absolute', top: product.badge ? 38 : 12, left: 12, zIndex: 2,
          background: 'var(--accent)', color: 'var(--primary-dark)',
          fontSize: '10px', fontWeight: 800, padding: '3px 8px',
          borderRadius: 'var(--radius-full)',
        }}>
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist */}
      <button
        className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <div className="product-card-image">
        {(() => {
          const images = product.images?.filter(img => !img.endsWith('.mp4')) || [];
          const displayImage = images[hoveredImg] || images[0];
          return (
            <img
              src={displayImage}
              alt={product.name}
              loading="lazy"
              onMouseEnter={() => images.length > 1 && setHoveredImg(1)}
              onMouseLeave={() => setHoveredImg(0)}
            />
          );
        })()}
        {/* Hover Actions — use buttons instead of links to avoid nested <a> */}
        <div className="product-card-actions">
          <button
            className="btn btn-gold btn-sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
          <button
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--primary)', border: 'none' }}
            onClick={handleNavigate}
          >
            <Eye size={14} /> View
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card-body">
        <p style={{ fontSize: '11px', color: 'var(--accent-dark)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          {product.subcategory}
        </p>
        <h3 className="product-card-name">{product.name}</h3>

        {/* Rating */}
        <div className="product-card-rating">
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={12} className="star" fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'} />
            ))}
          </div>
          <span>{product.rating}</span>
          <span>({product.reviewCount?.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="product-card-price">
          <span className="price-current">₹{product.price?.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice?.toLocaleString()}</span>
          )}
          {product.discount && (
            <span className="price-discount">{product.discount}% off</span>
          )}
        </div>

        {/* Features */}
        {!compact && product.features && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
            {product.features.slice(0, 2).map((f) => (
              <span key={f} style={{
                fontSize: '10px',
                padding: '2px 8px',
                background: 'var(--cream)',
                color: 'var(--gray-600)',
                borderRadius: 'var(--radius-full)',
                fontWeight: 500,
              }}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
