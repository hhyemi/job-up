import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Row, Badge } from 'reactstrap';
import { useDrag, useDrop } from 'react-dnd';

import Modal from '../Modal/Modal';
import TodoModal from './TodoModal';
import { UPT_LOC_TODO_REQUEST, UPT_SEQ_LOC_REQUEST, UPT_SEQ_TODO_REQUEST, UPT_TODO_REQUEST } from '../../reducers/todo';

// eslint-disable-next-line react/prop-types
const TodoCard = ({ todo, index, setItems, moveCard }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { todos, uptTodoDone, uptLocTodoDone } = useSelector((state) => state.todo);
  const ref = useRef(null);

  const day = new Date().getTime() - new Date(todo.deadline).getTime(); // 마감 디데이 계산
  const dDay = Math.floor(day / (1000 * 60 * 60 * 24)) * -1;
  const bgColor = dDay === 0 ? 'warning' : 'primary';

  // 일정 수정, 삭제 (모달창열기)
  const uptTodo = useCallback((e) => {
    e.preventDefault();
    setModalOpen(true);
  });

  // 일정 수정 성공 (모달창닫기)
  useEffect(() => {
    if (uptTodoDone) {
      setModalOpen(false);
    }
  }, [uptTodoDone]);

  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const changeCard = (item, category) => {
    if (item.todo.category !== category) {
      dispatch({
        type: UPT_SEQ_TODO_REQUEST,
        data: { id: item.todo.id, category }
      });
    } else {
      todos.map((e, i) => {
        dispatch({
          type: UPT_SEQ_TODO_REQUEST,
          data: { id: e.id, sequence: i }
        });
        return e;
      });
    }
  };

  useEffect(() => {
    if (uptLocTodoDone) {
      console.log(todos);
      setItems((prevState) => {
        console.log(`prevState::${prevState}`);
      });
    }
  }, [uptLocTodoDone]);

  const [, drop] = useDrop({
    accept: 'TodoCard',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, todo, type: 'TodoCard' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { num } = dropResult;
        changeCard(item, num);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <>
      <div ref={ref} style={{ opacity }}>
        <Card className="card-stats mb-3 border-gray" onClick={uptTodo}>
          <CardBody className="pt-2 pb-2">
            <Row>
              <div className="col">
                <span className="font-weight-bold mb-0">{todo.title}</span>
                {dDay < 0 ? (
                  <Badge style={{ float: 'right' }} color="danger">
                    마감
                  </Badge>
                ) : (
                  <Badge style={{ float: 'right' }} color={bgColor}>
                    {dDay === 0 ? '오늘마감' : `D - ${dDay}`}
                  </Badge>
                )}
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
      <Modal open={modalOpen} close={closeModal} header="일정 수정">
        <TodoModal todo={todo} />
      </Modal>
    </>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.number,
    sequence: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    deadline: PropTypes.string
  }).isRequired
};

export default TodoCard;
