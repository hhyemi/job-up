import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Container, CardDeck, Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import { useDrag, useDrop } from 'react-dnd';

import { UPT_SEQ_TODO_REQUEST } from '../../reducers/todo';

// eslint-disable-next-line react/prop-types
const MemoCard = ({ memo }) => {
  return (
    <>
      <Card>
        <CardImg alt="..." src={require('assets/img/theme/img-1-1000x600.jpg')} top />
        <i className="far fa-star fa-lg" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>This is a wider card with supportinonal content. This content</CardText>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
};

MemoCard.propTypes = {
  memo: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
};

export default MemoCard;
