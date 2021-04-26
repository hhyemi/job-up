import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Row, Badge } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';

const TodoCard = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Card className="card-stats mb-3 border-gray">
        <CardBody className="pt-2 pb-2">
          <Row>
            <div className="col">
              <span className="font-weight-bold mb-0">로그인하기</span>
              {'  '}
              <Badge color="primary">D-1</Badge>
              {/* <Badge color="danger">마감</Badge> */}
            </div>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default TodoCard;
