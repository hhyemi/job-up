import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';

import AdminNavbar from '../components/Navbars/AdminNavbar';
import AuthNavbar from '../components/Navbars/AuthNavbar';
import Footer from '../components/Footers/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes';

function Admin(props) {
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  let mainContentRef = React.createRef();
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
    return 'Brand';
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('assets/img/brand/nextjs_argon_black.png'),
          imgAlt: '...'
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        {me ? (
          <AdminNavbar {...props} brandText={getBrandText()} />
        ) : (
          <AuthNavbar {...props} brandText={getBrandText()} />
        )}
        {props.children}
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  );
}

export default Admin;
