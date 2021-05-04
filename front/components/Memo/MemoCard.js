import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Container, CardDeck, Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import Modal from '../Modal/Modal';

import { UPT_SEQ_TODO_REQUEST } from '../../reducers/todo';
import MemoModal from './MemoModal';

const MemoCard = ({ memo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // 메모 수정, 삭제 (모달창열기)
  const uptMemo = useCallback((e) => {
    e.preventDefault();
    setModalOpen(true);
  });

  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card onClick={uptMemo} style={{ backgroundColor: `${memo.color}` }}>
        <CardImg alt="..." src={require('assets/img/theme/img-1-1000x600.jpg')} top />
        <i className="far fa-star fa-lg" />
        <CardBody>
          <CardTitle>{memo.title}</CardTitle>
          <CardText>d</CardText>
          <CardText>
            <small className="text-muted">{memo.createdAt.substring(0, 10)}</small>
          </CardText>
        </CardBody>
      </Card>
      <Modal open={modalOpen} close={closeModal} header="메모 수정">
        <MemoModal memo={memo} content={memo.content} />
      </Modal>
    </>
  );
};

MemoCard.propTypes = {
  memo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.any,
    bookmard: PropTypes.bool,
    createdAt: PropTypes.string
  }).isRequired
};

export default MemoCard;
