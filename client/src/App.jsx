import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Items from './pages/Items'
import Blog from './pages/Blog'
import Home from './pages/Home'
import About from './pages/About'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Auth from './components/Auth'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { AuthProvider, useAuth } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const UserProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

function App() {
  const location = useLocation()

  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPath = location.pathname.startsWith('/auth');
  return (
    <>
      <ScrollToTop />
      {!isAdminPath && !isLoginPath && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<UserProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      {!isAdminPath && !isLoginPath && <Footer />}
    </>
  )
}


export default App
