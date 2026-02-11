import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Items from './pages/Items'
import Blog from './pages/Blog'
import Home from './pages/Home'
import About from './pages/About'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
