import React, { useCallback, useState, useEffect } from 'react';
import { Container, CardDeck } from 'reactstrap';
import { useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import MemoCard from '../../components/Memo/MemoCard';
import Modal from '../../components/Modal/Modal';
import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import MemoModal from '../../components/Memo/MemoModal';

const Memo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { addMemoDone, addMemoError } = useSelector((state) => state.memo);
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  // 카테고리 추가
  const addMemo = useCallback((e) => {
    e.preventDefault();
    setModalOpen(true);
  });

  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 메모 추가 성공
  useEffect(() => {
    if (addMemoDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('메모가 등록되었습니다.');
      setModalOpen(false);
    }
  }, [addMemoDone]);

  // 메모 추가 실패
  useEffect(() => {
    if (addMemoError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(addMemoError);
    }
  }, [addMemoError]);

  return (
    <>
      <Header />
      <Container className="mt--9 memo-container " fluid>
        <div className="mb-3">
          <span>
            <input className="custom-control-input" id="checkFavorites" type="checkbox" />
            <label className="custom-control-label cursor" htmlFor="checkFavorites">
              <span className="text-secondary star">즐겨찾기만 보기</span>
            </label>
          </span>
          <button type="button" className="btn btn-primary btn-sm" style={{ float: 'right' }} onClick={addMemo}>
            메모 추가
          </button>
          <Modal open={modalOpen} close={closeModal} header="메모 추가">
            <MemoModal />
          </Modal>
        </div>
        <CardDeck>
          <MemoCard />
          <MemoCard />
          <MemoCard />
          <MemoCard />
        </CardDeck>
        <CardDeck>
          <MemoCard />
          <MemoCard />
          <MemoCard />
          <MemoCard />
        </CardDeck>
        <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
      </Container>
    </>
  );
};

Memo.layout = Admin;

export default Memo;
