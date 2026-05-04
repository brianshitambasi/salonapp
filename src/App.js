import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';
// Customer Pages
import Home from './pages/Home';
import Services from './pages/Services';
import BookNow from './pages/BookNow';
import GalleryPage from './pages/GalleryPage';
import MyBookings from './pages/MyBookings';
// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
// Admin Pages
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Routes>
            {/* Public Routes - Everyone can see */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<GalleryPage />} />
            
            {/* Customer Booking Flow - No login required */}
            <Route path="/book-now" element={<BookNow />} />
            
            {/* Customer Routes - Require login to view bookings */}
            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes - Require admin role */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
