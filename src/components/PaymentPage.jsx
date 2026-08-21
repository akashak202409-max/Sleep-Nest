import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, ArrowLeft, Truck } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = ({ cartItems, onBack, onClearCart }) => {
  const [address, setAddress] = useState({
    name: 'Jane Doe',
    phone: '9876543210',
    street: '12, Crescent Park Street, T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('username@okaxis');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const couponDiscount = cartTotal > 5000 ? 500 : 0;
  const grandTotal = cartTotal - couponDiscount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const randomOrderId = 'SN-' + Math.floor(100000 + Math.random() * 90000);
    setOrderId(randomOrderId);
    setOrderComplete(true);
  };

  const handleFinish = () => {
    onClearCart();
    onBack();
  };

  if (orderComplete) {
    return (
      <div className="order-success-wrapper">
        <div className="success-card">
          <CheckCircle size={64} className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p className="order-number-text">Your Order ID is: <strong>{orderId}</strong></p>
          <p className="success-desc">
            Thank you for shopping with SleepNest. We've sent a confirmation message with shipping details to +91 {address.phone}.
          </p>
          <div className="delivery-timeline-box">
            <Truck size={20} />
            <span>Estimated Delivery: <strong>Tomorrow, Evening</strong></span>
          </div>
          <button className="btn-primary success-home-btn" onClick={handleFinish}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page-wrapper">
      
      {/* Back button */}
      <button className="pdp-back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Shopping
      </button>

      <h1 className="payment-page-title">Secure Checkout</h1>

      <div className="payment-layout">
        
        {/* Left Column: Form & Details */}
        <form onSubmit={handlePlaceOrder} className="payment-form-col">
          
          {/* Section 1: Delivery Address */}
          <div className="checkout-step-card">
            <h3 className="step-title">1. Delivery Address</h3>
            <div className="address-inputs-grid">
              <label>
                <span>Full Name</span>
                <input 
                  type="text" 
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  required 
                />
              </label>
              <label>
                <span>Phone Number</span>
                <input 
                  type="tel" 
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  required 
                />
              </label>
              <label className="span-two">
                <span>Street Address</span>
                <input 
                  type="text" 
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required 
                />
              </label>
              <label>
                <span>City</span>
                <input 
                  type="text" 
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required 
                />
              </label>
              <label>
                <span>Pincode</span>
                <input 
                  type="text" 
                  maxLength="6"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                  required 
                />
              </label>
            </div>
          </div>

          {/* Section 2: Payment Methods */}
          <div className="checkout-step-card">
            <h3 className="step-title">2. Choose Payment Method</h3>
            
            <div className="payment-methods-list">
              
              {/* UPI Option */}
              <label className={`pay-method-option ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="pay-method"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                />
                <div className="method-details">
                  <span className="method-name">UPI (GPay / PhonePe / Paytm)</span>
                  {paymentMethod === 'UPI' && (
                    <div className="method-fields" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="text" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g. username@okhdfcbank)"
                        className="pay-input-text"
                        required
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Cards Option */}
              <label className={`pay-method-option ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="pay-method"
                  checked={paymentMethod === 'CARD'}
                  onChange={() => setPaymentMethod('CARD')}
                />
                <div className="method-details">
                  <span className="method-name">Credit / Debit Card</span>
                  {paymentMethod === 'CARD' && (
                    <div className="method-fields card-fields-grid" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="text" 
                        maxLength="16"
                        placeholder="Card Number"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g, '') })}
                        className="pay-input-text span-all"
                        required
                      />
                      <input 
                        type="text" 
                        maxLength="5"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="pay-input-text"
                        required
                      />
                      <input 
                        type="password" 
                        maxLength="3"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                        className="pay-input-text"
                        required
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Cash On Delivery Option */}
              <label className={`pay-method-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="pay-method"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                />
                <div className="method-details">
                  <span className="method-name">Cash on Delivery (COD)</span>
                  {paymentMethod === 'COD' && (
                    <p className="cod-helper-msg">Pay with cash or scan QR code on delivery.</p>
                  )}
                </div>
              </label>

            </div>
          </div>

          <button type="submit" className="btn-accent confirm-payment-btn">
            Confirm Order & Pay ₹{grandTotal.toLocaleString('en-IN')}
          </button>

        </form>

        {/* Right Column: Order Summary */}
        <aside className="payment-summary-col">
          <div className="summary-step-card">
            <h3>Order Summary</h3>
            
            {/* Cart Items list */}
            <div className="summary-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item-row">
                  <img src={item.image} alt={item.name} className="summary-item-img" />
                  <div className="summary-item-info">
                    <h4>{item.name}</h4>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span className="summary-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            {/* Calculations */}
            <div className="summary-calcs-list">
              <div className="calc-row">
                <span>Items Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row">
                <span>Delivery Charges</span>
                <span className="free-tag-green">FREE</span>
              </div>
              {couponDiscount > 0 && (
                <div className="calc-row discount-row">
                  <span>Coupon Discount</span>
                  <span>−₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="calc-row grand-total-row">
                <span>Total Payable</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="checkout-trust-badge">
              <ShieldCheck size={16} />
              <span>100% Safe and Secure Checkout</span>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default PaymentPage;
