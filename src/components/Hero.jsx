import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ onShopClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "PAY DAY SPECIALS",
      title: "PAYDAY",
      titleHighlight: "SALE",
      offer: "UP TO 65% OFF",
      description: "Transform your rest with orthopedic support and plush comfort. Ethically crafted, scientifically backed.",
      btnText: "Shop Pay Day Deals",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      tagNum: "65%",
      tagLbl: "OFF"
    },
    {
      badge: "LIMITED PERIOD DEALS",
      title: "CLOUD",
      titleHighlight: "PILLOWS",
      offer: "BUY 1 GET 1 FREE",
      description: "Adaptive gel technology contours perfectly to your spine. Sleep cooler, rest deeper, and wake up refreshed.",
      btnText: "Get Free Pillow",
      img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
      tagNum: "BOGO",
      tagLbl: "ACTIVE"
    },
    {
      badge: "NEW ARRIVALS",
      title: "PREMIUM",
      titleHighlight: "SHEETS",
      offer: "FLAT 20% OFF",
      description: "Ethically-sourced organic cotton bed sheets. Pre-washed for cloud-like softness and high breathability.",
      btnText: "Shop Sheets",
      img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      tagNum: "20%",
      tagLbl: "OFF"
    }
  ];

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="hero-section-wrapper">
      {/* Stateful Carousel Hero */}
      <section className="hero-section">
        <div className="carousel-track-container">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`hero-grid carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-text-content">
                <span className="hero-badge-tag">{slide.badge}</span>
                <h1 className="hero-main-title">
                  {slide.title} <span className="highlight-text">{slide.titleHighlight}</span>
                </h1>
                <p className="hero-offer-text">{slide.offer}</p>
                <p className="hero-subtext">{slide.description}</p>
                <div className="hero-cta-buttons">
                  <button className="btn-accent-large" onClick={onShopClick}>
                    {slide.btnText}
                  </button>
                  <button className="btn-outline-white" onClick={onShopClick}>
                    Explore Collection
                  </button>
                </div>
              </div>
              <div className="hero-visual-content">
                <div className="glow-sphere"></div>
                <img 
                  src={slide.img} 
                  alt={slide.title} 
                  className="hero-promo-img" 
                />
                <div className="promo-floating-tag">
                  <p className="tag-number">{slide.tagNum}</p>
                  <p className="tag-lbl">{slide.tagLbl}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button className="carousel-nav-btn prev" onClick={handlePrev} aria-label="Previous Slide">
          ‹
        </button>
        <button className="carousel-nav-btn next" onClick={handleNext} aria-label="Next Slide">
          ›
        </button>

        {/* Carousel indicator dots */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
