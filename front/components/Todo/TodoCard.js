import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Row, Badge } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import Modal from '../Modal/Modal';
import TodoModal from './TodoModal';

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { uptTodoDone } = useSelector((state) => state.todo);

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

  return (
    <>
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
      <Modal open={modalOpen} close={closeModal} header="일정 수정">
        <TodoModal todo={todo} />
      </Modal>{' '}
    </>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    sequence: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    deadline: PropTypes.string
  }).isRequired
};

export default TodoCard;
