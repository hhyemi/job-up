import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Label,
  Input
} from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import Header from '../../components/Headers/Header';
import Admin from '../../layouts/Admin';
import TimeList from '../../components/Time/TimeList';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { DEL_STUDY_REQUEST, LOAD_STUDY_REQUEST } from '../../reducers/study';
import todayDate from '../../util/todayDate';
import useInput from '../../hooks/useInput';

const Time = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { studies, studyCnt, loadStudyDone, delStudyDone } = useSelector((state) => state.study);
  const [pages, setPages] = useState([1]); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const [checkItems, setCheckItems] = useState([]); // 체크한 데이터
  const [startDate, onStartDate, setStartDate] = useInput(''); // 시작일자
  const [endDate, onEndDate, setEndDate] = useInput(''); // 종료일자
  const now = todayDate(); // 오늘 날짜

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');
  const [delAlertShow, setDelAlertShow] = useState(false);

  // 공부시간 가져오기
  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_STUDY_REQUEST,
        data: {
          offset: 0
        }
      });
    }
  }, [me]);

  // 공부시간 가져오기 성공
  useEffect(() => {
    if (loadStudyDone) {
      const tmpCnt = Math.ceil(studyCnt / 9);
      const studyPages = Array.from({ length: tmpCnt }, (v, i) => i + 1);
      setPages(studyPages.length === 0 ? [1] : studyPages);
    }
  }, [loadStudyDone]);

  // 날짜 선택
  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOAD_STUDY_REQUEST,
        data: {
          offset: 0,
          startDate,
          endDate
        }
      });
    },
    [currentPage, startDate, endDate]
  );

  // 날짜 초기화
  const onReset = useCallback((e) => {
    e.preventDefault();
    setStartDate('');
    setEndDate('');
  }, []);

  // 페이지 이동
  const movePage = useCallback(
    (e) => {
      e.preventDefault();
      const pageno = e.target.getAttribute('data-pageno');
      setCurrentPage(pageno);
      dispatch({
        type: LOAD_STUDY_REQUEST,
        data: {
          offset: (pageno - 1) * 9,
          startDate,
          endDate
        }
      });
    },
    [currentPage, startDate, endDate]
  );

  // 체크박스 단일 개체 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      studies.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  // 공부시간 삭제
  const deleteTimeCheck = useCallback(
    (e) => {
      e.preventDefault();
      if (checkItems.length === 0) {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('삭제할 공부시간을 선택해주세요.');
        return;
      }
      setDelAlertShow(true);
    },
    [checkItems, studies, delStudyDone]
  );

  const deleteTime = useCallback(() => {
    dispatch({
      type: DEL_STUDY_REQUEST,
      data: { checkItems }
    });
    setDelAlertShow(false);
    setCheckItems([]);
  }, [checkItems]);

  // 공부시간 삭제완료
  useEffect(() => {
    setCurrentPage(1);
    if (delStudyDone) {
      dispatch({
        type: LOAD_STUDY_REQUEST,
        data: {
          offset: 0
        }
      });
    }
  }, [delStudyDone]);

  return (
    <>
      <Header />
      <Container className="mt-4 stopwatch-container pb-5" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0">
            <Card className="shadow" style={{ minHeight: '625px' }}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col" style={{ maxWidth: '54%' }}>
                    <h3 className="mb-0">스탑워치</h3>
                  </div>
                  <div style={{ width: '12%' }}>
                    <div>
                      <div className="date-start-name">
                        <Label>시작일자</Label>
                      </div>
                      <Input minValue={now} value={startDate} onChange={onStartDate} type="date" />
                    </div>
                    <div className="date-end-name">
                      <Label>종료일자</Label>
                    </div>
                    <div className="end-date">
                      <Input value={endDate} onChange={onEndDate} type="date" />
                    </div>
                    <button type="button" className="btn btn-primary btn-md search-button" onClick={onSearch}>
                      검색
                    </button>
                    <button type="button" className="btn btn-white btn-md reset-button" onClick={onReset}>
                      초기화
                    </button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" style={{ textAlign: 'center' }} responsive>
                <colgroup>
                  <col width="5%" />
                  <col width="10%" />
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          id="customCheckRegister"
                          onChange={(e) => handleAllCheck(e.target.checked)}
                          checked={checkItems.length === studies.length}
                        />
                        <label className="custom-control-label" htmlFor="customCheckRegister" />
                      </div>
                    </th>
                    <th scope="col">No</th>
                    <th scope="col">공부시간</th>
                    <th scope="col">공부일자</th>
                    <th scope="col">종료시간</th>
                  </tr>
                </thead>
                <tbody>
                  {studies.map((time, index) => (
                    <TimeList
                      key={time.id}
                      time={time}
                      num={studyCnt - 9 * (currentPage - 1) - index}
                      checkItems={checkItems}
                      handleSingleCheck={handleSingleCheck}
                    />
                  ))}
                  {studies.length === 0 && (
                    <tr>
                      <td colSpan="5" className="pr-8 py-15">
                        저장된 공부시간이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <button
              type="button"
              className="btn btn-default btn-sm mb-2"
              style={{ position: 'absolute' }}
              onClick={deleteTimeCheck}
            >
              삭제
            </button>
            <nav aria-label="...">
              <Pagination>
                <PaginationItem className=" disabled">
                  <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className=" fa fa-angle-left" />
                    <span className=" sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                {pages.map((page) =>
                  page == currentPage ? (
                    <PaginationItem className="active" key={page}>
                      <PaginationLink data-pageno={page} href="#pablo" onClick={movePage}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink data-pageno={page} href="#pablo" onClick={movePage}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className=" fa fa-angle-right" />
                    <span className=" sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </Col>
        </Row>
      </Container>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
      <SweetAlert
        warning
        showCancel
        show={delAlertShow}
        cancelBtnText="취소"
        confirmBtnText="삭제"
        confirmBtnBsStyle="danger"
        title="삭제하시겠습니까?"
        onConfirm={() => deleteTime()}
        onCancel={() => setDelAlertShow(false)}
        focusCancelBtn
      />
    </>
  );
};

Time.layout = Admin;

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

export default Time;
