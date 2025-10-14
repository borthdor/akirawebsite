import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react'
import { blogService } from '../services/supabase'
import './BlogDetail.css'

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarPosts, setSidebarPosts] = useState([])

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)
    
    if (id) {
      loadPost()
    }
  }, [id])

  // Load sidebar posts when main post is loaded
  useEffect(() => {
    const loadSidebarPosts = async () => {
      try {
        const posts = await blogService.getLatestPosts(4)
        if (posts && posts.length > 0) {
          // Filter out current post and take 2
          const filtered = posts.filter(p => p.id !== post?.id && p.slug !== id).slice(0, 2)
          setSidebarPosts(filtered)
        } else {
          setSidebarPosts([])
        }
      } catch (error) {
        console.error('Error loading sidebar posts:', error)
        setSidebarPosts([])
      }
    }

    if (post) {
      loadSidebarPosts()
    }
  }, [post, id])

  const loadPost = async () => {
    try {
      setLoading(true)
      
      // Load from Supabase
      const data = await blogService.getPostById(id)
      
      if (data) {
        setPost(data)
        setError(null)
      } else {
        setError('Blog-Post wurde nicht gefunden')
      }
    } catch (err) {
      console.error('Error loading post:', err)
      setError('Blog-Post konnte nicht geladen werden')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-detail-page">
        <div className="container-narrow">
          <div className="error">
            <h2>Error</h2>
            <p className="error-message">
              {error || 'Blog post not found'}
            </p>
            <div className="error-actions">
              <button onClick={() => navigate(-1)} className="btn btn-secondary">
                Go Back
              </button>
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-detail-page">
      {/* Back Button */}
      <div className="blog-detail-back-section">
        <div className="blog-detail-wrapper">
          <Link to="/" className="back-button">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Main Layout */}
      <div className="blog-detail-wrapper">
        <div className="blog-detail-layout">
          {/* Left Column - Main Content */}
          <article className="blog-detail-main">
            {/* Meta & Title */}
            <div className="blog-detail-header">
              <div className="blog-detail-meta">
                {post.category && (
                  <div className="meta-badge">
                    <Tag size={14} />
                    <span>{post.category}</span>
                  </div>
                )}
                <div className="meta-date">
                  <Calendar size={14} />
                  <span>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h1 className="blog-detail-title">{post.title}</h1>

              {post.excerpt && (
                <p className="blog-detail-excerpt">{post.excerpt}</p>
              )}
            </div>

            {/* Hero Image */}
            {post.image_url && (
              <div className="blog-detail-image">
                <img src={post.image_url} alt={post.title} />
              </div>
            )}

            {/* Content */}
            <div className="blog-detail-content">
              {post.content?.split('\n').map((line, index) => {
                const trimmedLine = line.trim()
                
                // Skip empty lines
                if (!trimmedLine) return null
                
                // Check if it's a heading (short line with no punctuation at end)
                const isHeading = trimmedLine.length < 60 && 
                                 !trimmedLine.endsWith('.') && 
                                 !trimmedLine.endsWith('?') && 
                                 !trimmedLine.endsWith('!') &&
                                 trimmedLine.split(' ').length <= 8
                
                if (isHeading) {
                  return <h3 key={index}>{trimmedLine}</h3>
                }
                
                return <p key={index}>{trimmedLine}</p>
              })}
            </div>
          </article>

          {/* Right Column - Sidebar */}
          <aside className="blog-detail-sidebar">
            {/* More Articles */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">More Articles</h3>
              <div className="sidebar-posts">
                {sidebarPosts.map((otherPost) => (
                  <Link 
                    key={otherPost.slug || otherPost.id} 
                    to={`/blog/${otherPost.slug || otherPost.id}`}
                    className="sidebar-post-card"
                  >
                    <div className="sidebar-post-image">
                      <img src={otherPost.image_url} alt={otherPost.title} />
                    </div>
                    <div className="sidebar-post-content">
                      <div className="sidebar-post-category">{otherPost.category}</div>
                      <h4 className="sidebar-post-title">{otherPost.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="sidebar-cta">
              <h3>Join Our Community</h3>
              <p>Get exclusive access to deals, insights, and strategies</p>
              <Link to="/" className="sidebar-cta-button">
                <span>Join Now</span>
                <div className="button-icon-wrapper">
                  <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail


