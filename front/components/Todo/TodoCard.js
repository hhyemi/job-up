import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Row, Badge } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();

  const day = new Date().getTime() - new Date(todo.deadline).getTime(); // 마감 디데이 계산
  const dDay = Math.floor(day / (1000 * 60 * 60 * 24)) * -1;
  const bgColor = dDay === 0 ? 'warning' : 'primary';

  return (
    <>
      <Card className="card-stats mb-3 border-gray">
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
