import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaCut, FaUserFriends, FaStar, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Container className="text-center py-5">
          <h1 className="display-3 fw-bold mb-3">Salon Bliss</h1>
          <p className="lead mb-4">Experience luxury grooming at its finest</p>
          <Button as={Link} to="/services" variant="light" size="lg" className="px-5 py-3 fw-bold">
            Book Your Appointment
          </Button>
        </Container>
      </div>

      <Container className="py-4">
        {/* About Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-3">About Our Salon</h2>
            <p className="text-muted">
              Welcome to Salon Bliss, where beauty meets excellence. We are a premier salon dedicated to providing 
              exceptional hair, beauty, and wellness services in a relaxing and luxurious environment.
            </p>
            <p className="text-muted">
              Our team of highly skilled professionals uses the latest techniques and premium products to ensure 
              you leave feeling refreshed, confident, and beautiful. Whether you need a simple haircut, a complete 
              makeover, or a relaxing spa treatment, we've got you covered.
            </p>
            <p className="text-muted">
              At Salon Bliss, we believe that self-care is not a luxury—it's a necessity. Let us pamper you today!
            </p>
          </Col>
          <Col md={6}>
            <img 
              src="https://images.unsplash.com/photo-1560066984-1387085d81e4?w=600&h=400&fit=crop" 
              alt="Salon interior" 
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>

        {/* Features Section */}
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <Row className="mb-5">
          <Col md={3} className="mb-3">
            <Card className="text-center h-100 shadow-sm border-0">
              <Card.Body>
                <FaCut size={40} className="text-primary mb-3" />
                <h5>Expert Stylists</h5>
                <p className="text-muted small">Professional and experienced team</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center h-100 shadow-sm border-0">
              <Card.Body>
                <FaClock size={40} className="text-primary mb-3" />
                <h5>Timely Service</h5>
                <p className="text-muted small">Respect for your time</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center h-100 shadow-sm border-0">
              <Card.Body>
                <FaStar size={40} className="text-primary mb-3" />
                <h5>Premium Products</h5>
                <p className="text-muted small">Only the best quality</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center h-100 shadow-sm border-0">
              <Card.Body>
                <FaUserFriends size={40} className="text-primary mb-3" />
                <h5>Customer First</h5>
                <p className="text-muted small">Your satisfaction guaranteed</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Services Preview */}
        <h2 className="text-center mb-4">Our Popular Services</h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1585747860714-2ba829e8b56f?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Haircut & Styling</Card.Title>
                <Card.Text className="text-muted">Professional haircuts, blowouts, and styling for all hair types.</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">From KSH 1,500</h5>
                  <small className="text-muted">30-60 min</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1632345031435-8724f6897b6a?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Manicure & Pedicure</Card.Title>
                <Card.Text className="text-muted">Pamper your hands and feet with our premium nail care services.</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">From KSH 2,000</h5>
                  <small className="text-muted">45-60 min</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Spa & Massage</Card.Title>
                <Card.Text className="text-muted">Relax and rejuvenate with our therapeutic massage treatments.</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">From KSH 3,000</h5>
                  <small className="text-muted">60-90 min</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Section */}
        <div className="bg-light py-5 rounded mb-5">
          <Container>
            <Row className="text-center">
              <Col md={3}>
                <h2 className="text-primary fw-bold">5000+</h2>
                <p className="text-muted">Happy Customers</p>
              </Col>
              <Col md={3}>
                <h2 className="text-primary fw-bold">10+</h2>
                <p className="text-muted">Expert Stylists</p>
              </Col>
              <Col md={3}>
                <h2 className="text-primary fw-bold">50+</h2>
                <p className="text-muted">Services Offered</p>
              </Col>
              <Col md={3}>
                <h2 className="text-primary fw-bold">4.9⭐</h2>
                <p className="text-muted">Customer Rating</p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Contact & Location Section */}
        <h2 className="text-center mb-4">Visit Us</h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <FaMapMarkerAlt size={30} className="text-primary mb-3" />
                <h5>Our Location</h5>
                <p className="text-muted">123 Salon Street, Nairobi, Kenya</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <FaPhone size={30} className="text-primary mb-3" />
                <h5>Call Us</h5>
                <p className="text-muted">+254 700 000 000</p>
                <p className="text-muted small">Mon-Sat: 9am - 8pm</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <FaEnvelope size={30} className="text-primary mb-3" />
                <h5>Email Us</h5>
                <p className="text-muted">info@salonbliss.com</p>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  <a href="#" className="text-primary"><FaFacebook size={20} /></a>
                  <a href="#" className="text-primary"><FaInstagram size={20} /></a>
                  <a href="#" className="text-primary"><FaTwitter size={20} /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <div className="text-center py-5">
          <h3 className="mb-3">Ready to look your best?</h3>
          <Button as={Link} to="/book-now" variant="primary" size="lg" className="px-5 py-3">
            Book Your Appointment Today
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
