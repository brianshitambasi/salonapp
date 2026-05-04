import { useEffect, useState } from 'react';
import { serviceAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await serviceAPI.getAll();
      console.log('Services loaded:', res.data);
      setServices(res.data);
    } catch (err) {
      console.error('Error loading services:', err);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (service) => {
    // Store selected service in sessionStorage to pre-select in booking flow
    sessionStorage.setItem('selectedService', JSON.stringify(service));
    navigate('/book-now');
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Our Services</h1>
      <p className="text-center text-muted mb-5">Browse our premium services and book your appointment</p>
      
      <Row>
        {services.map(service => (
          <Col md={4} key={service._id} className="mb-4">
            <Card className="h-100 shadow-sm">
              {service.imageUrl && (
                <Card.Img 
                  variant="top" 
                  src={service.imageUrl} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
              )}
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Title className="mb-0">{service.name}</Card.Title>
                  {service.popular && (
                    <Badge bg="warning" text="dark" className="d-flex align-items-center">
                      <FaStar className="me-1" size={12} /> Popular
                    </Badge>
                  )}
                </div>
                <Card.Text className="mt-2 text-muted">{service.description}</Card.Text>
                
                {service.benefits && service.benefits.length > 0 && (
                  <div className="mb-2">
                    <small className="text-success">
                      ✓ {service.benefits.slice(0, 2).join(' • ')}
                      {service.benefits.length > 2 && ` +${service.benefits.length - 2} more`}
                    </small>
                  </div>
                )}
                
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <h4 className="text-primary mb-0">
                      KSH {service.discount > 0 ? service.price - (service.price * service.discount / 100) : service.price}
                    </h4>
                    {service.discount > 0 && (
                      <small className="text-muted text-decoration-line-through">KSH {service.price}</small>
                    )}
                  </div>
                  <div className="text-muted">
                    <FaClock className="me-1" /> {service.durationMinutes} min
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white border-0 pb-3">
                <Button 
                  variant="primary" 
                  className="w-100 py-2"
                  onClick={() => handleBookNow(service)}
                >
                  Proceed to Book
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      
      {services.length === 0 && (
        <div className="text-center py-5">
          <p>No services available yet. Admin needs to add services.</p>
          {localStorage.getItem('token') && (
            <Button variant="primary" onClick={() => navigate('/admin')}>
              Go to Admin Dashboard
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default Services;
