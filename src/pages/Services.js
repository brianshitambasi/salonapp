import { useEffect, useState } from 'react';
import { serviceAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
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
                  <Card.Title>{service.name}</Card.Title>
                  {service.popular && <Badge bg="warning" text="dark">Popular</Badge>}
                </div>
                <Card.Text className="mt-2 text-muted">{service.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h4 className="text-primary mb-0">
                    ${service.discount > 0 ? service.price - (service.price * service.discount / 100) : service.price}
                  </h4>
                  <div className="text-muted">
                    <FaClock className="me-1" /> {service.durationMinutes} min
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => navigate('/book-now')}
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
