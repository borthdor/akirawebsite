import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import { blogService } from '../services/supabase'
import './Blog.css'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)
    
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await blogService.getAllPosts()
      if (data && data.length > 0) {
        setPosts(data)
      }
    } catch (err) {
      console.error('Error loading posts:', err)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="blog-page">
      <div className="blog-page-container">
        {/* Header */}
        <div className="blog-page-header">
          <div className="blog-page-intro">BLOG</div>
          <h1 className="blog-page-title">Insights and Inspirations</h1>
          <p className="blog-page-description">
            Discover the latest trends, strategies, and success stories from our community
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading articles...</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && posts.length > 0 && (
          <div className="blog-page-grid">
            {posts.map((post) => (
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
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="blog-empty-state">
            <h2>No Articles Yet</h2>
            <p>Check back soon for new content!</p>
            <Link to="/" className="empty-state-button">
              <span>Back to Home</span>
              <div className="button-icon-wrapper">
                <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog


