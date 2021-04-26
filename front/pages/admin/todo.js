import React from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';

// eslint-disable-next-line arrow-body-style
const Todo = () => {
  return (
    <>
      <Header />
      <Container className="mt--9 todo-container" fluid>
        <Row>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 card-style">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      to do
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">할일</span> <span>12</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-list-ul" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <Card className="card-stats mb-3 border-gray">
                  <CardBody className="pt-2 pb-2">
                    <Row>
                      <div className="col">
                        <span className="font-weight-bold mb-0">로그인하기</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="card-stats mb-3 border-gray">
                  <CardBody className="pt-2 pb-2">
                    <Row>
                      <div className="col">
                        <span className="font-weight-bold mb-0">로그인하기</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="card-stats mb-3 border-gray">
                  <CardBody className="pt-2 pb-2">
                    <Row>
                      <div className="col">
                        <span className="font-weight-bold mb-0">로그인하기</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="card-stats mb-3 border-gray">
                  <CardBody className="pt-2 pb-2">
                    <Row>
                      <div className="col">
                        <span className="font-weight-bold mb-0">로그인하기</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor">
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 card-style">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      in progress
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">진행중</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-spinner" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor">
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 card-style">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      completed
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">완료</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-check" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor">
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0 card-style">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      Pending
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">보류</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="fas fa-pause" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor">
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Todo.layout = Admin;

export default Todo;
