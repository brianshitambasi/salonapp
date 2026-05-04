import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">Salon Booking</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/gallery"><FaCamera className="me-1" /> Gallery</Nav.Link>
            <Nav.Link as={Link} to="/book-now">Book Now</Nav.Link>
            {user && <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>}
            {isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
            {user ? (
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout ({user.name})</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
