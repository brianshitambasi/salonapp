import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceAPI, staffAPI, bookingAPI } from '../services/api';
import { Container, Row, Col, Card, Button, Alert, Spinner, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from 'react-icons/fa';

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
    customerLocation: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load services on mount
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

  // Load staff based on selected service
  const loadStaff = useCallback(async () => {
    if (!selectedService) return;
    try {
      const res = await staffAPI.getAll();
      const relevant = res.data.filter(s => s.serviceIds?.includes(selectedService._id));
      setStaff(relevant);
      if (relevant.length === 0) {
        toast.error('No stylists available for this service');
      }
    } catch (err) {
      toast.error('Failed to load staff');
    }
  }, [selectedService]);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  // Load available time slots
  const loadAvailableSlots = useCallback(async () => {
    if (!selectedStaff || !selectedDate || !selectedService) return;
    setLoading(true);
    setError('');
    try {
      const res = await bookingAPI.getAvailableSlots({
        staffId: selectedStaff._id,
        date: selectedDate,
        serviceId: selectedService._id
      });
      setAvailableSlots(res.data.slots);
      if (res.data.slots.length === 0) {
        setError('No available slots for this date. Please try another date.');
      }
    } catch (err) {
      setError('Failed to load available slots');
    }
    setLoading(false);
  }, [selectedStaff, selectedDate, selectedService]);

  useEffect(() => {
    loadAvailableSlots();
  }, [loadAvailableSlots]);

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
    setError('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async () => {
    // Validate customer information
    if (!customerInfo.customerName) {
      toast.error('Please enter your full name');
      return;
    }
    if (!customerInfo.customerEmail) {
      toast.error('Please enter your email address');
      return;
    }
    if (!customerInfo.customerPhone) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!customerInfo.customerLocation) {
      toast.error('Please enter your location/address');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.customerEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    try {
      await bookingAPI.create({
        customerName: customerInfo.customerName,
        customerEmail: customerInfo.customerEmail,
        customerPhone: customerInfo.customerPhone,
        notes: `${customerInfo.customerLocation} | ${customerInfo.notes}`,
        serviceId: selectedService._id,
        staffId: selectedStaff._id,
        date: selectedDate,
        startTime: selectedSlot,
      });
      toast.success('Booking confirmed! We will contact you shortly.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      toast.error('Booking failed');
    }
    setLoading(false);
  };

  // Step 1: Select Service
  if (step === 1) {
    return (
      <Container className="py-4">
        <h2 className="mb-4 text-center">Step 1: Select a Service</h2>
        <Row>
          {services.map(s => (
            <Col md={4} key={s._id} className="mb-3">
              <Card className="h-100 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => handleServiceSelect(s)}>
                {s.imageUrl && <Card.Img variant="top" src={s.imageUrl} style={{ height: '180px', objectFit: 'cover' }} />}
                <Card.Body>
                  <Card.Title>{s.name}</Card.Title>
                  <Card.Text className="text-muted">{s.description || 'Premium service'}</Card.Text>
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

  // Step 2: Choose Stylist
  if (step === 2) {
    return (
      <Container className="py-4">
        <div className="mb-3">
          <Button variant="link" onClick={() => setStep(1)} className="mb-3">&larr; Back to Services</Button>
        </div>
        <h2 className="mb-4 text-center">Step 2: Choose a Stylist</h2>
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

  // Step 3: Pick Date & Time
  if (step === 3) {
    return (
      <Container className="py-4">
        <div className="mb-3">
          <Button variant="link" onClick={() => setStep(2)} className="mb-3">&larr; Back to Stylists</Button>
        </div>
        <h2 className="mb-4 text-center">Step 3: Pick Date & Time</h2>
        <Row className="justify-content-center">
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
        
        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Loading available slots...</p>
          </div>
        )}
        
        {!loading && selectedDate && (
          <div>
            <h4 className="mb-3 text-center">Available Times:</h4>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {availableSlots.map(slot => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? 'primary' : 'outline-secondary'}
                  onClick={() => handleSlotSelect(slot)}
                  className="px-4 py-2"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {error && <Alert variant="danger" className="mt-3 text-center">{error}</Alert>}
        
        {selectedSlot && (
          <div className="text-center mt-4">
            <Button className="mt-4" variant="success" onClick={() => setStep(4)} size="lg">
              Continue to Your Information
            </Button>
          </div>
        )}
      </Container>
    );
  }

  // Step 4: Customer Information Form
  return (
    <Container className="py-4">
      <div className="mb-3">
        <Button variant="link" onClick={() => setStep(3)} className="mb-3">&larr; Back to Date & Time</Button>
      </div>
      <h2 className="mb-4 text-center">Step 4: Your Information</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-3">Booking Summary</h5>
              <hr />
              <p><strong>Service:</strong> {selectedService?.name}</p>
              <p><strong>Stylist:</strong> {selectedStaff?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedSlot}</p>
              <p><strong>Price:</strong> ${selectedService?.price}</p>
              <p><strong>Duration:</strong> {selectedService?.durationMinutes} minutes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Contact Information</h5>
              <hr />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="customerName"
                    value={customerInfo.customerName}
                    onChange={handleCustomerInfoChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="customerEmail"
                    value={customerInfo.customerEmail}
                    onChange={handleCustomerInfoChange}
                    placeholder="your@email.com"
                    required
                  />
                  <Form.Text className="text-muted">We'll send confirmation to this email.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control 
                    type="tel" 
                    name="customerPhone"
                    value={customerInfo.customerPhone}
                    onChange={handleCustomerInfoChange}
                    placeholder="0712345678"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-1" /> Current Location / Address *
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    name="customerLocation"
                    value={customerInfo.customerLocation}
                    onChange={handleCustomerInfoChange}
                    placeholder="Enter your address or current location"
                    required
                  />
                  <Form.Text className="text-muted">Help us know your location for better service.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Special Requests (Optional)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={2}
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
