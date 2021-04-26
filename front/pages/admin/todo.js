import React, { useCallback, useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';

import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import TodoCard from '../../components/Todo/TodoCard';
import Modal from '../../components/Modal/Modal';
import TodoAdd from '../../components/Todo/TodoAdd';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import SweetAlert from 'react-bootstrap-sweetalert';

const Todo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickCategory, setClickCategory] = useState(1);
  const { addTodoDone } = useSelector((state) => state.todo);

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  // 일정 추가
  const addTodo = useCallback((e) => {
    e.preventDefault();
    const msg = e.target.getAttribute('data-msg');
    setClickCategory(msg);
    setModalOpen(true);
  });

  // 일정 추가 성공
  useEffect(() => {
    if (addTodoDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('일정이 등록되었습니다.');
      setModalOpen(false);
    }
  }, [addTodoDone]);

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
                  <span className="text-muted mr-2 cursor" data-msg={1} onClick={addTodo}>
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
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
                  <span className="text-muted mr-2 cursor" data-msg={2} onClick={addTodo}>
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
                  <span className="text-muted mr-2 cursor" data-msg={3} onClick={addTodo}>
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
                  <span className="text-muted mr-2 cursor" data-msg={4} onClick={addTodo}>
                    <i className="fas fa-plus" /> 새로 만들기
                  </span>{' '}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal open={modalOpen} close={closeModal} header="일정 추가">
          <TodoAdd clickCategory={clickCategory} />
        </Modal>
      </Container>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

Todo.layout = Admin;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  const cookie = context.req ? context.req.headers.cookie : ''; // 쿠키까지 전달
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Todo;
