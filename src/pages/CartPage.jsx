import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, ChevronRight, X, Minus, Plus, Truck, ShieldAlert } from 'lucide-react';
import './CartPage.css';
import cushionImg from '../assets/banner_pillow.jpg';
import tvUnitImg from '../assets/banner_wood_bed.jpg'; // Placeholders for the screenshot
import studyTableImg from '../assets/banner_wood_bed.jpg';
import logoImg from '../assets/logo.png';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('Furniture');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddressDrawer, setShowAddressDrawer] = useState(false);
  const [loginStep, setLoginStep] = useState('phone'); // 'phone' or 'otp'
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSaveAddress = () => {
    setShowAddressDrawer(false);
    alert("Address saved successfully!");
  };

  // Hardcode some data to match the screenshot precisely for visual layout
  const cartAmount = cartTotal > 0 ? cartTotal : 7939; 
  const couponDiscount = 4367;
  const finalTotal = Math.max(0, cartAmount - couponDiscount);

  // If cart is empty, fallback to the item shown in the screenshot for demo purposes
  const displayCart = cart.length > 0 ? cart : [
    {
      cartId: 'demo-1',
      name: 'Wakefit Flipper Sofa Cum Bed - Three Seater (6\'x5\') Feet - WarpKnit Grey',
      images: [tvUnitImg],
      price: 7939,
      originalPrice: 12289,
      qty: 1,
      selectedSize: 'Regular, 3.0 Thickness, Three Seater, WarpKnit Grey'
    }
  ];

  return (
    <div className="cart-page-new">
      <div className="container cart-container">
        {/* TOP SECTION: Cart Layout */}
        <div className="cart-grid">
          
          {/* LEFT COLUMN */}
          <div className="cart-left">
            {/* Cart Items */}
            <div className="cart-items-list">
              {displayCart.map(item => (
                <div key={item.cartId} className="cart-item-card">
                  <h3 className="ci-title">
                    <span className="purple-bar"></span>
                    {item.name}
                  </h3>
                  
                  <div className="ci-body">
                    <div className="ci-img">
                      <img src={item.images?.find(img => !img.endsWith('.mp4')) || item.images?.[0]} alt={item.name} />
                    </div>
                    
                    <div className="ci-details">
                      <div className="ci-pricing">
                        <span className="ci-price">₹{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <>
                            <span className="ci-mrp">MRP ₹{item.originalPrice.toLocaleString()}</span>
                            <span className="ci-off">{Math.round((1 - item.price/item.originalPrice)*100)}% OFF</span>
                          </>
                        )}
                      </div>
                      
                      <div className="ci-actions">
                        <div className="ci-dropdown">
                          {item.selectedSize} <span>▼</span>
                        </div>
                        
                        <div className="ci-qty">
                          <button onClick={() => item.qty > 1 ? updateQty(item.cartId, item.qty - 1) : removeFromCart(item.cartId)}>
                            {item.qty === 1 ? <X size={12}/> : <Minus size={12}/>}
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.cartId, item.qty + 1)}><Plus size={12}/></button>
                        </div>
                      </div>
                      
                      <div className="ci-delivery">
                        <Truck size={14} color="#16a34a"/> <strong>FREE</strong> Delivery by <strong>Sep 5</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Section */}
            <div className="quick-add-section">
              <h4 className="qa-title">
                ⚡ Quick Add <span className="qa-sub">Save a trip with your order here</span>
              </h4>
              <div className="qa-scroll">
                <div className="qa-card">
                  <div className="qa-badge">Cushion</div>
                  <img src={cushionImg} alt="Cushion" className="qa-img"/>
                  <div className="qa-info">
                    <div className="qa-price-row">
                      <span className="qa-price">₹634</span>
                      <span className="qa-mrp">₹799</span>
                      <span className="qa-off">11%</span>
                    </div>
                    <p className="qa-name">Cushion</p>
                    <button className="qa-btn">Add Item</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Wakefit Rewards Banner */}
            <div className="rewards-banner">
              <div className="rb-content">
                <h2>Wakefit Rewards</h2>
                <p>Claim Exclusive Rewards<br/>From Top Brands - Free with Every Wakefit Purchase</p>
                <button className="rb-btn">Know More <ChevronRight size={14}/></button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="cart-right">
            
            <div className="right-box location-box">
              <MapPin size={16} color="#16a34a"/>
              <span className="loc-text">Delivering to <strong>600026, Chennai</strong></span>
              <ChevronRight size={16} className="loc-arrow"/>
            </div>

            <div className="right-box coupon-box">
              <div className="cb-top">
                <div className="cb-icon">%</div>
                <div className="cb-text">
                  <strong>HOME <span className="cb-dot">•</span> OFFER APPLIED</strong>
                  <p>Offer valid till 27th August 2025</p>
                </div>
                <button className="cb-remove">Remove</button>
              </div>
              <div className="cb-bottom">
                <div className="cb-icons">
                  <div className="pay-icon" style={{background:'#ea580c'}}></div>
                  <div className="pay-icon" style={{background:'#facc15'}}></div>
                  <div className="pay-icon" style={{background:'#22c55e'}}></div>
                  <div className="pay-icon" style={{background:'#ef4444'}}></div>
                  <span>+ 3</span>
                </div>
                <button className="view-coupons">View All Coupons <ChevronRight size={12}/></button>
              </div>
            </div>

            <div className="right-box price-details-box">
              <h4>Price Details <span>({displayCart.length} item)</span></h4>
              
              <div className="pd-row">
                <span>Cart Total</span>
                <span>₹{cartAmount.toLocaleString()}</span>
              </div>
              <div className="pd-row pd-green">
                <span>Coupon Discount</span>
                <span>- ₹{couponDiscount.toLocaleString()}</span>
              </div>
              
              <div className="wallet-box">
                <div className="wb-row">
                  <span>Use Wakefit Cash Amount</span>
                  <button className="wb-login">Login Now</button>
                </div>
                <p>Login to access your wallet to get extra discount</p>
              </div>

              <div className="pd-row">
                <span>Delivery Charges</span>
                <span className="pd-free">Free <del>₹899</del></span>
              </div>

              <hr className="pd-divider"/>
              
              <div className="pd-total-row">
                <div className="pd-total-text">
                  <strong>Total Amount</strong>
                  <p>(Inclusive of all taxes)</p>
                </div>
                <strong>₹{finalTotal.toLocaleString()}</strong>
              </div>

              <button className="checkout-btn" onClick={() => setShowLoginModal(true)}>Proceed to Checkout</button>
            </div>

            <div className="right-box cashback-box">
              You will earn upto: <span className="cb-red"><ShieldAlert size={12}/> 158 cashback</span> on this purchase
            </div>

          </div>
        </div>
      </div>


      {/* LOGIN MODAL OVERLAY */}
      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            {/* Left Image Section */}
            <div className="lm-left">
              <img src="/images/generated/login_modal_img.jpg" alt="Login" className="lm-bg-img" />
              <img src={logoImg} alt="SleepNest" className="lm-logo-img" />
            </div>
            
            {/* Right Form Section */}
            <div className="lm-right">
              <button className="lm-close" onClick={() => { setShowLoginModal(false); setLoginStep('phone'); }}>
                <X size={16} />
              </button>
              
              <h2 className="lm-title">Login/Signup</h2>
              
              {loginStep === 'phone' ? (
                <>
                  <div className="lm-input-group">
                    <label>Enter mobile number</label>
                    <div className="lm-phone-input">
                      <div className="lm-country-code">+91</div>
                      <input 
                        type="text" 
                        placeholder="Mobile Number" 
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <label className="lm-whatsapp">
                    <input type="checkbox" defaultChecked />
                    <span>Get OTP via WhatsApp</span>
                  </label>
                  
                  <button 
                    className={`lm-get-otp ${mobileNumber.length >= 10 ? 'active' : ''}`}
                    onClick={() => mobileNumber.length >= 10 && setLoginStep('otp')}
                  >
                    Get OTP
                  </button>
                  
                  <p className="lm-terms">
                    By continuing, I agree to <strong>SleepNest's Terms & Conditions</strong> & <strong>Privacy Policy</strong>
                  </p>
                  
                  <div className="lm-divider">
                    <span>or</span>
                  </div>
                  
                  <div className="lm-social-btns">
                    <button className="lm-social-btn">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="16" />
                      Google
                    </button>
                    <button className="lm-social-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      Email
                    </button>
                  </div>
                </>
              ) : loginStep === 'otp' ? (
                <>
                  <p className="lm-subtitle">Enter OTP sent to your mobile number, email and WhatsApp</p>
                  
                  <div className="lm-phone-readonly">
                    <div className="lm-country-code">+91</div>
                    <div className="lm-phone-val">{mobileNumber || '8870392530'}</div>
                    <button className="lm-change-btn" onClick={() => setLoginStep('phone')}>CHANGE</button>
                  </div>
                  
                  <div className="lm-otp-boxes">
                    <input type="text" maxLength={1} />
                    <input type="text" maxLength={1} />
                    <input type="text" maxLength={1} />
                    <input type="text" maxLength={1} />
                    <input type="text" maxLength={1} />
                    <input type="text" maxLength={1} />
                  </div>
                  
                  <div className="lm-resend">
                    <span className="lm-timer">00:53</span> Resend OTP
                  </div>
                  
                  <button className="lm-verify-otp" onClick={() => setLoginStep('details')}>Verify OTP</button>
                </>
              ) : (
                <>
                  <p className="lm-subtitle">Help us with a few basic details about yourself</p>
                  
                  <div className="lm-details-phone">
                    <div className="lmd-left">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      <span>+91 {mobileNumber || '8870392530'}</span>
                    </div>
                    <button className="lm-change-btn" onClick={() => setLoginStep('phone')}>CHANGE</button>
                  </div>
                  
                  <div className="lm-input-group lmd-group">
                    <label>Name*</label>
                    <input type="text" className="lm-standard-input" placeholder="Enter Full Name" />
                  </div>
                  
                  <div className="lm-input-group lmd-group error">
                    <label>Email*</label>
                    <input type="email" className="lm-standard-input" placeholder="Enter Email" />
                    <span className="lm-error-text">please enter email</span>
                  </div>
                  
                  <button className="lm-verify-otp" style={{marginTop: 'auto'}} onClick={() => { setShowLoginModal(false); setShowAddressDrawer(true); }}>Confirm</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADDRESS DRAWER OVERLAY */}
      {showAddressDrawer && (
        <div className="address-drawer-overlay" onClick={() => setShowAddressDrawer(false)}>
          <div className="address-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ad-header">
              <button className="ad-back-btn" onClick={() => setShowAddressDrawer(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <h2>Add Address Details</h2>
            </div>
            
            <div className="ad-content">
              <div className="ad-row">
                <div className="ad-group">
                  <label>Flat No./ House no<span>*</span></label>
                  <input type="text" placeholder="Enter here" />
                </div>
                <div className="ad-group">
                  <label>Floor<span>*</span></label>
                  <input type="text" placeholder="Floor" />
                </div>
              </div>
              
              <div className="ad-group">
                <label>Building Name</label>
                <input type="text" placeholder="Enter here" />
              </div>
              
              <div className="ad-group">
                <label>Area, Street, sector vilage <span>*</span></label>
                <textarea placeholder="Enter Address Here" rows={3}></textarea>
              </div>
              
              <div className="ad-group">
                <label>Landmark <span>*</span></label>
                <input type="text" placeholder="Landmark" />
              </div>
              
              <div className="ad-group">
                <label>Pincode <span>*</span></label>
                <input type="text" placeholder="Pincode" />
              </div>
              
              <div className="ad-row">
                <div className="ad-group">
                  <label>City <span>*</span></label>
                  <input type="text" placeholder="City" />
                </div>
                <div className="ad-group">
                  <label>State <span>*</span></label>
                  <input type="text" placeholder="State" />
                </div>
              </div>
              
              <div className="ad-row">
                <div className="ad-group">
                  <label className="ad-label-icon">Receiver's Name <span>*</span> <ShieldAlert size={12}/></label>
                  <input type="text" placeholder="" />
                </div>
                <div className="ad-group">
                  <label className="ad-label-icon">Receiver's Phone No <span>*</span> <ShieldAlert size={12}/></label>
                  <input type="text" placeholder="" />
                </div>
              </div>
              
              <div className="ad-user-info-section">
                <label className="ad-label-icon">Logged in user information <ShieldAlert size={12}/></label>
                <div className="ad-user-box">
                  <strong>AKASH ANNAMALAI</strong> <span className="ad-divider">|</span> <span>+91 8870392530</span>
                  <div className="ad-email">akashakash87223@gmail.com</div>
                </div>
              </div>
              
              <div className="ad-save-as">
                <label>Save this address by <span>*</span></label>
                <div className="ad-tags">
                  <button className="ad-tag active">Home</button>
                  <button className="ad-tag">Work</button>
                  <button className="ad-tag">Other</button>
                </div>
              </div>
            </div>
            
            <div className="ad-footer">
              <button 
                className="ad-submit-btn active" 
                style={{background: '#5c38c9', color: 'white', cursor: 'pointer'}} 
                onClick={handleSaveAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
