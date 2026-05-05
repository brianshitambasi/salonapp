import { useEffect, useState } from 'react';
import { serviceAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          const defaultServices = [
            { _id: '1', name: 'Locs', description: 'Professional locs styling and maintenance', price: 2500, durationMinutes: 120, imageUrl: '', category: 'hair', popular: true },
            { _id: '2', name: 'Dreadlocs', description: 'Expert dreadlock installation and care', price: 3000, durationMinutes: 150, imageUrl: '', category: 'hair', popular: true },
            { _id: '3', name: 'Wig Styling', description: 'Custom wig fitting and styling', price: 2000, durationMinutes: 60, imageUrl: '', category: 'hair', popular: false },
            { _id: '4', name: 'Braiding', description: 'Beautiful braids for any occasion', price: 1800, durationMinutes: 120, imageUrl: '', category: 'hair', popular: true },
            { _id: '5', name: 'Ghanians', description: 'Trendy Ghanaian weaving styles', price: 2200, durationMinutes: 90, imageUrl: '', category: 'hair', popular: false },
            { _id: '6', name: 'Hair Colouring', description: 'Professional hair coloring and highlights', price: 3500, durationMinutes: 90, imageUrl: '', category: 'hair', popular: false },
            { _id: '7', name: 'Hair Treatment', description: 'Deep conditioning and hair repair', price: 1500, durationMinutes: 60, imageUrl: '', category: 'hair', popular: false },
            { _id: '8', name: 'Knotless', description: 'Pain-free knotless braiding technique', price: 2800, durationMinutes: 180, imageUrl: '', category: 'hair', popular: true },
            { _id: '9', name: 'Twists', description: 'Stylish twists for natural hair', price: 2000, durationMinutes: 120, imageUrl: '', category: 'hair', popular: false },
            { _id: '10', name: 'Nail Services', description: 'Manicure, pedicure, and nail art', price: 1500, durationMinutes: 60, imageUrl: '', category: 'nails', popular: false },
            { _id: '11', name: 'Makeup', description: 'Professional makeup application', price: 2500, durationMinutes: 60, imageUrl: '', category: 'makeup', popular: false },
            { _id: '12', name: 'Facial', description: 'Rejuvenating facial treatments', price: 3000, durationMinutes: 60, imageUrl: '', category: 'spa', popular: false },
            { _id: '13', name: 'Weaving', description: 'Expert hair weaving services', price: 3500, durationMinutes: 120, imageUrl: '', category: 'hair', popular: false }
          ];
          setServices(defaultServices);
        }
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleBookNow = (service) => {
    sessionStorage.setItem('selectedService', JSON.stringify(service));
    navigate('/book-now');
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  // Group services by category
  const hairServices = services.filter(s => s.category === 'hair');
  const nailServices = services.filter(s => s.category === 'nails');
  const makeupServices = services.filter(s => s.category === 'makeup');
  const spaServices = services.filter(s => s.category === 'spa');

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Our Services</h1>
        <p className="lead text-muted">Discover our wide range of professional beauty services</p>
      </div>

      {/* Hair Services */}
      {hairServices.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block' }}>Ì≤á‚Äç‚ôÄÔ∏è Hair Services</h2>
          <Row>
            {hairServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-0">{service.name}</Card.Title>
                      {service.popular && <Badge style={{ backgroundColor: '#DAA520', color: '#fff' }}>Popular</Badge>}
                    </div>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button variant="primary" className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
                      Book Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Nail Services */}
      {nailServices.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block' }}>Ì≤Ö Nail Services</h2>
          <Row>
            {nailServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body>
                    <Card.Title className="mb-0">{service.name}</Card.Title>
                    <Card.Text className="text-muted mt-2">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button variant="primary" className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
                      Book Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Makeup Services */}
      {makeupServices.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block' }}>Ì≤Ñ Makeup Services</h2>
          <Row>
            {makeupServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body>
                    <Card.Title className="mb-0">{service.name}</Card.Title>
                    <Card.Text className="text-muted mt-2">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button variant="primary" className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
                      Book Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Spa & Facial Services */}
      {spaServices.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block' }}>Ì∑ñ‚Äç‚ôÄÔ∏è Spa & Facial</h2>
          <Row>
            {spaServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body>
                    <Card.Title className="mb-0">{service.name}</Card.Title>
                    <Card.Text className="text-muted mt-2">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button variant="primary" className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
                      Book Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Services;
