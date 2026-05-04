import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-4 text-primary mb-4">Welcome to Our Salon</h1>
          <p className="lead text-muted mb-4">Book your next haircut, styling, or treatment online.</p>
          <Button as={Link} to="/services" variant="primary" size="lg">
            View Services
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
