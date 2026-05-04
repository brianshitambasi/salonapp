import { useEffect, useState } from 'react';
import { serviceAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaClock, FaDollarSign, FaTag, FaCheck } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    serviceAPI.getAll()
      .then(res => setServices(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBookNow = (serviceId) => {
    if (user) {
      navigate('/booking', { state: { selectedServiceId: serviceId } });
    } else {
      navigate('/login');
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Our Services</h1>
      <Row>
        {services.map(service => (
          <Col md={4} className="mb-4" key={service._id}>
            <Card className="h-100 shadow-sm">
              {service.imageUrl && (
                <Card.Img variant="top" src={service.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Title className="mb-0">{service.name}</Card.Title>
                  {service.popular && <Badge bg="warning" text="dark">Popular</Badge>}
                </div>
                <Card.Text className="mt-2 text-muted">{service.description}</Card.Text>
                
                <div className="mb-2">
                  <strong>Benefits:</strong>
                  {service.benefits?.map((benefit, idx) => (
                    <div key={idx} className="small text-muted">
                      <FaCheck className="text-success me-1" size={12} /> {benefit}
                    </div>
                  ))}
                </div>
                
                <div className="mb-2">
                  {service.tags?.map(tag => (
                    <Badge key={tag} bg="secondary" className="me-1">{tag}</Badge>
                  ))}
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <h4 className="text-primary mb-0">
                      ${service.discount > 0 ? service.price - (service.price * service.discount / 100) : service.price}
                    </h4>
                    {service.discount > 0 && (
                      <small className="text-muted text-decoration-line-through">${service.price}</small>
                    )}
                  </div>
                  <div className="text-muted">
                    <FaClock className="me-1" /> {service.durationMinutes} min
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => handleBookNow(service._id)}
                >
                  Book Now
                </button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
