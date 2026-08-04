import React from 'react';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import './WishlistPage.css';

const WishlistPage = ({ wishlist, onRemoveFromWishlist, onAddToCart, onBackToShop }) => {
  return (
    <div className="wishlist-page-container">
      {/* Breadcrumbs */}
      <div className="page-breadcrumbs">
        <span onClick={onBackToShop} style={{ cursor: 'pointer' }}>Home</span> &gt; <span className="active-crumb">Wishlist</span>
      </div>

      <div className="wishlist-header-row">
        <button className="back-to-shop-btn" onClick={onBackToShop}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>
        <h1 className="wishlist-title">My Wishlist <span>({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})</span></h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty-state">
          <div className="wishlist-empty-icon-wrapper">
            <Heart size={48} className="empty-heart-icon" />
            <div className="heart-glow-ring"></div>
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite premium mattresses, pillows, and bedding accessories here. Create your ideal sleep sanctuary!</p>
          <button className="btn-accent shop-now-btn" onClick={onBackToShop}>
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div className="wishlist-img-wrapper">
                <img src={item.image} alt={item.name} className="wishlist-item-img" />
                <button 
                  className="wishlist-remove-btn" 
                  onClick={() => onRemoveFromWishlist(item.id)}
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="wishlist-card-details">
                <span className="wishlist-item-category">{item.category}</span>
                <h3 className="wishlist-item-name">{item.name}</h3>
                
                <div className="wishlist-price-row">
                  <span className="wishlist-item-price">₹{(item.basePrice || item.price || 999).toLocaleString('en-IN')}</span>
                  {item.originalPrice && (
                    <span className="wishlist-item-orig-price">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                <div className="wishlist-card-actions">
                  <button 
                    className="btn-primary wishlist-cart-btn"
                    onClick={() => onAddToCart({
                      id: `${item.id}-Default`,
                      name: `${item.name}`,
                      price: item.basePrice || item.price || 999,
                      category: item.category,
                      image: item.image
                    })}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
