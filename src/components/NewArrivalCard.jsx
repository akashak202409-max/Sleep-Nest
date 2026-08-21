import { Link } from 'react-router-dom';
import { Palette, Box } from 'lucide-react';
import './NewArrivalCard.css';

export default function NewArrivalCard({ product }) {
  // Use product features if they exist, otherwise fallback to the mock ones from screenshot
  const feature1 = product.feature1 || '+2 Color Launched';
  const feature2 = product.feature2 || '+4 Wood Type Launched';

  return (
    <Link to={`/product/${product.id}`} className="new-arrival-card">
      <div className="nac-image-container">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="nac-shop-btn-wrapper">
          <button className="nac-shop-btn">Shop Now</button>
        </div>
      </div>

      <div className="nac-body">
        <h3 className="nac-title">{product.name}</h3>
        
        <div className="nac-price-row">
          <span className="nac-price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="nac-orig-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="nac-discount">({product.discount}% OFF)</span>
        </div>

        <div className="nac-features-list">
          <div className="nac-feature-item">
            <div className="nac-feature-icon-wrapper color-icon">
              <Palette size={14} color="#3b82f6" />
            </div>
            <span className="nac-feature-text">{feature1}</span>
          </div>
          
          <div className="nac-feature-item">
            <div className="nac-feature-icon-wrapper box-icon">
              <Box size={14} color="#6366f1" />
            </div>
            <span className="nac-feature-text">{feature2}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
