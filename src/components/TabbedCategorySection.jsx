import { useState } from 'react';
import CategoryProductCard from './CategoryProductCard';
import './TabbedCategorySection.css';

export default function TabbedCategorySection({ bedsheets, pillows, comforters }) {
  const [activeTab, setActiveTab] = useState('Bedsheets');

  const tabs = [
    { id: 'Bedsheets', label: 'Bedsheets', data: bedsheets },
    { id: 'kids Pillows', label: 'kids Pillows', data: pillows },
    { id: 'Comforter', label: 'Comforter', data: comforters },
  ];

  const activeData = tabs.find(t => t.id === activeTab)?.data || [];

  return (
    <section className="tabbed-category-section">
      <div className="container">
        
        <div className="tcs-header">
          <div className="tcs-tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tcs-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tcs-grid">
          {activeData.slice(0, 3).map((product) => (
            <CategoryProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
