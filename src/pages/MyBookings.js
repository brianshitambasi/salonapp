import { useState } from 'react';
import { bookingAPI } from '../services/api';
import { Container, Card, Button, Badge, Row, Col, Spinner, Form, Alert } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUser, FaTag, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchBookings = async (e) => {
    e.preventDefault();
    if (!email || !phone) {
      toast.error('Please enter both email and phone number');
      return;
    }
    setLoading(true);
    try {
      const res = await bookingAPI.getMyBookings({ email, phone });
      setBookings(res.data);
      setSearched(true);
      if (res.data.length === 0) {
        toast('No bookings found', { icon: 'Ì¥ç' });
      }
    } catch (err) {
      toast.error('Failed to find bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancel({ bookingId, email, phone });
        toast.success('Booking cancelled successfully');
        // Refresh bookings
        const res = await bookingAPI.getMyBookings({ email, phone });
        setBookings(res.data);
      } catch (err) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { bg: 'warning', text: 'Pending', icon: '‚è≥' },
      confirmed: { bg: 'success', text: 'Confirmed', icon: '‚úÖ' },
      completed: { bg: 'info', text: 'Completed', icon: 'Ìæâ' },
      cancelled: { bg: 'danger', text: 'Cancelled', icon: '‚ùå' }
    };
    const { bg, text, icon } = config[status] || config.pending;
    return <Badge bg={bg} pill className="px-3 py-2">{icon} {text}</Badge>;
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h2 style={{ color: '#DAA520' }}>Ì≥ã My Bookings</h2>
        <p className="text-muted">View and manage your appointments</p>
      </div>
      
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #fff 100%)' }}>
          <h5 className="mb-3" style={{ color: '#DAA520' }}>Ì¥ç Find Your Bookings</h5>
          <Form onSubmit={fetchBookings}>
            <Row>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label><FaEnvelope className="me-2" /> Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label><FaPhone className="me-2" /> Phone Number</Form.Label>
                  <Form.Control 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button type="submit" disabled={loading} className="w-100" style={{ backgroundColor: '#DAA520', borderColor: '#DAA520' }}>
                  {loading ? <Spinner animation="border" size="sm" /> : <><FaSearch className="me-2" /> Find</>}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: '#DAA520' }} />
          <p className="mt-3">Loading your bookings...</p>
        </div>
      )}

      {!loading && searched && bookings.length === 0 && (
        <Alert variant="info" className="text-center">
          <p className="mb-0">Ì¥ç No bookings found for this email and phone number.</p>
        </Alert>
      )}

      {!loading && bookings.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ color: '#DAA520' }}>Ì≥Ö Your Appointments</h5>
            <Badge bg="secondary" pill>{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</Badge>
          </div>
          <Row>
            {bookings.map(booking => (
              <Col md={6} lg={4} key={booking._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ transition: 'transform 0.3s ease', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: '5px', background: booking.status === 'confirmed' ? '#28a745' : booking.status === 'cancelled' ? '#dc3545' : '#ffc107' }} />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      {getStatusBadge(booking.status)}
                      <small className="text-muted">{new Date(booking.createdAt).toLocaleDateString()}</small>
                    </div>
                    <h5 className="mb-2">{booking.serviceId?.name}</h5>
                    <div className="mb-2">
                      <FaUser className="me-2 text-muted" size={14} />
                      <span className="text-muted"><strong>Stylist:</strong> {booking.staffId?.name}</span>
                    </div>
                    <div className="mb-2">
                      <FaCalendarAlt className="me-2 text-muted" size={14} />
                      <span className="text-muted"><strong>Date:</strong> {booking.date}</span>
                    </div>
                    <div className="mb-2">
                      <FaClock className="me-2 text-muted" size={14} />
                      <span className="text-muted"><strong>Time:</strong> {booking.startTime}</span>
                    </div>
                    <div className="mb-3">
                      <FaTag className="me-2 text-muted" size={14} />
                      <span className="text-muted"><strong>Price:</strong> KSH {booking.serviceId?.price}</span>
                    </div>
                    {booking.status === 'pending' && (
                      <Button variant="outline-danger" size="sm" className="w-100 mt-2" onClick={() => cancelBooking(booking._id)}>
                        Cancel Booking
                      </Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <div className="alert alert-success text-center py-2 mb-0 mt-2" style={{ fontSize: '14px' }}>
                        ‚úÖ Booking confirmed! We look forward to seeing you.
                      </div>
                    )}
                    {booking.status === 'completed' && (
                      <div className="alert alert-info text-center py-2 mb-0 mt-2" style={{ fontSize: '14px' }}>
                        Ìæâ Service completed! Thank you for choosing us.
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default MyBookings;
