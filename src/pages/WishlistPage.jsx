// Wishlist Page
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Star } from 'lucide-react';
import './WishlistPage.css';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, showToast } = useApp();

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <div>
            <h1 className="section-title">
              <Heart size={28} style={{ color: '#d32f2f', marginRight: 12, verticalAlign: 'bottom' }} />
              My Wishlist
            </h1>
            <p className="section-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
          <Link to="/" className="btn btn-outline">Continue Shopping <ArrowRight size={16} /></Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <Heart size={64} strokeWidth={1} />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love by clicking the heart icon on any product.</p>
            <Link to="/" className="btn btn-primary btn-lg">Browse Products <ArrowRight size={18} /></Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-card">
                <button
                  className="wishlist-card-remove"
                  onClick={() => toggleWishlist(item)}
                  aria-label="Remove from wishlist"
                >
                  <X size={16} />
                </button>

                <Link to={`/product/${item.id}`} className="wishlist-card-img">
                  <img src={item.images?.[0]} alt={item.name} />
                  {item.badge && <span className="wishlist-badge">{item.badge}</span>}
                </Link>

                <div className="wishlist-card-body">
                  <p className="wishlist-card-sub">{item.subcategory}</p>
                  <Link to={`/product/${item.id}`} className="wishlist-card-name">{item.name}</Link>

                  <div className="product-card-rating">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={12} className="star" fill={s <= Math.round(item.rating) ? '#f59e0b' : 'none'} />
                    ))}
                    <span>{item.rating}</span>
                    <span>({item.reviewCount?.toLocaleString()})</span>
                  </div>

                  <div className="product-card-price">
                    <span className="price-current">₹{item.price?.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="price-original">₹{item.originalPrice?.toLocaleString()}</span>
                    )}
                    {item.discount && (
                      <span className="price-discount">{item.discount}% off</span>
                    )}
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}
                    onClick={() => {
                      addToCart(item, item.sizes?.[0] || 'Standard');
                    }}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
