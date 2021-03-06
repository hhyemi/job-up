import React, { useCallback, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const [onlyBookmark, setOnlyBookmark] = useState(false); // 즐겨찾기만 보기
  const { me } = useSelector((state) => state.user);
  const { memos, hasMoreMemos, loadMemoLoading, addMemoDone, addMemoError, uptMemoDone } = useSelector(
    (state) => state.memo
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_MEMO_REQUEST
      });
    }
  }, [me]);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMoreMemos && !loadMemoLoading) {
          const lastId = memos[memos.length - 1]?.id;
          dispatch({
            type: LOAD_MEMO_REQUEST,
            lastId
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      // 스크롤 해지를 해줘야함 메모리가 쌓임 , onScroll같은 함수를 넣어야함
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreMemos, loadMemoLoading, memos]);

  // 즐겨찾기만 보기
  const onOnlyBookmark = useCallback((e) => {
    setOnlyBookmark(e.target.checked);
  });

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

  // 메모 수정 성공
  useEffect(() => {
    if (uptMemoDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('메모가 수정되었습니다.');
    }
  }, [uptMemoDone]);

  return (
    <>
      <Header />
      <Container className="mt-3 memo-container " fluid>
        <div>
          <span>
            <input
              className="custom-control-input"
              id="checkBookMark"
              type="checkbox"
              checked={onlyBookmark}
              onChange={onOnlyBookmark}
            />
            <label className="custom-control-label cursor" htmlFor="checkBookMark">
              <span className="text-dark star">즐겨찾기만 보기</span>
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
            <MemoModal setAlertShow={setAlertShow} setAlertTitle={setAlertTitle} setAlertType={setAlertType} />
          </Modal>
        </div>
        {memos.map((memo) =>
          onlyBookmark ? (
            memo.bookmark && <MemoCard key={memo.id} memo={memo} />
          ) : (
            <MemoCard key={memo.id} memo={memo} />
          )
        )}
        {memos.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: '15%' }}>
            <i className="fas fa-exclamation-circle fa-4x pl-0 pb-2 text-gray" />
            <br />
            등록된 메모가 없습니다.
          </div>
        )}
        <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
      </Container>
    </>
  );
};

Memo.layout = Admin;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
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
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Memo;
