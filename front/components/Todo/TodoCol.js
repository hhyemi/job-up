import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector } from 'react-redux';

import TodoCard from './TodoCard';
import useChildRect from '../../hooks/useChildRect';

const TodoCol = ({ num, title, EngTitle, addTodo, icon, color, children }) => {
  const { todos, loadTodoDone, addTodoDone, delTodoDone } = useSelector((state) => state.todo);
  const refValue = { loadTodoDone, addTodoDone, delTodoDone };
  const [todoCnt, refCnt] = useChildRect(refValue);

  //  const [{ canDrop, isOver }, drop] = useDrop({
  //    accept: 'Our type',
  //    drop: () => ({ name: 'Some name' }),
  //    collect: (monitor) => ({
  //      isOver: monitor.isOver(),
  //      canDrop: monitor.canDrop()
  //    })
  //  });

  // console.log('options', { canDrop, isOver });
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
            {/* </CardBody><div className="scroll" ref={refCnt}> */}
            <div className="scroll" ref={refCnt}>
              {children}
              {todos.map((todo) => todo.category === `${num}` && <TodoCard key={todo.id} todo={todo} />)}
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
