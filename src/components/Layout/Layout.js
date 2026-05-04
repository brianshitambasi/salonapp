import Navbar from './Navbar';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="py-4" style={{ minHeight: 'calc(100vh - 72px)' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
