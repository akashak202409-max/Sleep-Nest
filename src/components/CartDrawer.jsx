import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckoutClick }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: '20px' }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.images?.find(img => !img.endsWith('.mp4')) || item.images?.[0]} alt={item.name} className="cart-item-image" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-category">{item.category}</span>
                    <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                    
                    <div className="cart-item-quantity">
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    className="remove-btn" 
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-subtotal-row">
                <span>Subtotal</span>
                <span className="subtotal-amount">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="cart-note">Shipping, taxes, and discounts calculated at checkout.</p>
              <button 
                className="btn-accent checkout-btn"
                onClick={onCheckoutClick}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
