import React from 'react';
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

function Footer() {
  return (
    <>
      <footer style={{ padding: '2rem 0rem' }}>
        <Container style={{ maxWidth: '97%' }}>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{' '}
                <a className="font-weight-bold ml-1" href="https://github.com/hhyemi" target="_blank" rel="noreferrer">
                  Job-Up
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink href="https://github.com/hhyemi" target="_blank">
                    Hyemi
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://hhyemi.github.io/" target="_blank">
                    Blog
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
