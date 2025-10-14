import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. App running in demo mode.')
  console.warn('Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

// Create a dummy client if credentials are missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Blog Service Functions
export const blogService = {
  // Alle Blog-Posts abrufen
  async getAllPosts() {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  },

  // Einzelnen Blog-Post abrufen (nach ID oder Slug)
  async getPostById(id) {
    if (!supabase) {
      console.warn('Supabase not configured.')
      return null
    }
    
    try {
      // Versuche zuerst nach Slug zu suchen
      let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', id)
        .single()
      
      // Falls kein Ergebnis mit Slug, versuche mit ID
      if (error || !data) {
        const result = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single()
        
        data = result.data
        error = result.error
      }
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  },

  // Neueste Posts abrufen (für Landing Page)
  async getLatestPosts(limit = 3) {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching latest posts:', error)
      return []
    }
  },

  // Featured Posts abrufen (z.B. für die Landing Page)
  async getFeaturedPosts(limit = 3) {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      return []
    }
  },

  // Posts nach Kategorie filtern
  async getPostsByCategory(category) {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching posts by category:', error)
      return []
    }
  }
}

// Review Service Functions
export const reviewService = {
  // Alle Reviews abrufen
  async getAllReviews() {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching reviews:', error)
      return []
    }
  },

  // Featured Reviews abrufen (für Landing Page)
  async getFeaturedReviews() {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching featured reviews:', error)
      return []
    }
  },

  // Zufällige Reviews abrufen
  async getRandomReviews(limit = 12) {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      // Get all reviews first, then shuffle on client side
      // Note: For better performance with large datasets, consider using a stored procedure
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
      
      if (error) throw error
      
      // Shuffle array and return limited results
      const shuffled = data.sort(() => 0.5 - Math.random())
      return shuffled.slice(0, limit)
    } catch (error) {
      console.error('Error fetching random reviews:', error)
      return []
    }
  },

  // Neueste Reviews abrufen
  async getLatestReviews(limit = 12) {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching latest reviews:', error)
      return []
    }
  }
}

// Storage Service Functions
export const storageService = {
  // Get success story images from storage bucket
  async getSuccessImages() {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty array.')
      return []
    }
    
    try {
      // List all files in the success-images bucket
      const { data, error } = await supabase
        .storage
        .from('success-images')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        })
      
      if (error) throw error
      
      // Filter out any folders and get only image files
      const imageFiles = data.filter(file => 
        file.name && 
        !file.name.includes('.emptyFolderPlaceholder') &&
        (file.name.endsWith('.jpg') || 
         file.name.endsWith('.jpeg') || 
         file.name.endsWith('.png') || 
         file.name.endsWith('.webp') ||
         file.name.endsWith('.gif'))
      )
      
      // Get public URLs for all images
      const images = imageFiles.map(file => {
        const { data: urlData } = supabase
          .storage
          .from('success-images')
          .getPublicUrl(file.name)
        
        return {
          id: file.id,
          name: file.name,
          url: urlData.publicUrl,
          created_at: file.created_at
        }
      })
      
      return images
    } catch (error) {
      console.error('Error fetching success images:', error)
      return []
    }
  },

  // Get public URL for a specific image
  getImageUrl(bucketName, fileName) {
    if (!supabase) {
      console.warn('Supabase not configured.')
      return null
    }
    
    try {
      const { data } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(fileName)
      
      return data.publicUrl
    } catch (error) {
      console.error('Error getting image URL:', error)
      return null
    }
  }
}

