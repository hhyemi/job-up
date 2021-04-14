import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// reactstrap components
import { UncontrolledCollapse, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

function AuthNavbar({ brandText }) {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/admin/dashboard">
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">{brandText}</a>
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link href="/admin/dashboard">
                      <img alt="..." src={require('assets/img/brand/nextjs_argon_black.png')} />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar-collapse-main">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link href="/auth/register">
                    <NavLink href="#pablo" className="nav-link-icon">
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text">회원가입</span>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/auth/login">
                    <NavLink href="#pablo" className="nav-link-icon">
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text">로그인</span>
                    </NavLink>
                  </Link>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

AuthNavbar.defaultProps = {
  brandText: ''
};

AuthNavbar.propTypes = {
  brandText: PropTypes.string
};

export default AuthNavbar;
