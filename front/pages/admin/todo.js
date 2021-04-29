import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import TodoCard from '../../components/Todo/TodoCard';
import Modal from '../../components/Modal/Modal';
import TodoAdd from '../../components/Todo/TodoAdd';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { LOAD_TODO_REQUEST } from '../../reducers/todo';
import useChildRect from '../../hooks/useChildRect';

const Todo = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [clickCategory, setClickCategory] = useState(1);
  const { todos, addTodoDone, loadTodoDone, loadTodoError } = useSelector((state) => state.todo);

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');
  const initialValue = null;

  const [todoCnt, refTodoCnt] = useChildRect({ initialValue, loadTodoDone, addTodoDone });
  const [progCnt, refProgCnt] = useChildRect({ initialValue, loadTodoDone, addTodoDone });
  const [compleCnt, refCompleCnt] = useChildRect({ initialValue, loadTodoDone, addTodoDone });
  const [pendCnt, refPendCnt] = useChildRect({ initialValue, loadTodoDone, addTodoDone });

  // 일정 가져오기
  useEffect(() => {
    dispatch({
      type: LOAD_TODO_REQUEST
    });
  }, []);

  // 일정 가져오기 실패
  useEffect(() => {
    if (loadTodoError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(loadTodoError);
    }
  }, [loadTodoError]);

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
                    <span className="h2 font-weight-bold mb-0">할일</span> <span>{todoCnt}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-list-ul" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <div className="scroll" ref={refTodoCnt}>
                  {todos.map((todo) => todo.category === '1' && <TodoCard key={todo.id} todo={todo} />)}
                </div>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor plusTodo" data-msg={1} onClick={addTodo}>
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
                    <span className="h2 font-weight-bold mb-0">진행중</span> <span>{progCnt}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-spinner" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <div className="scroll" ref={refProgCnt}>
                  {todos.map((todo) => todo.category === '2' && <TodoCard key={todo.id} todo={todo} />)}
                </div>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor plusTodo" data-msg={2} onClick={addTodo}>
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
                    <span className="h2 font-weight-bold mb-0">완료</span> <span>{compleCnt}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-check" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <div className="scroll" ref={refCompleCnt}>
                  {todos.map((todo) => todo.category === '3' && <TodoCard key={todo.id} todo={todo} />)}
                </div>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor plusTodo" data-msg={3} onClick={addTodo}>
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
                    <span className="h2 font-weight-bold mb-0">보류</span> <span>{pendCnt}</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="fas fa-pause" />
                    </div>
                  </Col>
                </Row>
                <hr className="my-3" />
                <div className="scroll" ref={refPendCnt}>
                  {todos.map((todo) => todo.category === '4' && <TodoCard key={todo.id} todo={todo} />)}
                </div>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-muted mr-2 cursor plusTodo" data-msg={4} onClick={addTodo}>
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
