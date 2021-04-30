import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { useDrop } from 'react-dnd';

import { useSelector } from 'react-redux';

import useChildRect from '../../hooks/useChildRect';
import TodoCard from './TodoCard';

const TodoCol = ({ setItems, moveCard, num, title, EngTitle, addTodo, icon, color }) => {
  const { todos, loadTodoDone, addTodoDone, delTodoDone } = useSelector((state) => state.todo);
  const refValue = { loadTodoDone, addTodoDone, delTodoDone };
  const [todoCnt, refCnt] = useChildRect(refValue);

  const [, drop] = useDrop({
    accept: 'TodoCard',
    drop: () => ({ num })
  });

  return (
    <>
      <Col lg="6" xl="3">
        <Card className="card-stats mb-4 mb-xl-0 card-style">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  {EngTitle}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">{title}</span> <span>{todoCnt}</span>
              </div>
              <Col className="col-auto">
                <div className={`icon icon-shape text-white rounded-circle shadow ${color}`}>
                  <i className={icon} />
                </div>
              </Col>
            </Row>
            <hr className="my-3" />
            <div className="scroll" ref={drop}>
              <div ref={refCnt}>
                {todos.map(
                  (todo, index) =>
                    todo.category === num && (
                      <TodoCard key={todo.id} todo={todo} setItems={setItems} index={index} moveCard={moveCard} />
                    )
                )}
              </div>
            </div>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-muted mr-2 cursor plusTodo" data-msg={num} onClick={addTodo}>
                <i className="fas fa-plus" /> 새로 만들기
              </span>{' '}
            </p>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

TodoCol.propTypes = {
  num: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  EngTitle: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default TodoCol;
