import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  CustomInput,
  Label,
  Button
} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import { ADD_TODO_REQUEST } from '../../reducers/todo';

const TodoAdd = ({ clickCategory }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(''); // 카테고리
  const [title, onChangeTitle] = useInput(''); // 제목
  const [content, onChangeContent] = useInput(''); // 내용
  const [date, onChangeDate] = useState(''); // 마감일자
  const { todos, addTodoDone, addTodoError } = useSelector((state) => state.todo);

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  // 선택한 카테고리 적용
  useEffect(() => {
    setCategory(clickCategory);
  }, []);

  const onCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [category]
  );

  // 일정추가
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_TODO_REQUEST,
        data: { category, title, content, deadline: date }
      });
    },
    [category, title, content, date]
  );

  // 일정 추가 실패
  useEffect(() => {
    if (addTodoError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(addTodoError);
    }
  }, [addTodoError]);

  return (
    <>
      <CardBody className="px-lg-2 py-lg-2">
        <Form role="form" className="todo-add-form" onSubmit={onSubmitForm}>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input type="select" id="categorySelect" value={category} onChange={onCategory}>
                <option value="1">할일</option>
                <option value="2">진행중</option>
                <option value="3">완료</option>
                <option value="4">보류</option>
              </Input>
            </InputGroup>
          </FormGroup>
          <FormGroup className="mb-3">
            <Label>일정제목</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="제목을 입력해주세요."
                name="user-title"
                type="text"
                value={title}
                onChange={onChangeTitle}
                required
                autoComplete="new-title"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>일정내용</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-align-left-2" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="일정내용을 입력해주세요."
                name="user-content"
                type="textarea"
                value={content}
                onChange={onChangeContent}
                autoComplete="new-email"
                style={{ minHeight: '150px' }}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>마감일자</Label>
            <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" value={date} onChange={onChangeDate} required />
          </FormGroup>
          <div className="text-center">
            <Button color="primary" type="submit">
              추가
            </Button>
          </div>
        </Form>
      </CardBody>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

TodoAdd.propTypes = {
  clickCategory: PropTypes.number.isRequired
};

export default TodoAdd;
