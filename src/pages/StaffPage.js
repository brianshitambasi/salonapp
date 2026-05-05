import { useEffect, useState } from 'react';
import { staffAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaClock, FaStar } from 'react-icons/fa';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const res = await staffAPI.getAll();
        setStaff(res.data);
      } catch (err) {
        console.error('Error loading staff:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStaff();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Meet Our Stylists</h1>
        <p className="lead text-muted">Professional and experienced team ready to serve you</p>
      </div>

      <Row>
        {staff.map(s => (
          <Col md={4} key={s._id} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center" style={{ transition: 'transform 0.3s ease', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ overflow: 'hidden', height: '250px' }}>
                <Card.Img 
                  variant="top" 
                  src={s.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'} 
                  style={{ height: '250px', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <Card.Body>
                <Card.Title className="mb-0">{s.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{s.role}</Card.Subtitle>
                <Card.Text className="small">{s.bio}</Card.Text>
                <div className="d-flex justify-content-center gap-3 text-muted">
                  <div><FaClock /> {s.workingHours?.start} - {s.workingHours?.end}</div>
                  {s.experience && <div><FaStar className="text-warning" /> {s.experience} years</div>}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {staff.length === 0 && (
        <div className="text-center py-5">
          <p>No staff members added yet. Admin will add stylists soon.</p>
        </div>
      )}
    </Container>
  );
};

export default StaffPage;
