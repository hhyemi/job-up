/*eslint-disable*/
import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { backUrl } from '../../config/config';
var ps;

function Sidebar(props) {
  const router = useRouter();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const { me } = useSelector((state) => state.user);

  const activeRoute = (routeName) => {
    return router.route.indexOf(routeName) > -1;
  };

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  // 로그아웃 버튼
  const onLogOut = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutRequestAction());
  }, []);

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <div key={key}>
          {prop.icon && (
            <NavItem key={key} active={activeRoute(prop.layout + prop.path)}>
              <Link href={prop.layout + prop.path}>
                <NavLink href="#pablo" active={activeRoute(prop.layout + prop.path)} onClick={closeCollapse}>
                  <i className={prop.icon} />
                  {prop.name}
                </NavLink>
              </Link>
            </NavItem>
          )}
        </div>
      );
    });
  };
  const { routes, logo } = props;
  let navbarBrand = (
    <NavbarBrand href="#pablo" className="pt-0">
      <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
    </NavbarBrand>
  );

  const onCommunity = useCallback((e) => {
    e.preventDefault();
    router.push('/admin/commty');
  });

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo && logo.innerLink ? (
          <Link href={logo.innerLink}>
            <span>{navbarBrand}</span>
          </Link>
        ) : null}
        {logo && logo.outterLink ? (
          <a href={logo.innerLink} target="_blank">
            {navbarBrand}
          </a>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon"></DropdownToggle>
            <DropdownMenu aria-labelledby="navbar-default_dropdown_1" className="dropdown-menu-arrow" right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={me && me.src && `${backUrl}/${me.src}`} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <Link href="/admin/profile">
                <DropdownItem>
                  <i className="ni ni-single-02" />
                  <span>내 정보</span>
                </DropdownItem>
              </Link>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={onLogOut}>
                <i className="ni ni-button-power" />
                <span>로그아웃</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link href={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Communicate with people</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink onClick={onCommunity} className="cursor">
                <i className="ni ni-archive-2" style={{ color: '#00a75fb8' }} />
                Community
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://github.com/hhyemi/job-up">
                <i className="ni ni-spaceship" />
                Hyemi
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link href="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
