import { useEffect, useState } from 'react';
import { serviceAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaStar, FaCut, FaPaintBrush, FaSpa, FaHandSparkles, FaWind, FaMagic } from 'react-icons/fa';
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
      if (res.data && res.data.length > 0) {
        setServices(res.data);
      } else {
        // Default services if none in database
        setServices(getDefaultServices());
      }
    } catch (err) {
      console.error('Error loading services:', err);
      setServices(getDefaultServices());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultServices = () => {
    return [
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
  };

  const getIcon = (serviceName) => {
    const icons = {
      'Locs': <FaCut />, 'Dreadlocs': <FaCut />, 'Wig Styling': <FaMagic />, 'Braiding': <FaWind />,
      'Ghanians': <FaCut />, 'Hair Colouring': <FaPaintBrush />, 'Hair Treatment': <FaSpa />,
      'Knotless': <FaWind />, 'Twists': <FaWind />, 'Nail Services': <FaHandSparkles />,
      'Makeup': <FaMagic />, 'Facial': <FaSpa />, 'Weaving': <FaCut />
    };
    return icons[serviceName] || <FaCut />;
  };

  const handleBookNow = (service) => {
    sessionStorage.setItem('selectedService', JSON.stringify(service));
    navigate('/book-now');
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Our Services</h1>
        <p className="lead text-muted">Discover our wide range of professional beauty services</p>
      </div>

      {/* Category Sections */}
      {['hair', 'nails', 'makeup', 'spa'].map(category => {
        const categoryServices = services.filter(s => s.category === category);
        if (categoryServices.length === 0) return null;
        const categoryTitles = {
          hair: 'Ì≤á‚Äç‚ôÄÔ∏è Hair Services',
          nails: 'Ì≤Ö Nail Services',
          makeup: 'Ì≤Ñ Makeup Services',
          spa: 'Ì∑ñ‚Äç‚ôÄÔ∏è Spa & Facial'
        };
        return (
          <div key={category} className="mb-5">
            <h2 className="mb-4 pb-2" style={{ borderBottom: '3px solid #DAA520', display: 'inline-block' }}>{categoryTitles[category]}</h2>
            <Row>
              {categoryServices.map(service => (
                <Col md={4} key={service._id} className="mb-4">
                  <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    {service.imageUrl ? (
                      <Card.Img variant="top" src={service.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
                    ) : (
                      <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        {getIcon(service.name)} <span className="ms-2">{service.name}</span>
                      </div>
                    )}
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="mb-0">{service.name}</Card.Title>
                        {service.popular && <Badge bg="warning" text="dark" style={{ backgroundColor: '#DAA520', color: '#fff' }}>Popular</Badge>}
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
        );
      })}
    </Container>
  );
};

export default Services;
