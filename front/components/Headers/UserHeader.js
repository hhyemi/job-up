import React from 'react';
import { Container, Row, Col } from 'reactstrap';

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
        <span className="mask opacity-8" style={{ background: '#172b4d' }} />
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
