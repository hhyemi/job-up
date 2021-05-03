import React, { useCallback, useState, useEffect } from 'react';
import { Container, CardDeck } from 'reactstrap';
import { useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import { END } from 'redux-saga';

import MemoCard from '../../components/Memo/MemoCard';
import Modal from '../../components/Modal/Modal';
import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import MemoModal from '../../components/Memo/MemoModal';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_MEMO_REQUEST } from '../../reducers/memo';

const Memo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { memos, addMemoDone, addMemoError } = useSelector((state) => state.memo);
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
        <div>
          <span>
            <input className="custom-control-input" id="checkFavorites" type="checkbox" />
            <label className="custom-control-label cursor" htmlFor="checkFavorites">
              <span className="text-secondary star">즐겨찾기만 보기</span>
            </label>
          </span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ float: 'right', marginRight: '17px' }}
            onClick={addMemo}
          >
            메모 추가
          </button>
          <Modal open={modalOpen} close={closeModal} header="메모 추가">
            <MemoModal />
          </Modal>
        </div>
        {memos.map((memo) => (
          <MemoCard key={memo.id} memo={memo} />
        ))}
        <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
      </Container>
    </>
  );
};

Memo.layout = Admin;

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
    type: LOAD_MEMO_REQUEST
  });
  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Memo;
