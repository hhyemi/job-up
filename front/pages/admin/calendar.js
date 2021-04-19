import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import TuiCalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import Admin from '../../layouts/Admin';
import Header from '../../components/Headers/Header';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const schedules = [
  {
    id: '1',
    calendarId: '2',
    category: 'time',
    isVisible: true,
    title: 'Study',
    body: 'Test',
    start,
    end
  },
  {
    id: '2',
    calendarId: '2',
    category: 'time',
    isVisible: true,
    title: 'Meeting',
    body: 'Description',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  },
  {
    id: '3',
    calendarId: '3',
    category: 'time',
    isVisible: true,
    title: 'Meeting',
    body: 'Description',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  }
];

const calendars = [
  {
    id: '1',
    name: 'My Calendar',
    color: '#ffffff',
    bgColor: '#9e5fff',
    dragBgColor: '#9e5fff',
    borderColor: '#9e5fff'
  },
  {
    id: '2',
    name: 'Company',
    color: '#ffffff',
    bgColor: '#00a9ff',
    dragBgColor: '#00a9ff',
    borderColor: '#00a9ff'
  },
  {
    id: '3',
    name: 'Company',
    color: '#ffffff',
    bgColor: '#fc590e',
    dragBgColor: '#fc590e',
    borderColor: '#fc590e'
  }
];
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
  const [renderDate, setRenderDate] = useState('');

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log(e, el.getBoundingClientRect());
  }, []);

  // 일정 등록
  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.log(scheduleData);

    const schedule = {
      id: String(Math.random()),
      calendarId: scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw.class
      },
      state: scheduleData.state
    };

    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  // 일정 삭제
  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

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
      console.log(schedule);
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
            <button type="button" className="btn btn-warning btn-sm" style={{ float: 'right' }} onClick={moveNext}>
              카테고리 추가
            </button>
          </span>
        </div>
        <TuiCalendar
          ref={cal}
          height="800px"
          view="month"
          useCreationPopup
          useDetailPopup
          template={templates}
          calendars={calendars}
          schedules={schedules}
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

export default Calendar;
