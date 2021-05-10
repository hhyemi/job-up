import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import Header from '../../components/Headers/Header';
import Admin from '../../layouts/Admin';
import CommtyList from '../../components/Community/CommtyList';
import EditCommty from '../../components/Community/EditCommty';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const Commty = () => {
  const [addPostOpen, setAddPostOpen] = useState(false);
  const { addCommtyDone, addCommtyError } = useSelector((state) => state.commty);

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  // 커뮤니티 추가 성공
  useEffect(() => {
    if (addCommtyDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('게시글이 등록되었습니다.');
    }
  }, [addCommtyDone]);

  // 커뮤니티 추가 실패
  useEffect(() => {
    if (addCommtyError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(addCommtyError);
    }
  }, [addCommtyError]);
  return (
    <>
      <Header />
      <Container className="mt--9 community-container" fluid>
        {!addPostOpen ? (
          <CommtyList
            setAddPostOpen={setAddPostOpen}
            setAlertType={setAlertType}
            setAlertShow={setAlertShow}
            setAlertTitle={setAlertTitle}
          />
        ) : (
          <EditCommty setEditOpen={setAddPostOpen} />
        )}
      </Container>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

Commty.layout = Admin;

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
  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Commty;
