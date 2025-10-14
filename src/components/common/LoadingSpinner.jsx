import './LoadingSpinner.css'

function LoadingSpinner({ message = 'Lädt...' }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner


