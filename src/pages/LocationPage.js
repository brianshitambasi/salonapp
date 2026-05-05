import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const LocationPage = () => {
  const location = {
    address: "123 Salon Street, Nairobi, Kenya",
    phone: "+254 700 000 000",
    email: "info@marlexhair.com",
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    instagram: "https://instagram.com/_marlex_254",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com"
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-5">Our Location</h1>
      
      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <h3 className="mb-4" style={{ color: '#DAA520' }}>Visit Us</h3>
              <div className="mb-3">
                <FaMapMarkerAlt className="me-2" color="#DAA520" />
                <strong>Address:</strong> {location.address}
              </div>
              <div className="mb-3">
                <FaPhone className="me-2" color="#DAA520" />
                <strong>Phone:</strong> {location.phone}
              </div>
              <div className="mb-3">
                <FaEnvelope className="me-2" color="#DAA520" />
                <strong>Email:</strong> {location.email}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <h3 className="mb-4" style={{ color: '#DAA520' }}>Working Hours</h3>
              {Object.entries(location.hours).map(([day, hours]) => (
                <div key={day} className="d-flex justify-content-between mb-2 pb-1" style={{ borderBottom: '1px solid #eee' }}>
                  <span className="text-capitalize fw-bold">{day}:</span>
                  <span>{hours}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h3 className="mb-4" style={{ color: '#DAA520' }}>Follow Us</h3>
              <div className="d-flex justify-content-center gap-4">
                <a href={location.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FaInstagram size={40} color="#DAA520" />
                </a>
                <a href={location.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FaFacebook size={40} color="#DAA520" />
                </a>
                <a href={location.twitter} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FaTwitter size={40} color="#DAA520" />
                </a>
              </div>
              <p className="mt-3">
                <a href={location.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#DAA520' }}>
                  @_marlex_254
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Google Maps Embed */}
      <Card className="mt-4 shadow-sm border-0">
        <Card.Body>
          <h3 className="mb-4 text-center" style={{ color: '#DAA520' }}>Find Us</h3>
          <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <iframe
              title="Salon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.846203829119!2d36.817223!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3f5b5b5b5%3A0x0!2zMcKwMTcnMTEuMCJTIDM2wrA0OScwMi4wIkU!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LocationPage;
