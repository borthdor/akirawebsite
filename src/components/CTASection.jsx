import React from 'react';
import './CTASection.css';
import { ArrowRight, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="cta-widget-section">
      <div className="cta-widget-container">
        <div className="cta-widget-content-wrapper">
          <div className="cta-widget-text-content">
            <p className="cta-widget-subtitle">START YOUR JOURNEY TODAY</p>
            <h2 className="cta-widget-title">Ready to Take Action?</h2>
            <p className="cta-widget-description">
              Memberships are finite. Your opportunity could close without notice. When you are serious about making $1,000s per month, we are ready to lead the way.
            </p>
          </div>
          
          <button className="cta-widget-join-button">
            <span className="button-text">Join Now</span>
            <div className="button-icon-wrapper">
              <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* Review Card */}
        <div className="cta-review-card">
          <div className="cta-review-header">
            <div className="cta-review-profile">
              <div className="cta-review-avatar">SN</div>
              <div className="cta-review-info">
                <div className="cta-review-name">Samuel N.</div>
                <div className="cta-review-status">Member</div>
              </div>
            </div>
            <div className="cta-review-stars">
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <Star size={14} fill="#FFD700" color="#FFD700" />
            </div>
          </div>
          <p className="cta-review-text">
            "This community has completely changed my approach to reselling. The insights and support are incredible!"
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
