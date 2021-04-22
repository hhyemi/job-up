import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import TuiCalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import wrapper from '../../store/configureStore';
import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';
import Modal from '../../components/Modal/Modal';
import Category from '../../components/Calendar/Category';
import { LOAD_CATEGORY_REQUEST } from '../../reducers/category';
import { ADD_CALENDAR_REQUEST, DEL_CALENDAR_REQUEST, LOAD_CALENDAR_REQUEST } from '../../reducers/calendar';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

// styled
const RenderDateSpan = styled.span`
  color: white;
  position: relative;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  margin-right: 1rem;
`;

const Calendar = () => {
  const cal = useRef(null);
  const dispatch = useDispatch();
  const [renderDate, setRenderDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { categories, loadCategoryError } = useSelector((state) => state.category);
  const { calendars, loadCalendarError, addCalendarDone } = useSelector((state) => state.calendar);

  // 카테고리, 달력 가져오기
  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORY_REQUEST
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_CALENDAR_REQUEST
    });
  }, [addCalendarDone]);

  // 카테고리 가져오기 실패
  useEffect(() => {
    if (loadCategoryError) {
      alert(loadCategoryError);
    }
  }, [loadCategoryError]);

  // 달력 가져오기 실패
  useEffect(() => {
    if (loadCalendarError) {
      alert(loadCalendarError);
    }
  }, [loadCalendarError]);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    // console.log(e, el.getBoundingClientRect());
  }, []);

  // 일정 등록
  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    const schedule = {
      id: String(Math.random()),
      calendarId: scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start._date,
      end: scheduleData.end._date,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw.class
      },
      state: scheduleData.state
    };

    dispatch({
      type: ADD_CALENDAR_REQUEST,
      data: schedule
    });

    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  // 일정 삭제
  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    dispatch({
      type: DEL_CALENDAR_REQUEST,
      data: id
    });

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  // 일정 수정
  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);

    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(schedule.id, schedule.calendarId, changes);
  }, []);

  // 달력 포맷
  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    const html = [];

    if (!isAllDay) {
      html.push(`<strong>${_getFormattedTime(schedule.start)}</strong>`);
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(`  ${schedule.title}`);
    }
    return html.join('');
  }

  // 현재년도, 월 나타내기
  const renderChange = useCallback((e) => {
    setRenderDate(
      `${cal.current.calendarInst._renderDate._date.getFullYear()}년 ${
        cal.current.calendarInst._renderDate._date.getMonth() + 1
      }월`
    );
  });

  // 초기 세팅 (일정, 현재날짜)
  const templates = {
    time(schedule) {
      // console.log(schedule);
      renderChange();
      return _getTimeTemplate(schedule, false);
    }
  };

  // 오늘로 돌아가기 버튼
  const moveToday = useCallback((e) => {
    e.preventDefault();
    cal.current.calendarInst.today();
    renderChange();
  });

  // 이전달 버튼
  const movePrev = useCallback((e) => {
    e.preventDefault();
    cal.current.calendarInst.prev();
    renderChange();
  });

  // 다음달 버튼
  const moveNext = useCallback((e) => {
    e.preventDefault();
    cal.current.calendarInst.next();
    renderChange();
  });

  // 카테고리 추가
  const addCategory = useCallback((e) => {
    e.preventDefault();
    setModalOpen(true);
  });
  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <Container className="mt--8" fluid>
        <div className="mb-2">
          <span>
            <button type="button" className="btn btn-danger btn-sm" onClick={moveToday}>
              Today
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={movePrev}>
              <i className="ni ni-bold-left" />
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={moveNext}>
              <i className="ni ni-bold-right" />
            </button>
            <RenderDateSpan>{renderDate}</RenderDateSpan>
            <button type="button" className="btn btn-warning btn-sm" style={{ float: 'right' }} onClick={addCategory}>
              카테고리 추가
            </button>
            <Modal open={modalOpen} close={closeModal} header="카테고리 추가">
              <Category />
            </Modal>
          </span>
        </div>
        <TuiCalendar
          ref={cal}
          height="800px"
          view="month"
          useCreationPopup
          useDetailPopup
          template={templates}
          calendars={categories}
          schedules={calendars}
          onClickSchedule={onClickSchedule}
          onBeforeCreateSchedule={onBeforeCreateSchedule}
          onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        />
      </Container>
    </>
  );
};

Calendar.layout = Admin;

// element오류 ㅠㅠ
// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log('getServerSideProps start');
//   const cookie = context.req ? context.req.headers.cookie : ''; // 쿠키까지 전달
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST
//   });

//   context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
//   console.log('getServerSideProps end');
//   await context.store.sagaTask.toPromise(); // 이건..사용방법 하라고
// });

export default Calendar;
