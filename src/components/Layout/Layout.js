import Navbar from './Navbar';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="py-4" style={{ 
        minHeight: 'calc(100vh - 72px)',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
      }}>
        {children}
      </Container>
      {/* Footer */}
      <footer className="text-center py-3 mt-4" style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        borderTop: '2px solid #DAA520'
      }}>
        <Container>
          <p className="mb-0">&copy; {new Date().getFullYear()} Marlex Hair. All rights reserved.</p>
          <small className="text-muted">Premium Hair & Beauty Services</small>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
