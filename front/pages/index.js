import React, { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Index = () => {
  useEffect(() => {
    Router.push('/admin/dashboard');
  }, []);

  return <div />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  // 프론트서버에서실행 (주체는 프론트서버에서 백엔드로 쿠키전달 x 그래서 아래 )
  const cookie = context.req ? context.req.headers.cookie : ''; // 쿠키까지 전달
  // if문이랑 쿠키초기화를(아래) 안쓰면 다른사람이 사이트 들어와도 로그인되어있음 (프론트서버에서 쿠키가 공유되는 현상)
  axios.defaults.headers.Cookie = '';
  // 서버일때 && 쿠키가 있을때만 쿠키 넣어주기 아니면 위에 줄 초기화
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });

  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise(); // 이건..사용방법 하라고
  // return { props: { data:123 }} // Home({ data })이렇게 전달가능
});

export default Index;
