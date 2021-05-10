import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from 'reactstrap';
import Router from 'next/router';

import { backUrl } from '../../config/config';
import { logoutRequestAction } from '../../reducers/user';

const AdminNavbar = ({ brandText }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  // 로그아웃 버튼
  const onLogOut = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutRequestAction());
  }, []);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/admin/dashboard">
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">{brandText}</a>
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="..." src={me && me.src && `${backUrl}/${me.src}`} />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">{me.name}</span>
                  </Media>
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
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={onLogOut}>
                  <i className="ni ni-user-run" />
                  <span>로그아웃</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

AdminNavbar.defaultProps = {
  brandText: ''
};

AdminNavbar.propTypes = {
  brandText: PropTypes.string
};

export default AdminNavbar;
