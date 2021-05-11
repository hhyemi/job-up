import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardBody, Table, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

import wrapper from '../../store/configureStore';
import Header from '../../components/Headers/Header';
import Admin from '../../layouts/Admin';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_TODAY_CAL_REQUEST } from '../../reducers/calendar';
import { LOAD_TODAY_TODO_REQUEST } from '../../reducers/todo';

const Main = () => {
  const dispatch = useDispatch();
  const { calendars } = useSelector((state) => state.calendar);
  const { todos } = useSelector((state) => state.todo);

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  // 스탑워치 - 시작
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  // 스탑워치 - 중지
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  // 스탑워치 - 재시작
  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  // 스탑워치 - 재설정
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  // 오늘 달력 가져오기
  useEffect(() => {
    dispatch({
      type: LOAD_TODAY_CAL_REQUEST
    });
    dispatch({
      type: LOAD_TODAY_TODO_REQUEST
    });
  }, []);

  const todoCategory = {
    1: '할일',
    2: '진행중',
    3: '완료',
    4: '보류'
  };

  return (
    <>
      <Header />
      <Container className="mt-4 main-container" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">stopwatch</h6>
                    <h2 className="mb-0">Study StopWatch</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="stopwatch-div">
                  <p>{formatTime()}</p>
                  <div className="buttons">
                    {!isActive && !isPaused ? (
                      <>
                        <span className="text-md sw-start" onClick={handleStart}>
                          <span className="text-white font-weight-bold">시작</span>
                        </span>
                        <span className="text-md sw-reset" onClick={handleReset}>
                          <span className="text-white font-weight-bold">재설정</span>
                        </span>
                      </>
                    ) : isPaused ? (
                      <>
                        <span className="text-md sw-pause" onClick={handlePause}>
                          <span className="text-white font-weight-bold">중지</span>
                        </span>
                        <span className="text-md sw-lab" onClick={handleReset}>
                          <span className="text-white font-weight-bold">랩</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-md sw-resume" onClick={handleResume}>
                          <span className="text-white font-weight-bold">시작</span>
                        </span>
                        <span className="text-md sw-reset" onClick={handleReset}>
                          <span className="text-white font-weight-bold">재설정</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Table className="align-items-center table-flush mt-5 stop-table" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">랩</th>
                      <th scope="col">총시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {calendars.map((cal) => ( */}
                    <tr>
                      <th>1 </th>
                      <th>2321:#23;#</th>
                    </tr>
                    <tr>
                      <th>1 </th>
                      <th>2321:#23;#</th>
                    </tr>
                    <tr>
                      <th>1 </th>
                      <th>2321:#23;#</th>
                    </tr>
                    <tr>
                      <th>1 </th>
                      <th>2321:#23;#</th>
                    </tr>

                    {/* ))} */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">Calendar</h6>
                    <h2 className="mb-0">Today's schedule</h2>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <colgroup>
                  <col width="30%" />
                  <col width="20%" />
                  <col />
                </colgroup>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">카테고리</th>
                    <th scope="col">일정제목</th>
                    <th scope="col">일정시간</th>
                  </tr>
                </thead>
              </Table>
              <div className="scroll">
                <Table>
                  <colgroup>
                    <col width="30%" />
                    <col width="20%" />
                    <col />
                  </colgroup>
                  <tbody>
                    {calendars.map((cal) => (
                      <tr key={cal.id}>
                        <th>
                          <i className="fas fa-circle mr-2" style={{ color: `${cal.bgColor}`, fontSize: '0.1rem' }} />
                          {cal.name}
                        </th>
                        <th>{cal.title}</th>
                        <th>{moment(cal.start).format('YYYY-MM-DD hh:mm')}</th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
            <Card className="shadow mt-3">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">TodoList</h6>
                    <h2 className="mb-0">Today's TodoList</h2>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <colgroup>
                  <col width="30%" />
                  <col width="20%" />
                  <col />
                </colgroup>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">카테고리</th>
                    <th scope="col">할일제목</th>
                    <th scope="col">할일내용</th>
                  </tr>
                </thead>
              </Table>
              <div className="scroll">
                <Table>
                  <colgroup>
                    <col width="30%" />
                    <col width="20%" />
                    <col />
                  </colgroup>
                  <tbody>
                    {todos.map((todo) => (
                      <tr key={todo.id}>
                        <th>{todoCategory[todo.category]}</th>
                        <th>{todo.title}</th>
                        <th>{todo.content}</th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Main.layout = Admin;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : ''; // 쿠키까지 전달
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  await context.store.sagaTask.toPromise();
});

export default Main;
