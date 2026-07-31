import React from 'react';
import { Star, Play } from 'lucide-react';
import './TestimonialsVideo.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Aarav Sharma",
    location: "Mumbai",
    text: "The orthopaedic support completely cured my lower back pain. Waking up feels fresh again!",
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Bengaluru",
    text: "Zero motion transfer is real! My partner tosses and turns but I don't feel a thing. Highly recommend.",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Rohan Verma",
    location: "Delhi",
    text: "It feels like sleeping on a cloud, but with robust spine alignment. The cooling features are a lifesaver in Indian summers.",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
    rating: 5
  }
];

const VideoCard = ({ testimonial }) => {
  return (
    <div className="video-card">
      <div className="video-wrapper" onClick={() => alert(`Playing ${testimonial.name}'s video testimonial...`)}>
        {/* Render a high-quality mattress image instead of a playing video element */}
        <img 
          src={testimonial.imageUrl}
          alt={`SleepNest Mattress preview by ${testimonial.name}`}
          className="testimonial-video"
        />
        
        {/* Play Icon Overlay (representing video preview) */}
        <div className="video-overlay-btn">
          <Play size={24} className="play-icon" />
        </div>
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
            <VideoCard key={t.id} testimonial={t} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsVideo;
