import React, { useEffect } from 'react';
import Link from 'next/link';
import { UncontrolledCollapse, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import Router from 'next/router';

function AuthNavbar() {
  const { logOutDone } = useSelector((state) => state.user);

  // 로그아웃 성공
  useEffect(() => {
    if (logOutDone) {
      Router.push('/auth/login');
    }
  }, [logOutDone]);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" style={{ top: '-5px !important' }} expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/admin/main">
            <a className="h4 mb-0 text-black d-none d-lg-inline-block"></a>
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className=" d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link href="/admin/main">
                      <img alt="..." src={require('assets/img/brand/logoUp.png')} />
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
                    <NavLink href="#pablo" className="nav-link-icon text-black">
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text">회원가입</span>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/auth/login">
                    <NavLink href="#pablo" className="nav-link-icon text-black">
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

export default AuthNavbar;
