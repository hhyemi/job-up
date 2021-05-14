import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AuthNavbar from '../components/Navbars/AuthNavbar';
import Footer from '../components/Footers/Footer';

function Auth({ children }) {
  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header py-7">
          <Container>
            <div className="header-body text-center mb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-primary">{children.type.name}</h1>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {children.type.name === 'FindPassword' ? (
          <Container className="mt--8 pb-8">
            <Row className="justify-content-center">{children}</Row>
          </Container>
        ) : (
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">{children}</Row>
          </Container>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Auth;
