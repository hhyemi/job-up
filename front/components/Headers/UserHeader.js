import React from 'react';
import '../../assets/css/style.css';

import { Button, Container, Row, Col } from 'reactstrap';

function UserHeader() {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col>
              <h1 className="display-2 text-white">내 정보</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;
