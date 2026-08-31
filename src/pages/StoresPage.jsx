import { useState } from 'react';
import { Search, MapPin, Truck, RefreshCw, Shield, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './StoresPage.css';

const cities = [
  { name: 'Agra', stores: 1 }, { name: 'Ahmedabad', stores: 4 }, { name: 'Amritsar', stores: 1 },
  { name: 'Anand', stores: 1 }, { name: 'Asansol', stores: 1 }, { name: 'Aurangabad', stores: 1 },
  { name: 'Bangalore', stores: 23 }, { name: 'Bareilly', stores: 1 }, { name: 'Bhavnagar', stores: 1 },
  { name: 'Bhopal', stores: 1 }, { name: 'Bhubaneswar', stores: 1 }, { name: 'Chandigarh', stores: 2 },
  { name: 'Chennai', stores: 7 }, { name: 'Coimbatore', stores: 2 }, { name: 'Dehradun', stores: 1 },
  { name: 'Delhi', stores: 12 }, { name: 'Durgapur', stores: 1 }, { name: 'Faridabad', stores: 1 },
  { name: 'Gandhinagar', stores: 1 }, { name: 'Ghaziabad', stores: 3 }, { name: 'Goa', stores: 1 },
  { name: 'Guntur', stores: 1 }, { name: 'Gurugram', stores: 5 }, { name: 'Guwahati', stores: 1 },
  { name: 'Gwalior', stores: 1 }, { name: 'Haldwani', stores: 1 }, { name: 'Hisar', stores: 1 },
  { name: 'Hubli', stores: 1 }, { name: 'Hyderabad', stores: 8 }, { name: 'Indore', stores: 2 },
  { name: 'Jabalpur', stores: 1 }, { name: 'Jaipur', stores: 3 }, { name: 'Jalandhar', stores: 1 },
  { name: 'Jammu', stores: 1 }, { name: 'Jamshedpur', stores: 1 }, { name: 'Jodhpur', stores: 1 },
  { name: 'Kanpur', stores: 1 }, { name: 'Kochi', stores: 1 }, { name: 'Kolkata', stores: 4 },
  { name: 'Kozhikode', stores: 1 }, { name: 'Lucknow', stores: 3 }, { name: 'Ludhiana', stores: 1 },
  { name: 'Madurai', stores: 1 }, { name: 'Mangalore', stores: 1 }, { name: 'Meerut', stores: 1 },
  { name: 'Mohali', stores: 1 }, { name: 'Mumbai', stores: 13 }, { name: 'Mysore', stores: 1 },
  { name: 'Nagpur', stores: 2 }, { name: 'Nashik', stores: 1 }, { name: 'Noida', stores: 3 },
  { name: 'Panipat', stores: 1 }, { name: 'Patna', stores: 1 }, { name: 'Pune', stores: 8 },
  { name: 'Raipur', stores: 1 }, { name: 'Rajkot', stores: 1 }, { name: 'Ranchi', stores: 1 },
  { name: 'Rohtak', stores: 1 }, { name: 'Rourkela', stores: 1 }, { name: 'Salem', stores: 1 },
  { name: 'Siliguri', stores: 1 }, { name: 'Sonipat', stores: 1 }, { name: 'Surat', stores: 2 },
  { name: 'Thane', stores: 3 }, { name: 'Thrissur', stores: 1 }, { name: 'Tirupati', stores: 1 },
  { name: 'Tiruppur', stores: 1 }, { name: 'Trichy', stores: 1 }, { name: 'Trivandrum', stores: 1 },
  { name: 'Udaipur', stores: 1 }, { name: 'Vadodara', stores: 2 }, { name: 'Varanasi', processing: true },
  { name: 'Vijayawada', stores: 1 }, { name: 'Visakhapatnam', stores: 1 }, { name: 'Warangal', stores: 1 }
];

const faqs = [
  {
    q: 'Do you have Mattress on display?',
    a: 'At most of our retail stores, we offer a wide range of mattresses to choose from, including orthopedic memory foam, latex, dual comfort, and more. Highly recommend you call and experience the comfort for yourself before making a purchase. Additionally, our in-store experts are available to provide recommendations based on your specific needs and preferences.'
  },
  { q: 'What are the bed sizes you have?', a: 'We have Single, Diwan, Queen, and King sizes available for you to test out at all our experience centers.' },
  { q: 'Does the store have emi/cash option?', a: 'Yes, we provide flexible No Cost EMI options and accept cash, UPI, and card payments at all stores.' },
  { q: 'Is the store owned by Wakefit directly?', a: 'Yes, all our 122+ stores are company-owned and operated to ensure the highest quality experience.' },
  { q: 'Is there additional discount if I buy at the store?', a: 'Our online and offline prices are exactly the same. However, stores might run exclusive weekend bundled offers.' },
  { q: 'Do you have EMI options?', a: 'Yes, we offer up to 6 months No Cost EMI through all major credit cards and Bajaj Finserv.' },
  { q: 'Do you deliver across India?', a: 'Yes, we deliver to 19000+ pin codes across India directly from our factory to your doorstep.' },
  { q: 'Is it an experience center or actual retail store?', a: 'Both! You can experience the products and place an order directly at the store. The product will be delivered fresh from our factory.' },
  { q: 'Is the assembly and delivery free?', a: 'Yes, we provide free delivery and free professional assembly for all furniture items.' }
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="stores-page-container">
      {/* Hero Section */}
      <section className="stores-hero">
        <div className="stores-hero-pins"></div>
        <div className="stores-hero-bg-clouds"></div>
        <div className="stores-hero-content">
          <div className="stores-hero-text">
            <h1>Dream homes to sweet dreams In store for you!</h1>
          </div>
          <img src="/images/generated/store_hero.png" alt="Wakefit Store" onError={(e) => e.target.style.display = 'none'} style={{ height: '250px', borderRadius: '12px' }}/>
        </div>
      </section>

      {/* Counter */}
      <section className="stores-counter-section">
        <h2>Wakefit Stores now in <span>122 cities</span></h2>
      </section>

      <main className="stores-main">
        {/* Search */}
        <div className="stores-search-container">
          <Search size={20} color="#9ca3af" />
          <input 
            type="text" 
            placeholder="Search Stores, City or Pincode" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cities */}
        <h2 className="browse-cities-header">Browse by cities</h2>
        
        <div className="city-grid">
          {filteredCities.map((city) => (
            <div className="city-card" key={city.name}>
              <div className="city-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3"/></svg>
              </div>
              <div className="city-card-name">{city.name}</div>
              <div className="city-card-count">{city.processing ? 'Opening Soon' : `${city.stores} Store${city.stores > 1 ? 's' : ''}`}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <section className="stores-benefits-section">
          <h3>Why should you visit Wakefit stores?</h3>
          <p className="stores-benefits-subtitle">Visit us for the best store experience in town</p>
          <button className="stores-locate-btn">Find a store near you</button>
          
          <div className="stores-benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon"><Truck size={20}/></div>
              <div className="benefit-text">Free delivery &<br/>assembly</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><HelpCircle size={20}/></div>
              <div className="benefit-text">Expert assistance &<br/>guidance</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><RefreshCw size={20}/></div>
              <div className="benefit-text">Guaranteed returns &<br/>exchanges</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><Shield size={20}/></div>
              <div className="benefit-text">Touch, feel & review for<br/>yourself</div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="stores-faq-section">
          <h3>Frequently asked Questions</h3>
          <p className="stores-faq-subtitle">Answers to all questions you could have, already answered for you.</p>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question" 
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  {faq.q}
                  {openFaq === index ? <ChevronUp size={18} color="#5c38c9"/> : <ChevronDown size={18} color="#5c38c9"/>}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
