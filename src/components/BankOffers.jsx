import React, { useState } from 'react';
import './BankOffers.css';

// Custom Inline SVG Logos to guarantee they always render perfectly
const AxisLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <polygon points="50,15 15,85 85,85" fill="#841947" />
    <polygon points="50,48 35,80 65,80" fill="#FFFFFF" />
  </svg>
);

const HdfcLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <rect x="5" y="5" width="90" height="90" fill="#004C8F" rx="6" />
    <rect x="25" y="25" width="50" height="50" fill="#FFFFFF" />
    <rect x="36" y="36" width="28" height="28" fill="#E31E24" />
  </svg>
);

const IciciLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <circle cx="50" cy="50" r="45" fill="#F37021" />
    <circle cx="50" cy="50" r="30" fill="#FFFFFF" />
    <text x="50" y="63" fontSize="38" fontWeight="bold" fill="#75281F" textAnchor="middle">i</text>
  </svg>
);

const IdfcLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <rect x="5" y="5" width="90" height="90" fill="#8E1F2F" rx="8" />
    <text x="50" y="45" fontSize="24" fontWeight="900" fill="#FFFFFF" textAnchor="middle">IDFC</text>
    <text x="50" y="75" fontSize="20" fontWeight="700" fill="#FF9F1C" textAnchor="middle">FIRST</text>
  </svg>
);

const SbiLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <circle cx="50" cy="45" r="35" fill="#00B0E8" />
    <circle cx="50" cy="45" r="11" fill="#FFFFFF" />
    <rect x="45" y="45" width="10" height="35" fill="#FFFFFF" />
  </svg>
);

const GpayLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <text x="50" y="58" fontSize="26" fontWeight="bold" fill="#4285F4" textAnchor="middle">G<tspan fill="#EA4335">P</tspan><tspan fill="#FBBC05">a</tspan><tspan fill="#34A853">y</tspan></text>
  </svg>
);

const PhonepeLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <rect width="100%" height="100%" fill="#5F259F" rx="10" />
    <text x="50" y="60" fontSize="28" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Pe</text>
  </svg>
);

const AmazonPayLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <text x="50" y="48" fontSize="20" fontWeight="bold" fill="#111" textAnchor="middle">amazon</text>
    <text x="50" y="78" fontSize="22" fontWeight="bold" fill="#FF9F00" textAnchor="middle">pay</text>
  </svg>
);

const PaytmLogo = () => (
  <svg viewBox="0 0 100 100" className="bank-svg">
    <text x="50" y="58" fontSize="24" fontWeight="bold" fill="#00B9F5" textAnchor="middle">Paytm</text>
  </svg>
);

const BankOffers = () => {
  const [activeTab, setActiveTab] = useState("Cards");

  const tabs = ["Cards", "EMI", "UPI", "Cashback", "Rewards"];

  const offersData = {
    "Cards": [
      { bank: "Axis Bank", discount: "Flat 7% Off", logo: <AxisLogo /> },
      { bank: "ICICI Bank", discount: "Flat 7% Off", logo: <IciciLogo /> },
      { bank: "Axis Bank", discount: "Flat 1% Off", logo: <AxisLogo /> },
      { bank: "HDFC Bank", discount: "Flat 1% Off", logo: <HdfcLogo /> },
      { bank: "ICICI Bank", discount: "Flat 1% Off", logo: <IciciLogo /> },
      { bank: "IDFC First", discount: "Flat 1% Off", logo: <IdfcLogo /> },
      { bank: "IDFC First", discount: "Flat 1% Off", logo: <IdfcLogo /> },
      { bank: "SBI", discount: "Flat 1% Off", logo: <SbiLogo /> }
    ],
    "EMI": [
      { bank: "HDFC Bank", discount: "No Cost EMI up to 12m", logo: <HdfcLogo /> },
      { bank: "ICICI Bank", discount: "No Cost EMI up to 9m", logo: <IciciLogo /> },
      { bank: "SBI", discount: "EMI starts @ ₹899/m", logo: <SbiLogo /> }
    ],
    "UPI": [
      { bank: "Google Pay", discount: "Flat ₹250 Cashback", logo: <GpayLogo /> },
      { bank: "PhonePe", discount: "Scratch card up to ₹500", logo: <PhonepeLogo /> }
    ],
    "Cashback": [
      { bank: "Amazon Pay", discount: "Flat 5% Cashback", logo: <AmazonPayLogo /> },
      { bank: "Paytm Wallet", discount: "Up to ₹1000 cashback", logo: <PaytmLogo /> }
    ],
    "Rewards": [
      { bank: "Axis Edge", discount: "5x Reward Points", logo: <AxisLogo /> },
      { bank: "SBI Cards", discount: "1000 Bonus Points", logo: <SbiLogo /> }
    ]
  };

  return (
    <section className="bank-offers-section">
      <div className="bank-offers-container">
        
        {/* Title */}
        <div className="bank-offers-header">
          <h2 className="section-title-premium-left">Bank Offers</h2>
          <div className="title-underline"></div>
        </div>

        {/* Tab Filters */}
        <div className="bank-offers-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`bank-offer-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Cards" && <span className="trend-icon">📈</span>}
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Carousel/Grid */}
        <div className="bank-offers-grid">
          {offersData[activeTab].map((offer, idx) => (
            <div key={idx} className="bank-offer-card">
              <div className="bank-logo-wrapper">
                {offer.logo}
              </div>
              <div className="bank-offer-desc">
                <span className="offer-type">Flat</span>
                <span className="offer-amount">{offer.discount.replace("Flat ", "")}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BankOffers;
