import React from 'react'
import { Link } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({ id, image, time, title, description, slug }) => {
  // Use slug if provided, otherwise use id
  const blogLink = slug ? `/blog/${slug}` : id ? `/blog/${id}` : '#'
  
  return (
    <Link to={blogLink} className="blog-card-link">
      <div className="blog-card-wrapper">
        <div className="blog-card-image-container">
          <img src={image} alt={title} className="blog-card-img" />
        </div>
        <div className="blog-card-info">
          <div className="blog-card-time-badge">{time}</div>
          <h3 className="blog-card-heading">{title}</h3>
          <p className="blog-card-description">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard


