import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaCut, FaUserFriends, FaStar, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      {/* Hero Carousel Section with Golden Theme */}
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
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(212,175,55,0.3) 100%)'
              }} />
              <div className="text-center text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Luxury Hair & Beauty</h1>
                <p className="lead mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Experience the finest grooming services</p>
                <Button as={Link} to="/services" variant="outline-light" size="lg" className="px-5 py-3" style={{ borderColor: '#FFD700', color: '#FFD700' }}>
                  Explore Services <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ 
              height: '80vh', 
              backgroundImage: 'url(https://th.bing.com/th/id/OIP.lXeSqVinE_Y4p2OVN9mghQHaD4?w=300&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3)',
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
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(212,175,55,0.3) 100%)'
              }} />
              <div className="text-center text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <h1 className="display-3 fw-bold mb-3">Relaxing Spa Experience</h1>
                <p className="lead mb-4">Rejuvenate your mind and body</p>
                <Button as={Link} to="/book-now" variant="light" size="lg" className="px-5 py-3" style={{ backgroundColor: '#FFD700', color: '#000', border: 'none' }}>Book Now</Button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{ 
              height: '80vh', 
              backgroundImage: 'url(https://th.bing.com/th/id/OIP.EnDntqELjL3lk86fAgzR5wHaHa?w=182&h=182&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3)',
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
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(212,175,55,0.3) 100%)'
              }} />
              <div className="text-center text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <h1 className="display-3 fw-bold mb-3">Expert Stylists</h1>
                <p className="lead mb-4">Professional care with premium products</p>
                <Button as={Link} to="/staff" variant="outline-light" size="lg" className="px-5 py-3" style={{ borderColor: '#FFD700', color: '#FFD700' }}>Meet Our Team</Button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <Container className="py-5">
        {/* Features Section with Golden 3D Cards */}
        <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Why Choose <span style={{ color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>Us?</span></h2>
        <Row className="g-4 mb-5">
          {[
            { icon: FaCut, title: 'Expert Stylists', desc: 'Professional and experienced team', delay: '0s' },
            { icon: FaClock, title: 'Timely Service', desc: 'Respect for your time', delay: '0.1s' },
            { icon: FaStar, title: 'Premium Products', desc: 'Only the best quality', delay: '0.2s' },
            { icon: FaUserFriends, title: 'Customer First', desc: 'Your satisfaction guaranteed', delay: '0.3s' }
          ].map((feature, idx) => (
            <Col md={3} key={idx} className="mb-3">
              <div className="feature-card text-center p-4 rounded shadow-sm" style={{ 
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                height: '100%',
                cursor: 'pointer',
                background: 'linear-gradient(145deg, #ffffff 0%, #fff8e7 100%)',
                borderBottom: '3px solid #FFD700',
                animation: `fadeInUp 0.6s ${feature.delay} both`
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px) rotateX(5deg)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212,175,55,0.3)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) rotateX(0)'; e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)'; }}>
                <div className="icon-wrapper rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)', boxShadow: '0 5px 15px rgba(212,175,55,0.4)' }}>
                  <feature.icon size={30} color="#fff" />
                </div>
                <h5 style={{ color: '#333' }}>{feature.title}</h5>
                <p className="text-muted small">{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* About Section with 3D hover effect */}
        <Row className="mb-5 align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-3">About <span style={{ color: '#FFD700' }}>Our Salon</span></h2>
            <p className="text-muted">
              Welcome to Salon Bliss, where beauty meets excellence. We are a premier salon dedicated to providing 
              exceptional hair, beauty, and wellness services in a relaxing and luxurious environment.
            </p>
            <p className="text-muted">
              Our team of highly skilled professionals uses the latest techniques and premium products to ensure 
              you leave feeling refreshed, confident, and beautiful.
            </p>
            <Button as={Link} to="/services" variant="primary" className="mt-2" style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>Learn More <FaArrowRight className="ms-2" /></Button>
          </Col>
          <Col md={6}>
            <div style={{ overflow: 'hidden', borderRadius: '10px', boxShadow: '0 10px 30px rgba(212,175,55,0.2)' }}>
              <img 
                src="https://th.bing.com/th/id/OIP.5TSsmMbphs1mmgNmOfSBjwHaHa?w=199&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" 
                alt="Salon interior" 
                className="img-fluid"
                style={{ transition: 'transform 0.5s ease', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </Col>
        </Row>

        {/* Stats Section with Golden Gradient */}
        <div className="py-5 rounded mb-5" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)' }}>
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

        {/* Services Gallery with 3D Cards */}
        <h2 className="text-center mb-5">Our <span style={{ color: '#FFD700' }}>Popular Services</span></h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <div className="service-card" style={{ overflow: 'hidden', borderRadius: '10px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
              <Card className="h-100 border-0">
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.4n5eUb-UoozdLguxu9B7fwHaFj?w=282&h=212&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <Card.Body>
                  <Card.Title>Haircut & Styling</Card.Title>
                  <Card.Text className="text-muted">Professional haircuts, blowouts, and styling for all hair types.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0" style={{ color: '#DAA520' }}>From KSH 1,500</h5>
                    <small className="text-muted">30-60 min</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="service-card" style={{ overflow: 'hidden', borderRadius: '10px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
              <Card className="h-100 border-0">
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.axJUs1TArk-x6Y5jKOh4xQHaFi?w=230&h=150&c=6&r=0&o=7&dpr=1.5&pid=1.7&rm=3" style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <Card.Body>
                  <Card.Title>Manicure & Pedicure</Card.Title>
                  <Card.Text className="text-muted">Pamper your hands and feet with our premium nail care services.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0" style={{ color: '#DAA520' }}>From KSH 2,000</h5>
                    <small className="text-muted">45-60 min</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="service-card" style={{ overflow: 'hidden', borderRadius: '10px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
              <Card className="h-100 border-0">
                <div style={{ overflow: 'hidden' }}>
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop" style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <Card.Body>
                  <Card.Title>Spa & Massage</Card.Title>
                  <Card.Text className="text-muted">Relax and rejuvenate with our therapeutic massage treatments.</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0" style={{ color: '#DAA520' }}>From KSH 3,000</h5>
                    <small className="text-muted">60-90 min</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Contact Section with Golden Cards */}
        <h2 className="text-center mb-5">Get In <span style={{ color: '#FFD700' }}>Touch</span></h2>
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease', borderBottom: '3px solid #FFD700' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaMapMarkerAlt size={40} color="#DAA520" className="mb-3" />
                <h5>Our Location</h5>
                <p className="text-muted">123 Salon Street, Nairobi, Kenya</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease', borderBottom: '3px solid #FFD700' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaPhone size={40} color="#DAA520" className="mb-3" />
                <h5>Call Us</h5>
                <p className="text-muted">+254 700 000 000</p>
                <p className="text-muted small">Mon-Sat: 9am - 8pm</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center shadow-sm border-0" style={{ transition: 'transform 0.3s ease', borderBottom: '3px solid #FFD700' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Card.Body>
                <FaEnvelope size={40} color="#DAA520" className="mb-3" />
                <h5>Email Us</h5>
                <p className="text-muted">info@salonbliss.com</p>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none"><FaFacebook size={24} color="#DAA520" /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none"><FaInstagram size={24} color="#DAA520" /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none"><FaTwitter size={24} color="#DAA520" /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA Section with Golden Gradient */}
        <div className="text-center py-5 rounded" style={{ background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)', boxShadow: '0 10px 30px rgba(218,165,32,0.3)' }}>
          <h3 className="text-white mb-3">Ready to look your best?</h3>
          <Button as={Link} to="/book-now" variant="light" size="lg" className="px-5 py-3 fw-bold" style={{ color: '#DAA520' }}>
            Book Your Appointment Today
          </Button>
        </div>
      </Container>

      <style>{`
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
        .hero-carousel-container .carousel-control-next, 
        .hero-carousel-container .carousel-control-prev {
          width: 5%;
          opacity: 0.7;
        }
        .hero-carousel-container .carousel-indicators button {
          background-color: #FFD700;
        }
      `}</style>
    </>
  );
};

export default Home;
