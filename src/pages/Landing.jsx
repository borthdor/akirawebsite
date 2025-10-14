import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Zap, ShoppingCart, BarChart2, Gift, TrendingUp, Ticket, Star, ChevronDown } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import CTASection from '../components/CTASection'
import { blogService, reviewService, storageService } from '../services/supabase'
import { useSwipeable } from 'react-swipeable'
import './Landing.css'

function Landing() {
  // FAQ State
  const [openFaqItem, setOpenFaqItem] = useState(1)
  
  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState([])
  
  // FAQ Data
  const faqItems = [
    {
      id: 1,
      number: '01',
      question: 'How can I join?',
      answer: 'Once you apply to the waitlist, you will be added to a queue along with the rest of the applicants. Your card will only be charged if you\'re accepted.'
    },
    {
      id: 2,
      number: '02',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and cryptocurrency payments. Your payment information is securely processed and encrypted.'
    },
    {
      id: 3,
      number: '03',
      question: 'Can I cancel my membership anytime?',
      answer: 'Yes, you can cancel your membership at any time with no questions asked. Your access will remain active until the end of your billing period.'
    },
    {
      id: 4,
      number: '04',
      question: 'What makes this community different?',
      answer: 'We provide real-time alerts, expert insights, and a supportive community. Our members have generated over $80M in combined profits through our exclusive deals and strategies.'
    }
  ]
  
  const toggleFaq = (id) => {
    setOpenFaqItem(openFaqItem === id ? null : id)
  }
  
  // Helper function to highlight first word in cyan
  const highlightFirstWord = (text) => {
    const words = text.split(' ')
    if (words.length === 0) return text
    
    return (
      <>
        <span style={{ color: '#55E7FF' }}>{words[0]}</span>
        {words.length > 1 ? ' ' + words.slice(1).join(' ') : ''}
      </>
    )
  }
  
  // Helper function to highlight first word in green
  const highlightFirstWordGreen = (text) => {
    const words = text.split(' ')
    if (words.length === 0) return text
    
    return (
      <>
        <span style={{ color: '#22DD86' }}>{words[0]}</span>
        {words.length > 1 ? ' ' + words.slice(1).join(' ') : ''}
      </>
    )
  }

  // Helper function to render star rating
  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        size={16}
        fill={index < rating ? "#FFD700" : "none"}
        color="#FFD700"
      />
    ))
  }
  
  // Reviews State
  const [allReviews, setAllReviews] = useState([])
  
  // Success Images State
  const [successImages, setSuccessImages] = useState([])
  
  // Features Data
  const features = [
    {
      id: 1,
      icon: <BarChart2 size={20} color="#55E7FF" />,
      title: 'Price Errors & Deals',
      feature1: 'Real-time price error alerts',
      feature2: 'Exclusive deal notifications',
      description: 'Discover pricing mistakes before anyone else. Get instant alerts on price errors and exclusive deals that can generate massive profits.',
      image: '/assets/graphics/priceerrors.png'
    },
    {
      id: 2,
      icon: <ShoppingCart size={20} color="#55E7FF" />,
      title: 'Amazon FBA',
      feature1: 'Product sourcing strategies',
      feature2: 'FBA optimization guides',
      description: 'Master Amazon FBA with proven strategies. Learn product sourcing, inventory management, and scaling tactics to build a profitable business.',
      image: '/assets/graphics/Amazon.png'
    },
    {
      id: 3,
      icon: <Gift size={20} color="#55E7FF" />,
      title: 'Reselling',
      feature1: 'High-profit flip opportunities',
      feature2: 'Market trend analysis',
      description: 'Unlock the secrets of successful reselling. Get access to profitable products, market insights, and expert flipping strategies.',
      image: '/assets/graphics/Reselling1.png'
    },
    {
      id: 4,
      icon: <Zap size={20} color="#55E7FF" />,
      title: 'Casino Churning',
      feature1: 'Bonus optimization methods',
      feature2: 'Risk-free profit strategies',
      description: 'Maximize casino bonuses and promotions. Learn advanced churning techniques to extract consistent profits with minimal risk.',
      image: '/assets/graphics/casinochurning.png'
    },
    {
      id: 5,
      icon: <TrendingUp size={20} color="#55E7FF" />,
      title: 'NFTs & Crypto',
      feature1: 'Real-time crypto alerts',
      feature2: 'NFT investment insights',
      description: 'Navigate the crypto world with confidence. Get expert insights on cryptocurrency trading, NFT investments, and emerging opportunities.',
      image: '/assets/graphics/crypto.png'
    },
    {
      id: 6,
      icon: <Ticket size={20} color="#55E7FF" />,
      title: 'Options Trading',
      feature1: 'Expert trading signals',
      feature2: 'Risk management strategies',
      description: 'Master options trading with professional guidance. Get actionable signals, strategies, and risk management techniques for consistent gains.',
      image: '/assets/graphics/trading.png'
    },
    {
      id: 7,
      icon: <BarChart2 size={20} color="#55E7FF" />,
      title: 'Ticket Brokering',
      feature1: 'Exclusive ticket drops',
      feature2: 'Premium resale tactics',
      description: 'Dominate the ticket resale market. Get early access to drops, learn pricing strategies, and maximize profits on every sale.',
      image: '/assets/graphics/ticket.png'
    }
  ]
  
  const [currentFeature, setCurrentFeature] = useState(0)
  const sectionRef = useRef(null)
  const lastScrollTimeRef = useRef(0)

  // Load blogs from Supabase
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const posts = await blogService.getLatestPosts(3)
        if (posts && posts.length > 0) {
          setBlogPosts(posts)
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
      }
    }
    
    loadBlogs()
  }, [])

  // Load reviews from Supabase
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviews = await reviewService.getAllReviews()
        if (reviews && reviews.length > 0) {
          setAllReviews(reviews)
        }
      } catch (error) {
        console.error('Error loading reviews:', error)
        setAllReviews([])
      }
    }
    
    loadReviews()
  }, [])

  // Load success images from Supabase Storage
  useEffect(() => {
    const loadSuccessImages = async () => {
      try {
        const images = await storageService.getSuccessImages()
        if (images && images.length > 0) {
          setSuccessImages(images)
        }
      } catch (error) {
        console.error('Error loading success images:', error)
        setSuccessImages([])
      }
    }
    
    loadSuccessImages()
  }, [])

  // Detect if device is mobile/touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Scroll Handler - NUR für Desktop
  useEffect(() => {
    if (isTouchDevice) return

    const handleScroll = (e) => {
      const section = sectionRef.current
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      const isSectionVisible = rect.top <= 400 && rect.bottom > window.innerHeight / 3
      
      if (!isSectionVisible) return
      
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTimeRef.current
      
      if (currentFeature === 0 && e.deltaY < 0) return
      if (currentFeature === features.length - 1 && e.deltaY > 0) return
      
      e.preventDefault()
      e.stopPropagation()
      
      if (timeSinceLastScroll < 700) return
      
      const direction = e.deltaY > 0 ? 1 : -1
      const newFeature = currentFeature + direction
      
      if (newFeature >= 0 && newFeature < features.length) {
        lastScrollTimeRef.current = now
        setCurrentFeature(newFeature)
      }
    }
    
    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [currentFeature, isTouchDevice, features.length])

  // Swipe handlers for mobile
  const handleSwipe = (direction) => {
    const newFeature = currentFeature + direction
    if (newFeature >= 0 && newFeature < features.length) {
      setCurrentFeature(newFeature)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventScrollOnSwipe: true,
    trackMouse: true // Allows swiping with mouse for easier debugging
  });
  
  return (
    <div className="landing">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        {/* Hero Graphic - Background */}
        <div className="hero-graphic-wrapper">
          <img 
            src="/assets/graphics/mainhero.png" 
            alt="Hero Graphic" 
            className="hero-graphic"
          />
        </div>
        
        <div className="hero-container">
          <div className="hero-left">
            <div className="intro-text">INTRODUCING AKIRA</div>
            <h1 className="hero-title">Follow the path to success</h1>
            <p className="hero-description">
              Unlock the secrets of wealth building with exclusive information for rising entrepreneurs
            </p>
            
            <div className="offer-section">
              <div className="offer-title">What we offer</div>
              <div className="offer-box">
                <div className="offer-item">
                  <svg className="lightning-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#22DD86" stroke="#22DD86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{highlightFirstWordGreen('Lorem ipsum dolor samet dolor ipsum')}</span>
                </div>
                <div className="offer-item">
                  <svg className="lightning-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#22DD86" stroke="#22DD86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{highlightFirstWordGreen('Lorem ipsum dolor samet dolor ipsum dolor')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section - moved outside hero-left for mobile layout */}
          <div className="cta-section">
            <button className="join-button">
              <span className="button-text">Join Now</span>
              <div className="button-icon-wrapper">
                <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
              </div>
            </button>
            
            <div className="learn-more">
              <span>Learn more</span>
              <Play size={18} className="play-icon" />
            </div>
          </div>
          
          {/* Happy Members Badge */}
          <div className="happy-members">
            Over 200+ happy members
          </div>
        </div>
      </section>

      {/* Niches Section */}
      <section id="niches" className="niches-section" ref={sectionRef}>
        <div className="niches-wrapper">
          <div className="niches-container">
            {/* Background Text */}
            <div className="niches-background-text">NICHES</div>
            
            <h2 className="niches-title">Our Niches</h2>
            <p className="niches-description">
              Unlock the secrets of wealth building with exclusive information for rising entrepreneurs
            </p>
            
            {/* Features Stack */}
            <div className="features-stack-wrapper" {...(isTouchDevice ? handlers : {})}>
              <div className="features-stack">
                {features.map((feature, index) => {
                  let passedClass = ''
                  if (!isTouchDevice && index < currentFeature) {
                    passedClass = 'passed'
                  }

                  const style = isTouchDevice 
                    ? { // Mobile swipe styles
                        transform: `translateX(${(index - currentFeature) * 100}%)`,
                        opacity: index === currentFeature ? 1 : 0,
                        zIndex: index === currentFeature ? 10 : 1,
                      }
                    : { // Desktop scroll styles
                        transform: index === currentFeature 
                          ? 'translateY(0) scale(1)' 
                          : index < currentFeature
                            ? 'translateY(-150%) scale(0.85)'
                            : index === currentFeature + 1
                              ? 'translateY(30px) scale(0.96)'
                              : index === currentFeature + 2
                                ? 'translateY(50px) scale(0.92)'
                                : index === currentFeature + 3
                                  ? 'translateY(100px) scale(0.88)'
                                  : 'translateY(150px) scale(0.85)',
                        opacity: index === currentFeature 
                          ? 1 
                          : index < currentFeature
                            ? 0
                            : index === currentFeature + 1
                              ? 0.5
                              : index === currentFeature + 2
                                ? 0.3
                                : 0,
                        zIndex: index === currentFeature ? 10 : (index < currentFeature ? 0 : 10 - (index - currentFeature)),
                      };

                  return (
                  <div 
                    key={feature.id} 
                    className={`feature-widget-container ${
                      index === currentFeature ? 'active' : ''
                    } ${passedClass}`}
                    style={{
                      ...style,
                      pointerEvents: index === currentFeature ? 'auto' : 'none'
                    }}
                  >
                    <div className="feature-widget">
                    
                      <div className="widget-content">
                        <div className="widget-header">
                          <div className="widget-icon-container">
                            {feature.icon}
                          </div>
                          <h3 className="widget-title">{feature.title}</h3>
                        </div>
                        
                        <div className="widget-features">
                          <div className="feature-item">
                            <svg className="lightning-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#22DD86" stroke="#22DD86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="feature-text">{highlightFirstWordGreen(feature.feature1)}</span>
                          </div>
                          <div className="feature-item">
                            <svg className="lightning-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="#55E7FF" stroke="#55E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="feature-text">{highlightFirstWord(feature.feature2)}</span>
                          </div>
                        </div>
                        
                        <p className="widget-description">
                          {feature.description}
                        </p>
                      </div>
                      
                      <div className="widget-image-container">
                        <img 
                          src={feature.image} 
                          alt={feature.title} 
                          className="widget-image"
                        />
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
              
              {/* Progress Indicator */}
              <div className="feature-progress">
                <span className="progress-text desktop-text">& much more</span>
                <div className="mobile-progress">
                  <span className="progress-text mobile-text">Swipe to see more</span>
                  <div className="progress-dots">
                    {features.map((_, index) => (
                      <div 
                        key={index}
                        className={`progress-dot ${index === currentFeature ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-intro">TESTIMONIALS</div>
          <h2 className="testimonials-title">
            Hundreds of <span className="highlight-green">Satisfied</span> Members
          </h2>
          <p className="testimonials-description">
            Unlock the secrets of wealth building with exclusive information for rising entrepreneurs.
          </p>
          
          {/* Testimonial Cards */}
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="card-icon-container">
                <BarChart2 size={20} color="#55E7FF" />
              </div>
              <div className="card-stat">
                <div className="stat-number">1,200+</div>
                <div className="stat-label">MEMBERS</div>
              </div>
              <img 
                src="/assets/graphics/members.svg" 
                alt="Members" 
                className="card-graphic card-graphic-members"
              />
            </div>
            <div className="testimonial-card">
              <div className="card-icon-container">
                <Gift size={20} color="#55E7FF" />
              </div>
              <div className="card-stat">
                <div className="stat-number">$80m</div>
                <div className="stat-label">PROFIT</div>
              </div>
              <img 
                src="/assets/graphics/graph.svg" 
                alt="Graph" 
                className="card-graphic card-graphic-graph"
              />
            </div>
            <div className="testimonial-card">
              <div className="card-icon-container">
                <TrendingUp size={20} color="#55E7FF" />
              </div>
              <div className="card-stat">
                <div className="stat-number">200+</div>
                <div className="stat-label">TESTIMONIALS</div>
              </div>
              <img 
                src="/assets/graphics/reviews.png" 
                alt="Reviews" 
                className="card-graphic card-graphic-reviews"
              />
            </div>
          </div>
          
          {/* Member Reviews Section */}
          <div className="member-reviews-section">
            <h3 className="member-reviews-title">What our members say</h3>
            
            <div className="member-reviews-carousel">
              <div className="member-reviews-slider">
                {/* First set of reviews */}
                {allReviews.map((review) => (
                  <div key={`review-${review.id}`} className="member-review-card">
                    <div className="review-header">
                      <div className="review-profile">
                        <div className="profile-avatar">{review.initials}</div>
                        <div className="profile-info">
                          <div className="profile-name">{review.name}</div>
                          <div className="profile-status">{review.status || 'Member'}</div>
                        </div>
                      </div>
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-text">
                      "{review.text}"
                    </p>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {allReviews.map((review) => (
                  <div key={`review-duplicate-${review.id}`} className="member-review-card">
                    <div className="review-header">
                      <div className="review-profile">
                        <div className="profile-avatar">{review.initials}</div>
                        <div className="profile-info">
                          <div className="profile-name">{review.name}</div>
                          <div className="profile-status">{review.status || 'Member'}</div>
                        </div>
                      </div>
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-text">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Success Stories Section */}
          <div className="success-stories-section">
            <h3 className="success-stories-title">& recent success stories</h3>
            
            <div className="success-stories-carousel">
              <div className="success-stories-slider">
                {/* First set of success story images */}
                {successImages.map((image) => (
                  <div key={`success-${image.id}`} className="success-story-card">
                    <img 
                      src={image.url} 
                      alt={image.name || 'Success Story'} 
                      className="success-image"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {successImages.map((image) => (
                  <div key={`success-duplicate-${image.id}`} className="success-story-card">
                    <img 
                      src={image.url} 
                      alt={image.name || 'Success Story'} 
                      className="success-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="faq-container">
          {/* Background Text "FAQ" */}
          <div className="faq-background-text">FAQ</div>
          
          <div className="faq-intro">FAQ</div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-description">
            Find answers to the most common questions about our community and services
          </p>
          
          <div className="faq-content-wrapper">
            {/* FAQ Accordion */}
            <div className="faq-widget">
            <div className="faq-items-wrapper">
              {faqItems.map((item) => (
                <div key={item.id} className="faq-item">
                  <div 
                    className="faq-item-header" 
                    onClick={() => toggleFaq(item.id)}
                  >
                    <div className="faq-item-number">{item.number}</div>
                    <div className="faq-item-question">{item.question}</div>
                    <div className={`faq-item-icon ${openFaqItem === item.id ? 'open' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                  {openFaqItem === item.id && (
                    <div className="faq-item-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Box */}
          <div className="faq-cta-box">
            <img 
              src="/assets/graphics/joincommunity.png" 
              alt="Join Community" 
              className="faq-cta-image"
            />
            <h3 className="faq-cta-title">The only community you<br />will ever need</h3>
            <p className="faq-cta-text">
              Join thousands of members who are already earning through exclusive deals, expert insights, and proven strategies.
            </p>
            <button className="faq-cta-button">
              <span className="button-text">Join Now</span>
              <div className="button-icon-wrapper">
                <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="section-divider"></div>

      {/* Blog Section */}
      <section id="blogs" className="blog-section">
        <div className="blog-container">
          <h2 className="blog-title">Insights and Inspirations</h2>
          
          {/* Blog Cards Grid */}
          <div className="blog-cards-grid">
            {blogPosts.map((post) => (
              <BlogCard 
                key={post.id}
                id={post.id}
                slug={post.slug}
                image={post.image_url}
                time={post.read_time}
                title={post.title}
                description={post.excerpt}
              />
            ))}
          </div>
          
          {/* View All Button */}
          <Link to="/blog" className="blog-view-all-button">
            <span className="button-text">View All Blogs</span>
            <div className="button-icon-wrapper">
              <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

export default Landing



