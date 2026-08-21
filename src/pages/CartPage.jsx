// Cart Page
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, showToast } = useApp();
  const navigate = useNavigate();

  const shipping = 0; // Free shipping
  const discount = Math.round(cartTotal * 0.05); // 5% loyalty discount
  const gst = Math.round((cartTotal - discount) * 0.18);
  const finalTotal = cartTotal - discount + gst;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="cart-empty-inner">
            <div className="cart-empty-icon">
              <ShoppingBag size={64} strokeWidth={1} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet. Let's fix that!</p>
            <Link to="/" className="btn btn-primary btn-lg">
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <h1 className="section-title">Shopping Cart</h1>
          <p className="section-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {/* Free Shipping Notice */}
            <div className="cart-notice">
              <Truck size={16} />
              <span>🎉 You qualify for <strong>FREE Delivery!</strong></span>
            </div>

            {cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-img">
                  <img src={item.images?.[0]} alt={item.name} />
                </Link>
                <div className="cart-item-body">
                  <div className="cart-item-top">
                    <div>
                      <p className="cart-item-sub">{item.subcategory}</p>
                      <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                      {item.selectedSize && (
                        <p className="cart-item-size">Size: <strong>{item.selectedSize}</strong></p>
                      )}
                    </div>
                    <button
                      className="cart-remove"
                      onClick={() => { removeFromCart(item.cartId); showToast('Item removed', 'info'); }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    {/* Qty */}
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.cartId, item.qty - 1)} disabled={item.qty <= 1}>
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.cartId, item.qty + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="cart-item-price">
                      <span className="cart-price">₹{(item.price * item.qty).toLocaleString()}</span>
                      {item.qty > 1 && (
                        <span className="cart-unit-price">₹{item.price.toLocaleString()} each</span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="cart-item-tags">
                    <span className="cart-tag"><Shield size={11} /> 100-Night Trial</span>
                    <span className="cart-tag"><Truck size={11} /> Free Delivery</span>
                    {item.discount && (
                      <span className="cart-tag cart-tag-gold">{item.discount}% OFF Applied</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="coupon-section">
              <Tag size={16} />
              <input type="text" placeholder="Enter coupon code" className="coupon-input" />
              <button className="btn btn-outline">Apply</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-tag">FREE</span>
                </div>
                <div className="summary-row discount">
                  <span>Loyalty Discount (5%)</span>
                  <span>- ₹{discount.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
              </div>

              <div className="summary-divider" />
              <div className="summary-total">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
              <p className="summary-saving">
                You save ₹{(cartTotal * 0.5 + discount).toLocaleString()} on this order! 🎉
              </p>

              <button
                className="btn btn-gold btn-lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="summary-trust">
                <div className="summary-trust-item"><Shield size={14} /> Secure Checkout</div>
                <div className="summary-trust-item">🔒 SSL Encrypted</div>
                <div className="summary-trust-item">💳 Multiple Payment Options</div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods-card">
              <p className="payment-methods-title">Accepted Payments</p>
              <div className="payment-icons">
                {['Visa', 'Mastercard', 'UPI', 'Net Banking', 'EMI'].map((m) => (
                  <span key={m} className="payment-method">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
