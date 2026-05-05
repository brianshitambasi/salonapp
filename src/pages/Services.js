import { useEffect, useState } from 'react';
import { serviceAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaStar, FaCut, FaPaintBrush, FaSpa, FaHandSparkles, FaMagic } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        console.log('Fetched services:', res.data);
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          // Default services if none in database
          const defaultServices = [
            { _id: '1', name: 'Locs', description: 'Professional locs styling and maintenance', price: 2500, durationMinutes: 120, imageUrl: 'https://images.unsplash.com/photo-1585747860714-2ba829e8b56f?w=400&h=250&fit=crop', category: 'hair', popular: true },
            { _id: '2', name: 'Dreadlocs', description: 'Expert dreadlock installation and care', price: 3000, durationMinutes: 150, imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=250&fit=crop', category: 'hair', popular: true },
            { _id: '3', name: 'Braiding', description: 'Beautiful braids for any occasion', price: 1800, durationMinutes: 120, imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=250&fit=crop', category: 'hair', popular: true },
            { _id: '4', name: 'Nail Services', description: 'Manicure, pedicure, and nail art', price: 1500, durationMinutes: 60, imageUrl: 'https://images.unsplash.com/photo-1632345031435-8724f6897b6a?w=400&h=250&fit=crop', category: 'nails', popular: false },
            { _id: '5', name: 'Makeup', description: 'Professional makeup application', price: 2500, durationMinutes: 60, imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=250&fit=crop', category: 'makeup', popular: false },
            { _id: '6', name: 'Facial', description: 'Rejuvenating facial treatments', price: 3000, durationMinutes: 60, imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop', category: 'spa', popular: false }
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

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'hair': return <FaCut className="me-2" />;
      case 'nails': return <FaHandSparkles className="me-2" />;
      case 'makeup': return <FaMagic className="me-2" />;
      case 'spa': return <FaSpa className="me-2" />;
      default: return <FaCut className="me-2" />;
    }
  };

  const getCategoryTitle = (category) => {
    switch(category) {
      case 'hair': return 'Hair Services';
      case 'nails': return 'Nail Services';
      case 'makeup': return 'Makeup Services';
      case 'spa': return 'Spa & Facial';
      default: return 'Services';
    }
  };

  // Group services by category
  const hairServices = services.filter(s => s.category === 'hair');
  const nailServices = services.filter(s => s.category === 'nails');
  const makeupServices = services.filter(s => s.category === 'makeup');
  const spaServices = services.filter(s => s.category === 'spa');

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3" style={{ color: '#DAA520' }}>Our Services</h1>
        <p className="lead text-muted">Discover our wide range of professional beauty services</p>
      </div>

      {/* Hair Services */}
      {hairServices.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block', color: '#DAA520' }}>
            {getCategoryIcon('hair')} {getCategoryTitle('hair')}
          </h2>
          <Row>
            {hairServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ overflow: 'hidden', height: '200px' }}>
                    <Card.Img 
                      variant="top" 
                      src={service.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'} 
                      style={{ height: '200px', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-0">{service.name}</Card.Title>
                      {service.popular && <Badge style={{ backgroundColor: '#DAA520', color: '#fff' }}><FaStar className="me-1" /> Popular</Badge>}
                    </div>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
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
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block', color: '#DAA520' }}>
            {getCategoryIcon('nails')} {getCategoryTitle('nails')}
          </h2>
          <Row>
            {nailServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ overflow: 'hidden', height: '200px' }}>
                    <Card.Img 
                      variant="top" 
                      src={service.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'} 
                      style={{ height: '200px', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-0">{service.name}</Card.Title>
                    <Card.Text className="text-muted mt-2">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
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
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block', color: '#DAA520' }}>
            {getCategoryIcon('makeup')} {getCategoryTitle('makeup')}
          </h2>
          <Row>
            {makeupServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ overflow: 'hidden', height: '200px' }}>
                    <Card.Img 
                      variant="top" 
                      src={service.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'} 
                      style={{ height: '200px', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-0">{service.name}</Card.Title>
                    <Card.Text className="text-muted mt-2">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
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
          <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block', color: '#DAA520' }}>
            {getCategoryIcon('spa')} {getCategoryTitle('spa')}
          </h2>
          <Row>
            {spaServices.map(service => (
              <Col md={4} key={service._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ overflow: 'hidden', height: '200px' }}>
                    <Card.Img 
                      variant="top" 
                      src={service.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'} 
                      style={{ height: '200px', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-0">{service.name}</Card.Title>
                    <Card.Text className="text-muted mt-2">{service.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h4 className="mb-0" style={{ color: '#DAA520' }}>KSH {service.price}</h4>
                      <div className="text-muted"><FaClock className="me-1" /> {service.durationMinutes} min</div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-3">
                    <Button className="w-100 py-2" onClick={() => handleBookNow(service)} style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
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
