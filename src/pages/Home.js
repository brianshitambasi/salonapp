import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaCut, FaUserFriends, FaStar, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaArrowRight, FaScissors, FaHandSparkles, FaSpa, FaMagic } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      {/* Hero Section with MARLEX HAIR Branding */}
      <div className="hero-section text-white py-5" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)', position: 'relative', overflow: 'hidden' }}>
        <Container className="text-center py-5">
          <h1 className="display-2 fw-bold mb-3" style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>MARLEX HAIR</h1>
          <p className="lead mb-4">Premium Hair & Beauty Services</p>
          <p className="mb-4" style={{ fontSize: '1.2rem' }}>
            Locs • Dreadlocs • Wig Styling • Braiding • Ghanians • Hair Colouring • Hair Treatment • Knotless • Twists • Nail Services • Makeup • Facial • Weaving
          </p>
          <Button as={Link} to="/services" variant="outline-light" size="lg" className="px-5 py-3">
            Explore Our Services <FaArrowRight className="ms-2" />
          </Button>
        </Container>
      </div>

      <Container className="py-5">
        {/* Features Section */}
        <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Why Choose <span style={{ color: '#DAA520' }}>Marlex Hair?</span></h2>
        <Row className="g-4 mb-5">
          {[
            { icon: FaCut, title: 'Expert Stylists', desc: 'Professional and experienced team' },
            { icon: FaStar, title: 'Premium Products', desc: 'Only the best quality products' },
            { icon: FaClock, title: 'Timely Service', desc: 'Respect for your time' },
            { icon: FaUserFriends, title: 'Customer First', desc: 'Your satisfaction guaranteed' }
          ].map((feature, idx) => (
            <Col md={3} key={idx} className="mb-3">
              <div className="feature-card text-center p-4 rounded shadow-sm" style={{ transition: 'transform 0.3s ease', height: '100%', background: 'white', borderBottom: '3px solid #DAA520' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="icon-wrapper rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px', background: '#DAA520' }}>
                  <feature.icon size={30} color="#fff" />
                </div>
                <h5>{feature.title}</h5>
                <p className="text-muted small">{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Services Showcase */}
        <h2 className="text-center mb-4">Our <span style={{ color: '#DAA520' }}>Services</span></h2>
        <Row className="mb-5 text-center">
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaScissors size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Locs & Dreadlocs</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaMagic size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Wig Styling</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaCut size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Braiding & Twists</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaHandSparkles size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Nail Services</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaMagic size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Makeup</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaSpa size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Facial</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaCut size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Weaving</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="mb-3">
            <div className="p-3 bg-light rounded" style={{ transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <FaSpa size={30} color="#DAA520" />
              <p className="mt-2 mb-0">Hair Treatment</p>
            </div>
          </Col>
        </Row>

        {/* About Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-3">About <span style={{ color: '#DAA520' }}>Marlex Hair</span></h2>
            <p className="text-muted">
              Welcome to Marlex Hair, where beauty meets excellence. We are a premier salon dedicated to providing 
              exceptional hair, beauty, and wellness services in a relaxing and luxurious environment.
            </p>
            <p className="text-muted">
              Our team of highly skilled professionals uses the latest techniques and premium products to ensure 
              you leave feeling refreshed, confident, and beautiful.
            </p>
            <Button as={Link} to="/services" className="mt-2" style={{ backgroundColor: '#DAA520', borderColor: '#DAA520', color: '#fff' }}>Learn More <FaArrowRight className="ms-2" /></Button>
          </Col>
          <Col md={6}>
            <div style={{ overflow: 'hidden', borderRadius: '10px', boxShadow: '0 10px 30px rgba(218,165,32,0.2)' }}>
              <img 
                src="https://th.bing.com/th/id/OIP.5TSsmMbphs1mmgNmOfSBjwHaHa?w=199&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" 
                alt="Salon" 
                className="img-fluid"
                style={{ transition: 'transform 0.5s ease', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </Col>
        </Row>

        {/* Stats Section */}
        <div className="py-5 rounded mb-5" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #B8860B 100%)' }}>
          <Container>
            <Row className="text-center">
              <Col md={3}>
                <h2 className="fw-bold display-4 text-white">5000+</h2>
                <p className="text-white">Happy Customers</p>
              </Col>
              <Col md={3}>
                <h2 className="fw-bold display-4 text-white">10+</h2>
                <p className="text-white">Expert Stylists</p>
              </Col>
              <Col md={3}>
                <h2 className="fw-bold display-4 text-white">50+</h2>
                <p className="text-white">Services Offered</p>
              </Col>
              <Col md={3}>
                <h2 className="fw-bold display-4 text-white">4.9⭐</h2>
                <p className="text-white">Customer Rating</p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Contact Section */}
        <h2 className="text-center mb-5">Get In <span style={{ color: '#DAA520' }}>Touch</span></h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease', borderBottom: '3px solid #DAA520' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaMapMarkerAlt size={40} color="#DAA520" className="mb-3" />
                <h5>Our Location</h5>
                <p className="text-muted">123 Salon Street, Nairobi, Kenya</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease', borderBottom: '3px solid #DAA520' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaPhone size={40} color="#DAA520" className="mb-3" />
                <h5>Call Us</h5>
                <p className="text-muted">+254 700 000 000</p>
                <p className="text-muted small">Mon-Sat: 9am - 8pm</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease', borderBottom: '3px solid #DAA520' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaEnvelope size={40} color="#DAA520" className="mb-3" />
                <h5>Email Us</h5>
                <p className="text-muted">info@marlexhair.com</p>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none"><FaFacebook size={24} color="#DAA520" /></a>
                  <a href="https://instagram.com/_marlex_254" target="_blank" rel="noopener noreferrer" className="text-decoration-none"><FaInstagram size={24} color="#DAA520" /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none"><FaTwitter size={24} color="#DAA520" /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Instagram Handle */}
        <div className="text-center mb-4">
          <p className="text-muted">Follow us on Instagram</p>
          <a href="https://instagram.com/_marlex_254" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#DAA520', fontSize: '1.2rem' }}>
            <FaInstagram size={30} className="me-2" /> @_marlex_254
          </a>
        </div>

        {/* CTA Section */}
        <div className="text-center py-5 rounded mt-4" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #B8860B 100%)' }}>
          <h3 className="text-white mb-3">Ready to transform your look?</h3>
          <Button as={Link} to="/book-now" variant="light" size="lg" className="px-5 py-3 fw-bold">
            Book Your Appointment Today
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
