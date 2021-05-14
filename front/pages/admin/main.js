import React, { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Chart from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, Table, Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Router from 'next/router';

import { chartOptions, parseOptions } from '../../variables/charts';
import wrapper from '../../store/configureStore';
import Header from '../../components/Headers/Header';
import Admin from '../../layouts/Admin';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_TODAY_CAL_REQUEST } from '../../reducers/calendar';
import { LOAD_TODAY_TODO_REQUEST } from '../../reducers/todo';
import { ADD_STUDY_REQUEST, LOAD_TODAY_STUDY_REQUEST, LOAD_WEEK_STUDY_REQUEST } from '../../reducers/study';

const Main = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { calendars } = useSelector((state) => state.calendar);
  const { todos } = useSelector((state) => state.todo);
  const { weekStudies, todayStudies, addStudyError, addStudyDone } = useSelector((state) => state.study);

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  const [activeNav, setActiveNav] = React.useState(1);
  const [dayArr, setDayArr] = useState([]); // 주간 날짜
  const [dayArrData, setDayArrData] = useState([]); // 주간 날짜 데이터

  // 로그인이 없으면 로그인페이지로
  useEffect(() => {
    if (!me) {
      Router.push('/auth/login');
    }
  }, [me]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  // 주간 일간 변경 tab
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  // 스탑워치 - 시작
  const onStart = useCallback((e) => {
    e.preventDefault();
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  });

  // 스탑워치 - 중지
  const onPause = useCallback((e) => {
    e.preventDefault();
    clearInterval(countRef.current);
    setIsPaused(false);
  });

  // 스탑워치 - 재시작
  const onResume = useCallback((e) => {
    e.preventDefault();
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  });

  // 스탑워치 - 재설정
  const onReset = useCallback((e) => {
    e.preventDefault();
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  });

  // 스탑워치 - 저장
  const onTimeSave = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_STUDY_REQUEST,
        data: { time: timer }
      });
    },
    [timer]
  );

  // 스탑워치 저장 실패
  useEffect(() => {
    if (addStudyError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(addStudyError);
    }
  }, [addStudyError]);

  // 스탑워치 저장 성공
  useEffect(() => {
    if (addStudyDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('공부시간이 저장되었습니다. 일간에서 확인가능합니다.');
      setTimer(0);
      dispatch({
        type: LOAD_WEEK_STUDY_REQUEST
      });
    }
  }, [addStudyDone]);

  // 메인 데이터 가져오기
  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_TODAY_CAL_REQUEST
      });
      dispatch({
        type: LOAD_TODAY_TODO_REQUEST
      });
      dispatch({
        type: LOAD_TODAY_STUDY_REQUEST
      });
      dispatch({
        type: LOAD_WEEK_STUDY_REQUEST
      });
    }
  }, [me]);

  const todoCategory = {
    1: { title: '할일', color: '#f5365c' },
    2: { title: '진행중', color: '#fb6340 ' },
    3: { title: '완료', color: '#ffd600 ' },
    4: { title: '보류', color: '#11cdef ' }
  };

  useEffect(() => {
    const dayDay = [];
    for (let i = 0; i < 7; i++) {
      const now = new Date();
      const preDate = new Date(now.setDate(now.getDate() - i));

      const preYear = preDate.getFullYear();
      let preMonth = preDate.getMonth() + 1;
      let preDay = preDate.getDate();

      if (preMonth < 10) {
        preMonth = '0' + preMonth;
      }
      if (preDay < 10) {
        preDay = '0' + preDay;
      }
      dayDay.unshift(preYear + '-' + preMonth + '-' + preDay);
    }
    setDayArr(dayDay);

    const dayDate = [];
    dayArr.map((e) => {
      let key = true;
      weekStudies.map((el) => {
        if (e === el.day) {
          dayDate.push(el.time);
          key = false;
        }
      });
      key && dayDate.push(0);
    });

    setDayArrData(dayDate);
  }, [weekStudies]);

  // 그래프 데이터
  const chartData = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            let label = data.datasets[item.datasetIndex].label || '';
            let yLabel = item.yLabel;
            let content = '';
            const getSeconds = `0${yLabel % 60}`.slice(-2);
            const minutes = `${Math.floor(yLabel / 60)}`;
            const getMinutes = `0${minutes % 60}`.slice(-2);
            const getHours = `0${Math.floor(yLabel / 3600)}`.slice(-2);

            if (data.datasets.length > 1) {
              content += label;
            }
            content += ` ${getHours} : ${getMinutes} : ${getSeconds}`;
            return content;
          }
        }
      }
    },
    data: {
      labels: dayArr,
      datasets: [
        {
          label: 'Sales',
          data: dayArrData,
          maxBarThickness: 14
        }
      ]
    }
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
                        <span className="text-md sw-start" onClick={onStart}>
                          <span className="text-white font-weight-bold">시작</span>
                        </span>
                      </>
                    ) : isPaused ? (
                      <>
                        <span className="text-md sw-pause" onClick={onPause}>
                          <span className="text-white font-weight-bold">중지</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-md sw-resume" onClick={onResume}>
                          <span className="text-white font-weight-bold">재시작</span>
                        </span>
                        <span className="text-md sw-reset" onClick={onReset}>
                          <span className="text-white font-weight-bold">재설정</span>
                        </span>
                        <span className="text-md sw-save" onClick={onTimeSave}>
                          <span className="text-white font-weight-bold">저장</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: activeNav === 1
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">주간</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">일간</span>
                            <span className="d-md-none">D</span>
                          </NavLink>
                        </NavItem>
                        <a href="/admin/time">+ 더보기</a>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="main-chart-body">
                  {activeNav === 1 ? (
                    <div className="chart pt-3">
                      <Bar data={chartData.data} options={chartData.options} />
                    </div>
                  ) : (
                    <>
                      <Table className="align-items-center table-flush stop-table" responsive>
                        <colgroup>
                          <col width="20%" />
                          <col width="40%" />
                          <col />
                        </colgroup>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">공부시간</th>
                            <th scope="col">종료시간</th>
                          </tr>
                        </thead>
                      </Table>
                      <div className="scroll-stop">
                        <Table>
                          <colgroup>
                            <col width="20%" />
                            <col width="40%" />
                            <col />
                          </colgroup>
                          <tbody>
                            {todayStudies.map((dayStudy, index) => (
                              <tr key={dayStudy.id}>
                                <th>{index + 1}</th>
                                <th>
                                  {`0${Math.floor(dayStudy.time / 3600)}`.slice(-2)}:
                                  {`0${Math.floor(dayStudy.time / 60) % 60}`.slice(-2)}:
                                  {`0${dayStudy.time % 60}`.slice(-2)}
                                </th>
                                <th>{dayStudy.createdAt}</th>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
                </CardBody>
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
                        <th className="dot">
                          <i className="fas fa-circle mr-2" style={{ color: `${cal.bgColor}`, fontSize: '0.1rem' }} />
                          {cal.name}
                        </th>
                        <th>{cal.title}</th>
                        <th>{moment(cal.start).format('YYYY-MM-DD HH:mm')}</th>
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
                        <th className="dot">
                          <i
                            className="fas fa-circle mr-2"
                            style={{ color: `${todoCategory[todo.category].color}`, fontSize: '0.1rem' }}
                          />
                          {todoCategory[todo.category].title}
                        </th>
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
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
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
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Main;
