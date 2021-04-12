import React, { useEffect } from 'react';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import AuthNavbar from '../components/Navbars/AuthNavbar';
import Footer from '../components/Footers/Footer';

function Auth(props) {
  useEffect(() => {
    document.body.classList.add('bg-default');
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);
  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header py-7">
          <Container>
            <div className="header-body text-center mb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">{props.children.type.name}</h1>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Auth;
