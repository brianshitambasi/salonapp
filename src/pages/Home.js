import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaCut, FaUserFriends, FaStar, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      {/* Hero Carousel Section with 3D effect */}
      <div className="hero-carousel-container" style={{ position: 'relative', overflow: 'hidden' }}>
        <Carousel fade interval={5000} pause={false}>
          <Carousel.Item>
            <div style={{ 
              height: '80vh', 
              backgroundImage: 'url(https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1600&h=600&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)'
              }} />
              <div className="text-center text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInUp">Luxury Hair & Beauty</h1>
                <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">Experience the finest grooming services</p>
                <Button as={Link} to="/services" variant="outline-light" size="lg" className="px-5 py-3 animate__animated animate__fadeInUp animate__delay-2s">
                  Explore Services <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ 
              height: '80vh', 
              backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-1387085d81e4?w=1600&h=600&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)'
              }} />
              <div className="text-center text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <h1 className="display-3 fw-bold mb-3">Relaxing Spa Experience</h1>
                <p className="lead mb-4">Rejuvenate your mind and body</p>
                <Button as={Link} to="/book-now" variant="light" size="lg" className="px-5 py-3">Book Now</Button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ 
              height: '80vh', 
              backgroundImage: 'url(https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1600&h=600&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)'
              }} />
              <div className="text-center text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <h1 className="display-3 fw-bold mb-3">Expert Stylists</h1>
                <p className="lead mb-4">Professional care with premium products</p>
                <Button as={Link} to="/staff" variant="outline-light" size="lg" className="px-5 py-3">Meet Our Team</Button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <Container className="py-5">
        {/* Features Section with 3D hover cards */}
        <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Why Choose <span style={{ color: '#0d6efd' }}>Us?</span></h2>
        <Row className="g-4 mb-5">
          <Col md={3} className="mb-3">
            <div className="feature-card text-center p-4 rounded shadow-sm" style={{ 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
              cursor: 'pointer',
              background: 'white'
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)'; }}>
              <div className="icon-wrapper bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                <FaCut size={30} />
              </div>
              <h5>Expert Stylists</h5>
              <p className="text-muted small">Professional and experienced team</p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="feature-card text-center p-4 rounded shadow-sm" style={{ 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
              cursor: 'pointer',
              background: 'white'
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)'; }}>
              <div className="icon-wrapper bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                <FaClock size={30} />
              </div>
              <h5>Timely Service</h5>
              <p className="text-muted small">Respect for your time</p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="feature-card text-center p-4 rounded shadow-sm" style={{ 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
              cursor: 'pointer',
              background: 'white'
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)'; }}>
              <div className="icon-wrapper bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                <FaStar size={30} />
              </div>
              <h5>Premium Products</h5>
              <p className="text-muted small">Only the best quality</p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="feature-card text-center p-4 rounded shadow-sm" style={{ 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
              cursor: 'pointer',
              background: 'white'
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)'; }}>
              <div className="icon-wrapper bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                <FaUserFriends size={30} />
              </div>
              <h5>Customer First</h5>
              <p className="text-muted small">Your satisfaction guaranteed</p>
            </div>
          </Col>
        </Row>

        {/* About Section with image hover effect */}
        <Row className="mb-5 align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-3">About <span style={{ color: '#0d6efd' }}>Our Salon</span></h2>
            <p className="text-muted">
              Welcome to Salon Bliss, where beauty meets excellence. We are a premier salon dedicated to providing 
              exceptional hair, beauty, and wellness services in a relaxing and luxurious environment.
            </p>
            <p className="text-muted">
              Our team of highly skilled professionals uses the latest techniques and premium products to ensure 
              you leave feeling refreshed, confident, and beautiful.
            </p>
            <Button as={Link} to="/services" variant="primary" className="mt-2">Learn More <FaArrowRight className="ms-2" /></Button>
          </Col>
          <Col md={6}>
            <div style={{ overflow: 'hidden', borderRadius: '10px' }}>
              <img 
                src="https://images.unsplash.com/photo-1560066984-1387085d81e4?w=600&h=400&fit=crop" 
                alt="Salon interior" 
                className="img-fluid"
                style={{ transition: 'transform 0.5s ease', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </Col>
        </Row>

        {/* Stats Section */}
        <div className="bg-primary text-white py-5 rounded mb-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Container>
            <Row className="text-center">
              <Col md={3}>
                <h2 className="fw-bold display-4">5000+</h2>
                <p>Happy Customers</p>
              </Col>
              <Col md={3}>
                <h2 className="fw-bold display-4">10+</h2>
                <p>Expert Stylists</p>
              </Col>
              <Col md={3}>
                <h2 className="fw-bold display-4">50+</h2>
                <p>Services Offered</p>
              </Col>
              <Col md={3}>
                <h2 className="fw-bold display-4">4.9⭐</h2>
                <p>Customer Rating</p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Services Gallery with hover effects */}
        <h2 className="text-center mb-5">Our <span style={{ color: '#0d6efd' }}>Popular Services</span></h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <div className="service-card" style={{ overflow: 'hidden', borderRadius: '10px', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card className="h-100 border-0 shadow-sm">
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1585747860714-2ba829e8b56f?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <Card.Body>
                  <Card.Title>Haircut & Styling</Card.Title>
                  <Card.Text className="text-muted">Professional haircuts, blowouts, and styling for all hair types.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary mb-0">From KSH 1,500</h5>
                    <small className="text-muted">30-60 min</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="service-card" style={{ overflow: 'hidden', borderRadius: '10px', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card className="h-100 border-0 shadow-sm">
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1632345031435-8724f6897b6a?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <Card.Body>
                  <Card.Title>Manicure & Pedicure</Card.Title>
                  <Card.Text className="text-muted">Pamper your hands and feet with our premium nail care services.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary mb-0">From KSH 2,000</h5>
                    <small className="text-muted">45-60 min</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="service-card" style={{ overflow: 'hidden', borderRadius: '10px', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card className="h-100 border-0 shadow-sm">
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <Card.Body>
                  <Card.Title>Spa & Massage</Card.Title>
                  <Card.Text className="text-muted">Relax and rejuvenate with our therapeutic massage treatments.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary mb-0">From KSH 3,000</h5>
                    <small className="text-muted">60-90 min</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Contact Section */}
        <h2 className="text-center mb-5">Get In <span style={{ color: '#0d6efd' }}>Touch</span></h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaMapMarkerAlt size={40} className="text-primary mb-3" />
                <h5>Our Location</h5>
                <p className="text-muted">123 Salon Street, Nairobi, Kenya</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaPhone size={40} className="text-primary mb-3" />
                <h5>Call Us</h5>
                <p className="text-muted">+254 700 000 000</p>
                <p className="text-muted small">Mon-Sat: 9am - 8pm</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaEnvelope size={40} className="text-primary mb-3" />
                <h5>Email Us</h5>
                <p className="text-muted">info@salonbliss.com</p>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  <a href="#" className="text-primary"><FaFacebook size={24} /></a>
                  <a href="#" className="text-primary"><FaInstagram size={24} /></a>
                  <a href="#" className="text-primary"><FaTwitter size={24} /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA Section */}
        <div className="text-center py-5 bg-light rounded" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h3 className="text-white mb-3">Ready to look your best?</h3>
          <Button as={Link} to="/book-now" variant="light" size="lg" className="px-5 py-3 fw-bold">
            Book Your Appointment Today
          </Button>
        </div>
      </Container>

      <style>{`
        .hero-carousel-container .carousel-control-next, 
        .hero-carousel-container .carousel-control-prev {
          width: 5%;
          opacity: 0.7;
        }
        .hero-carousel-container .carousel-indicators {
          bottom: 20px;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        .animate__delay-1s {
          animation-delay: 0.3s;
        }
        .animate__delay-2s {
          animation-delay: 0.6s;
        }
      `}</style>
    </>
  );
};

export default Home;
