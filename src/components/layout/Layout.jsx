import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout


