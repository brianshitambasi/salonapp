import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceAPI, staffAPI, bookingAPI } from '../services/api';
import { Container, Row, Col, Card, Button, Alert, Spinner, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';

const BookNow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await serviceAPI.getAll();
      setServices(res.data);
    } catch (err) {
      toast.error('Failed to load services');
    }
  };

  useEffect(() => {
    if (selectedService) {
      loadStaff();
    }
  }, [selectedService]);

  const loadStaff = async () => {
    try {
      const res = await staffAPI.getAll();
      const relevant = res.data.filter(s => s.serviceIds?.includes(selectedService._id));
      setStaff(relevant);
    } catch (err) {
      toast.error('Failed to load staff');
    }
  };

  useEffect(() => {
    if (selectedStaff && selectedDate && selectedService) {
      loadAvailableSlots();
    }
  }, [selectedStaff, selectedDate, selectedService]);

  const loadAvailableSlots = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await bookingAPI.getAvailableSlots({
        staffId: selectedStaff._id,
        date: selectedDate,
        serviceId: selectedService._id
      });
      setAvailableSlots(res.data.slots);
    } catch (err) {
      setError('Failed to load available slots');
    }
    setLoading(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleStaffSelect = (staffMember) => {
    setSelectedStaff(staffMember);
    setStep(3);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async () => {
    if (!customerInfo.customerName || !customerInfo.customerEmail || !customerInfo.customerPhone) {
      toast.error('Please fill in all contact information');
      return;
    }
    
    setLoading(true);
    try {
      await bookingAPI.create({
        ...customerInfo,
        serviceId: selectedService._id,
        staffId: selectedStaff._id,
        date: selectedDate,
        startTime: selectedSlot,
      });
      toast.success('Booking confirmed! We will contact you shortly.');
      navigate('/booking-success', { 
        state: { 
          booking: { 
            service: selectedService, 
            staff: selectedStaff, 
            date: selectedDate, 
            time: selectedSlot,
            customer: customerInfo
          } 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      toast.error('Booking failed');
    }
    setLoading(false);
  };

  if (step === 1) {
    return (
      <Container className="py-4">
        <h2 className="mb-4">Step 1: Select a Service</h2>
        <Row>
          {services.map(s => (
            <Col md={4} key={s._id} className="mb-3">
              <Card className="h-100 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => handleServiceSelect(s)}>
                {s.imageUrl && <Card.Img variant="top" src={s.imageUrl} style={{ height: '180px', objectFit: 'cover' }} />}
                <Card.Body>
                  <Card.Title>{s.name}</Card.Title>
                  <Card.Text className="text-muted">{s.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h4 className="text-primary mb-0">${s.price}</h4>
                    <small className="text-muted">{s.durationMinutes} min</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  if (step === 2) {
    return (
      <Container className="py-4">
        <div className="mb-3">
          <Button variant="link" onClick={() => setStep(1)} className="mb-3">&larr; Back to Services</Button>
        </div>
        <h2 className="mb-4">Step 2: Choose a Stylist</h2>
        <Row>
          {staff.map(s => (
            <Col md={4} key={s._id} className="mb-3">
              <Card className="h-100 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => handleStaffSelect(s)}>
                {s.imageUrl && <Card.Img variant="top" src={s.imageUrl} style={{ height: '150px', objectFit: 'cover' }} />}
                <Card.Body>
                  <Card.Title>{s.name}</Card.Title>
                  <Card.Text className="text-muted">{s.role}</Card.Text>
                  <small>Hours: {s.workingHours?.start} - {s.workingHours?.end}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  if (step === 3) {
    return (
      <Container className="py-4">
        <div className="mb-3">
          <Button variant="link" onClick={() => setStep(2)} className="mb-3">&larr; Back to Stylists</Button>
        </div>
        <h2 className="mb-4">Step 3: Pick Date & Time</h2>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Select Date</Form.Label>
              <Form.Control 
                type="date" 
                value={selectedDate} 
                onChange={handleDateChange} 
                min={new Date().toISOString().split('T')[0]} 
              />
            </Form.Group>
          </Col>
        </Row>
        {loading && <div className="text-center py-4"><Spinner animation="border" /></div>}
        {!loading && selectedDate && (
          <div>
            <h4 className="mb-3">Available Times:</h4>
            <div className="d-flex flex-wrap gap-2">
              {availableSlots.map(slot => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? 'primary' : 'outline-secondary'}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {selectedSlot && (
          <Button className="mt-4" variant="success" onClick={() => setStep(4)} size="lg">
            Continue to Your Information
          </Button>
        )}
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-3">
        <Button variant="link" onClick={() => setStep(3)} className="mb-3">&larr; Back to Date & Time</Button>
      </div>
      <h2 className="mb-4">Step 4: Your Information</h2>
      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5>Booking Summary</h5>
              <hr />
              <p><strong>Service:</strong> {selectedService?.name}</p>
              <p><strong>Stylist:</strong> {selectedStaff?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedSlot}</p>
              <p><strong>Price:</strong> ${selectedService?.price}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Contact Information</h5>
              <hr />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="customerName"
                    value={customerInfo.customerName}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="customerEmail"
                    value={customerInfo.customerEmail}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control 
                    type="tel" 
                    name="customerPhone"
                    value={customerInfo.customerPhone}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Special Requests (Optional)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleCustomerInfoChange}
                    placeholder="Any special requests or notes..."
                  />
                </Form.Group>
              </Form>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button 
                variant="success" 
                onClick={handleConfirmBooking} 
                disabled={loading}
                className="w-100"
                size="lg"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookNow;
