import React, { useCallback, useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import TodoCard from '../../components/Todo/TodoCard';
import Modal from '../../components/Modal/Modal';
import TodoAdd from '../../components/Todo/TodoAdd';

const Todo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 카테고리 추가
  const addTodo = useCallback((e) => {
    e.preventDefault();
    setModalOpen(true);
  });

  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

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
                <div className="scroll">
                  <TodoCard />
                </div>
                <div className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor" onClick={addTodo}>
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
                  <Modal open={modalOpen} close={closeModal} todoCheck header="일정 추가">
                    <TodoAdd />
                  </Modal>
                </div>
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
                  <span className="text-muted mr-2 cursor" onClick={addTodo}>
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
                  <span className="text-muted mr-2 cursor" onClick={addTodo}>
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
                  <span className="text-muted mr-2 cursor" onClick={addTodo}>
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
