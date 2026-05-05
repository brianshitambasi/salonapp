import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaHome, FaCut, FaCamera, FaCalendarAlt, FaMapMarkerAlt, FaBook, FaUser, FaSignOutAlt, FaCrown } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar expand="lg" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderBottom: '2px solid #DAA520' }} variant="dark">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaCrown className="me-2" style={{ color: '#DAA520' }} />
          <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px' }}>MARLEX HAIR</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="mx-2">
              <FaCut className="me-1" /> Services
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery" className="mx-2">
              <FaCamera className="me-1" /> Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/book-now" className="mx-2" style={{ backgroundColor: '#DAA520', color: '#000', borderRadius: '5px', padding: '5px 15px' }}>
              <FaCalendarAlt className="me-1" /> Book Now
            </Nav.Link>
            <Nav.Link as={Link} to="/location" className="mx-2">
              <FaMapMarkerAlt className="me-1" /> Location
            </Nav.Link>
            
            {user && (
              <Nav.Link as={Link} to="/my-bookings" className="mx-2">
                <FaBook className="me-1" /> My Bookings
              </Nav.Link>
            )}
            
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className="mx-2">
                Admin
              </Nav.Link>
            )}
            
            {user ? (
              <Dropdown align="end" className="ms-2">
                <Dropdown.Toggle variant="outline-warning" size="sm" style={{ borderColor: '#DAA520', color: '#DAA520' }}>
                  <FaUser className="me-1" /> {user.name.split(' ')[0]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex ms-2 gap-2">
                <Button as={Link} to="/login" variant="outline-warning" size="sm" style={{ borderColor: '#DAA520', color: '#DAA520' }}>
                  Login
                </Button>
                <Button as={Link} to="/register" variant="warning" size="sm" style={{ backgroundColor: '#DAA520', borderColor: '#DAA520', color: '#000' }}>
                  Register
                </Button>
              </div>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
