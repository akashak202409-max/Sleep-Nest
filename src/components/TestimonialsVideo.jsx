import React from 'react';
import { Star } from 'lucide-react';
import { dualComfort, hybridLuxe, latexSupport } from '../assets/images';
import './TestimonialsVideo.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Aarav Sharma",
    location: "Mumbai",
    text: "The orthopaedic support completely cured my lower back pain. Waking up feels fresh again!",
    imageUrl: dualComfort,
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Bengaluru",
    text: "Zero motion transfer is real! My partner tosses and turns but I don't feel a thing. Highly recommend.",
    imageUrl: hybridLuxe,
    rating: 5
  },
  {
    id: 3,
    name: "Rohan Verma",
    location: "Delhi",
    text: "It feels like sleeping on a cloud, but with robust spine alignment. The cooling features are a lifesaver in Indian summers.",
    imageUrl: latexSupport,
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="video-card">
      <div className="video-wrapper">
        <img 
          src={testimonial.imageUrl}
          alt={`SleepNest Mattress preview by ${testimonial.name}`}
          className="testimonial-video"
        />
      </div>
      
      <div className="video-card-content">
        <div className="video-card-rating">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={14} className="star-filled" />
          ))}
        </div>
        <p className="video-card-text">"{testimonial.text}"</p>
        <h4 className="video-card-name">{testimonial.name}</h4>
        <span className="video-card-status">Verified SleepNest Customer • {testimonial.location}</span>
      </div>
    </div>
  );
};

const TestimonialsVideo = () => {
  return (
    <section className="testimonials-video-section">
      <div className="testimonials-video-container">
        
        <div className="testimonials-video-header">
          <span className="testimonials-video-sub">CUSTOMER TESTIMONIALS</span>
          <h2 className="testimonials-video-title">Real Sleepers. Real Results.</h2>
          <p className="testimonials-video-desc">
            See how SleepNest has transformed nights and improved mornings for sleepers across India.
          </p>
        </div>

        <div className="testimonials-video-grid">
          {TESTIMONIALS_DATA.map((t) => (
            <TestimonialCard 
              key={t.id} 
              testimonial={t} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsVideo;
