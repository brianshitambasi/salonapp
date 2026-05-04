import { useState, useEffect } from 'react';
import { serviceAPI, staffAPI, bookingAPI } from '../services/api';
import { Button, Table, Form, Card, Alert, Container, Row, Col, Tabs, Tab, Badge } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', durationMinutes: '',
    imageUrl: '', category: 'hair', tags: [], popular: false,
    discount: 0, benefits: []
  });
  const [staffForm, setStaffForm] = useState({ name: '', role: '', bio: '', imageUrl: '', experience: '', workingHours: { start: '09:00', end: '18:00' } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'https://salon-1-1.onrender.com/api';

  useEffect(() => {
    fetchServices();
    fetchStaff();
    fetchBookings();
    fetchUnreadCount();
  }, []);

  const fetchServices = async () => {
    const res = await serviceAPI.getAll();
    setServices(res.data);
  };

  const fetchStaff = async () => {
    const res = await staffAPI.getAll();
    setStaff(res.data);
  };

  const fetchBookings = async () => {
    const res = await bookingAPI.adminGetAll();
    setBookings(res.data);
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await bookingAPI.getUnreadCount();
      setUnreadCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max 5MB');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('image', selectedFile);
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Image uploaded!');
      return res.data.imageUrl;
    } catch (err) {
      toast.error('Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (tagInput && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setForm({ ...form, tags: form.tags.filter(tag => tag !== tagToRemove) });
  };

  const addBenefit = () => {
    if (benefitInput && !form.benefits.includes(benefitInput)) {
      setForm({ ...form, benefits: [...form.benefits, benefitInput] });
      setBenefitInput('');
    }
  };

  const removeBenefit = (benefitToRemove) => {
    setForm({ ...form, benefits: form.benefits.filter(b => b !== benefitToRemove) });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = form.imageUrl;
    if (selectedFile) {
      const uploadedUrl = await uploadFile();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }
    const serviceData = { ...form, imageUrl };
    try {
      if (editing) {
        await serviceAPI.update(editing._id, serviceData);
        toast.success('Service updated');
      } else {
        await serviceAPI.create(serviceData);
        toast.success('Service created');
      }
      setEditing(null);
      setForm({ name: '', description: '', price: '', durationMinutes: '', imageUrl: '', category: 'hair', tags: [], popular: false, discount: 0, benefits: [] });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving service');
      toast.error('Failed to save service');
    }
    setLoading(false);
  };

  const deleteService = async (id) => {
    if (window.confirm('Delete this service?')) {
      await serviceAPI.delete(id);
      toast.success('Service deleted');
      fetchServices();
    }
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await staffAPI.update(editing._id, staffForm);
        toast.success('Staff updated');
      } else {
        await staffAPI.create(staffForm);
        toast.success('Staff created');
      }
      setEditing(null);
      setStaffForm({ name: '', role: '', bio: '', imageUrl: '', experience: '', workingHours: { start: '09:00', end: '18:00' } });
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving staff');
      toast.error('Failed to save staff');
    }
    setLoading(false);
  };

  const deleteStaff = async (id) => {
    if (window.confirm('Delete this staff member?')) {
      await staffAPI.delete(id);
      toast.success('Staff deleted');
      fetchStaff();
    }
  };

  const updateBookingStatus = async (id, status) => {
    await bookingAPI.adminUpdateStatus(id, status);
    toast.success(`Booking ${status}`);
    fetchBookings();
  };

  const markAsRead = async (id) => {
    await bookingAPI.markAsRead(id);
    fetchUnreadCount();
    fetchBookings();
  };

  return (
    <Container className="py-4">
      <h2>Admin Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="services" title="Services">
          <div className="mt-4">
            <h4>Manage Services</h4>
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleServiceSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control placeholder="e.g., Haircut - Men" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                          <option value="hair">Hair</option>
                          <option value="nails">Nails</option>
                          <option value="spa">Spa</option>
                          <option value="makeup">Makeup</option>
                          <option value="waxing">Waxing</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Service Photo</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
                        {(previewUrl || form.imageUrl) && (
                          <div className="mt-2">
                            <img src={previewUrl || form.imageUrl} alt="Preview" style={{ height: '50px' }} />
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Describe the service..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control type="number" placeholder="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Duration (minutes)</Form.Label>
                        <Form.Control type="number" placeholder="30" value={form.durationMinutes} onChange={e => setForm({...form, durationMinutes: e.target.value})} required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Discount (%)</Form.Label>
                        <Form.Control type="number" placeholder="0" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Popular Service</Form.Label>
                        <Form.Check type="checkbox" label="Mark as Popular" checked={form.popular} onChange={e => setForm({...form, popular: e.target.checked})} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tags</Form.Label>
                        <div className="d-flex">
                          <Form.Control placeholder="e.g., Men, Women, Kids" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                          <Button type="button" onClick={addTag} className="ms-2">Add</Button>
                        </div>
                        <div className="mt-2">
                          {form.tags.map(tag => (
                            <Badge key={tag} bg="secondary" className="me-1 mb-1" style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)}>{tag} ✕</Badge>
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Benefits</Form.Label>
                        <div className="d-flex">
                          <Form.Control placeholder="e.g., Professional products, Relaxing atmosphere" value={benefitInput} onChange={e => setBenefitInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addBenefit())} />
                          <Button type="button" onClick={addBenefit} className="ms-2">Add</Button>
                        </div>
                        <div className="mt-2">
                          {form.benefits.map(benefit => (
                            <Badge key={benefit} bg="info" className="me-1 mb-1" style={{ cursor: 'pointer' }} onClick={() => removeBenefit(benefit)}>✓ {benefit} ✕</Badge>
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (editing ? 'Update Service' : 'Create Service')}</Button>
                  {editing && <Button variant="secondary" className="ms-2" onClick={() => { setEditing(null); setForm({}); setSelectedFile(null); setPreviewUrl(null); }}>Cancel</Button>}
                </Form>
              </Card.Body>
            </Card>

            <Table striped bordered hover responsive>
              <thead>
                <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Duration</th><th>Tags</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s._id}>
                    <td>{s.imageUrl && <img src={s.imageUrl} alt={s.name} style={{ height: '40px', width: '40px', objectFit: 'cover' }} />}</td>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>${s.price}{s.discount > 0 && <span className="text-danger ms-1">(-{s.discount}%)</span>}</td>
                    <td>{s.durationMinutes} min</td>
                    <td>{s.tags?.map(tag => <Badge key={tag} bg="secondary" className="me-1">{tag}</Badge>)}</td>
                    <td><Button size="sm" variant="warning" className="me-2" onClick={() => { setEditing(s); setForm(s); setPreviewUrl(s.imageUrl); }}>Edit</Button><Button size="sm" variant="danger" onClick={() => deleteService(s._id)}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="staff" title="Staff">
          <div className="mt-4">
            <h4>Manage Staff</h4>
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleStaffSubmit}>
                  <Row>
                    <Col md={4}><Form.Control placeholder="Name" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} required /></Col>
                    <Col md={4}><Form.Control placeholder="Role" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} required /></Col>
                    <Col md={2}><Form.Control placeholder="Start (09:00)" value={staffForm.workingHours.start} onChange={e => setStaffForm({...staffForm, workingHours: {...staffForm.workingHours, start: e.target.value}})} required /></Col>
                    <Col md={2}><Form.Control placeholder="End (18:00)" value={staffForm.workingHours.end} onChange={e => setStaffForm({...staffForm, workingHours: {...staffForm.workingHours, end: e.target.value}})} required /></Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={12}><Form.Control as="textarea" placeholder="Bio" rows={2} value={staffForm.bio} onChange={e => setStaffForm({...staffForm, bio: e.target.value})} /></Col>
                  </Row>
                  <Button type="submit" disabled={loading} className="mt-3">{loading ? 'Saving...' : (editing ? 'Update Staff' : 'Create Staff')}</Button>
                </Form>
              </Card.Body>
            </Card>
            <Table striped bordered hover>
              <thead><tr><th>Name</th><th>Role</th><th>Hours</th><th>Bio</th><th>Actions</th></tr></thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td><td>{s.role}</td><td>{s.workingHours?.start}-{s.workingHours?.end}</td><td>{s.bio?.substring(0, 50)}...</td>
                    <td><Button size="sm" variant="warning" className="me-2" onClick={() => { setEditing(s); setStaffForm(s); }}>Edit</Button><Button size="sm" variant="danger" onClick={() => deleteStaff(s._id)}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="bookings" title={`Bookings ${unreadCount > 0 ? `(${unreadCount} new)` : ''}`}>
          <div className="mt-4">
            <h4>Manage Bookings</h4>
            <Table striped bordered hover responsive>
              <thead>
                <tr><th>Customer</th><th>Email</th><th>Phone</th><th>Service</th><th>Staff</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className={!b.isRead && b.status === 'pending' ? 'table-warning' : ''}>
                    <td>{b.customerName || b.customerId?.name}</td><td>{b.customerEmail}</td><td>{b.customerPhone}</td>
                    <td>{b.serviceId?.name}</td><td>{b.staffId?.name}</td><td>{b.date}</td><td>{b.startTime}</td>
                    <td><Badge bg={b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'warning'}>{b.status}</Badge></td>
                    <td>
                      <div className="d-flex gap-2">
                        <Form.Select size="sm" onChange={e => updateBookingStatus(b._id, e.target.value)} defaultValue={b.status} style={{ width: '100px' }}>
                          <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                        </Form.Select>
                        {!b.isRead && <Button size="sm" variant="outline-success" onClick={() => markAsRead(b._id)}>Mark Read</Button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
