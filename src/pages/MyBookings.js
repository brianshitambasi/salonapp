import { useState } from 'react';
import { bookingAPI } from '../services/api';
import { Container, Card, Button, Badge, Row, Col, Spinner, Form, Alert } from 'react-bootstrap';
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
    } catch (err) {
      toast.error('Failed to find bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (window.confirm('Cancel this booking?')) {
      try {
        await bookingAPI.cancel({ bookingId, email, phone });
        toast.success('Booking cancelled');
        fetchBookings({ preventDefault: () => {} });
      } catch (err) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Bookings</h2>
      
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5>Find Your Bookings</h5>
          <Form onSubmit={fetchBookings}>
            <Row>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
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
                  <Form.Label>Phone Number</Form.Label>
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
                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                  {loading ? 'Searching...' : 'Find Bookings'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3">Loading your bookings...</p>
        </div>
      )}

      {!loading && searched && bookings.length === 0 && (
        <Alert variant="info">No bookings found for this email and phone number.</Alert>
      )}

      {!loading && bookings.length > 0 && (
        <Row>
          {bookings.map(booking => (
            <Col md={6} lg={4} key={booking._id} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Badge bg={booking.status === 'confirmed' ? 'success' : booking.status === 'cancelled' ? 'danger' : 'warning'} pill>
                      {booking.status.toUpperCase()}
                    </Badge>
                    <small className="text-muted">{new Date(booking.createdAt).toLocaleDateString()}</small>
                  </div>
                  <h5>{booking.serviceId?.name}</h5>
                  <p className="text-muted mb-2"><strong>Stylist:</strong> {booking.staffId?.name}</p>
                  <p className="text-muted mb-2"><strong>Date:</strong> {booking.date} at {booking.startTime}</p>
                  <p className="text-muted mb-3"><strong>Price:</strong> ${booking.serviceId?.price}</p>
                  {booking.status === 'pending' && (
                    <Button variant="outline-danger" size="sm" className="w-100" onClick={() => cancelBooking(booking._id)}>
                      Cancel Booking
                    </Button>
                  )}
                  {booking.status === 'confirmed' && (
                    <div className="alert alert-success text-center py-2 mb-0">
                      ✓ Booking confirmed! We look forward to seeing you.
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;
