import React, { useCallback, useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import Modal from '../../components/Modal/Modal';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { LOAD_TODO_REQUEST, UPT_SEQ_LOC_REQUEST } from '../../reducers/todo';
import TodoModal from '../../components/Todo/TodoModal';
import TodoCol from '../../components/Todo/TodoCol';

const Todo = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [clickCategory, setClickCategory] = useState(1);
  const { me } = useSelector((state) => state.user);
  const { todos, addTodoDone, addTodoError, loadTodoError, uptTodoDone, uptTodoError } = useSelector(
    (state) => state.todo
  );
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_TODO_REQUEST
      });
    }
  }, [me]);

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
  }, []);

  // 일정 추가 성공
  useEffect(() => {
    if (addTodoDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('일정이 등록되었습니다.');
      setModalOpen(false);
    }
  }, [addTodoDone]);

  // 일정 추가 실패
  useEffect(() => {
    if (addTodoError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(addTodoError);
    }
  }, [addTodoError]);

  // 일정 수정 성공
  useEffect(() => {
    if (uptTodoDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('일정이 수정되었습니다.');
    }
  }, [uptTodoDone]);

  // 일정 수정 실패
  useEffect(() => {
    if (uptTodoError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(setAlertShow);
    }
  }, [uptTodoError]);

  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const [items, setItems] = useState(todos);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        dispatch({
          type: UPT_SEQ_LOC_REQUEST,
          data: coppiedStateArray
        });
        return coppiedStateArray;
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4 todo-container" fluid>
        <DndProvider backend={HTML5Backend}>
          <Row>
            <TodoCol
              setItems={setItems}
              moveCard={moveCard}
              addTodo={addTodo}
              num={1}
              title="할일"
              EngTitle="TO DO"
              icon="fas fa-list-ul"
              color="bg-danger"
            />
            <TodoCol
              setItems={setItems}
              moveCard={moveCard}
              addTodo={addTodo}
              num={2}
              title="진행중"
              EngTitle="IN PROGRESS"
              icon="fas fa-spinner"
              color="bg-warning"
            />
            <TodoCol
              setItems={setItems}
              moveCard={moveCard}
              addTodo={addTodo}
              num={3}
              title="완료"
              EngTitle="COMPLETED"
              icon="fas fa-check"
              color="bg-yellow"
            />
            <TodoCol
              setItems={setItems}
              moveCard={moveCard}
              addTodo={addTodo}
              num={4}
              title="보류"
              EngTitle="PENDING"
              icon="fas fa-pause"
              color="bg-info"
            />
          </Row>
        </DndProvider>
        <Modal open={modalOpen} close={closeModal} header="일정 추가">
          <TodoModal clickCategory={clickCategory} />
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
  context.store.dispatch({
    type: LOAD_TODO_REQUEST
  });
  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Todo;
