import React from 'react';
import './B2BSection.css';

const B2BSection = () => {
  return (
    <section className="b2b-section">
      <div className="b2b-container">
        
        {/* Left Side: Content */}
        <div className="b2b-content">
          <span className="b2b-subtitle">Hotels . Hostels . Enterprise . Custom</span>
          <h2 className="b2b-title">SleepNest for Business</h2>
          <p className="b2b-description">Special Volume Pricing & Custom Sleeping Solutions</p>
          <button 
            className="btn-primary b2b-btn" 
            onClick={() => alert('B2B Inquiry form coming soon! Thank you for choosing SleepNest.')}
          >
            Place Bulk Order
          </button>
        </div>

        {/* Right Side: Illustration */}
        <div className="b2b-image-wrapper">
          <img 
            src="/b2b_illustration.jpg" 
            alt="SleepNest B2B mattress and catalog illustration" 
            className="b2b-illustration-img" 
          />
        </div>

      </div>
    </section>
  );
};

export default B2BSection;
