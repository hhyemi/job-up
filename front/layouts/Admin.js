import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';

import AdminNavbar from '../components/Navbars/AdminNavbar';
import AuthNavbar from '../components/Navbars/AuthNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes';

function Admin({ children }) {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();

  const mainContentRef = React.createRef();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'COMMUNITY';
  };
  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: '/admin/main',
          imgSrc: require('assets/img/brand/logoUp.png'),
          imgAlt: '...'
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        {me ? <AdminNavbar brandText={getBrandText()} /> : <AuthNavbar brandText={getBrandText()} />}
        {children}
        <Container fluid>{/*     <footer className="py-5" />*/}</Container>
      </div>
    </>
  );
}

export default Admin;
