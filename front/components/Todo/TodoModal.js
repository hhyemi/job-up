import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Label,
  Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import todayDate from '../../util/todayDate';
import { ADD_TODO_REQUEST, DEL_TODO_REQUEST, UPT_TODO_REQUEST } from '../../reducers/todo';

// eslint-disable-next-line react/prop-types
const TodoModal = ({ clickCategory, todo }) => {
  // eslint-disable-next-line react/prop-types
  const { id, category, title, content, deadline } = todo;
  const dispatch = useDispatch();
  const [Todocategory, setCategory] = useState(clickCategory * 1 || category); // 카테고리
  const [Todotitle, onChangeTitle] = useInput(title); // 제목
  const [Todocontent, onChangeContent] = useInput(content); // 내용
  const [Tododate, onChangeDate] = useInput(deadline && deadline.toString().substring(0, 10)); // 마감일자
  const now = todayDate(); // 오늘 날짜

  const [delAlertShow, setDelAlertShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  // 선택한 카테고리 적용
  const onCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [category]
  );

  // 일정 추가
  const onAddTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (!Todotitle || !Todocontent || !Tododate) {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('모든 칸을 입력해주세요.');
        return;
      }
      dispatch({
        type: ADD_TODO_REQUEST,
        data: { category: Todocategory, title: Todotitle, content: Todocontent, deadline: Tododate }
      });
    },
    [Todocategory, Todotitle, Todocontent, Tododate]
  );

  // 일정 수정
  const onUptTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (!Todotitle || !Todocontent || !Tododate) {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('모든 칸을 입력해주세요.');
        return;
      }
      dispatch({
        type: UPT_TODO_REQUEST,
        data: { id, category: Todocategory, title: Todotitle, content: Todocontent, deadline: Tododate }
      });
    },
    [id, Todocategory, Todotitle, Todocontent, Tododate]
  );

  // 일정 삭제
  const onDelTodoCheck = useCallback((e) => {
    e.preventDefault();
    setDelAlertShow(true);
  }, []);
  const onDelTodo = useCallback(() => {
    dispatch({
      type: DEL_TODO_REQUEST,
      data: id
    });
  }, [id]);

  return (
    <>
      <CardBody className="px-lg-2 py-lg-2">
        <Form role="form" className="todo-add-form">
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input type="select" id="categorySelect" value={Todocategory} onChange={onCategory}>
                <option value={1}>할일</option>
                <option value={2}>진행중</option>
                <option value={3}>완료</option>
                <option value={4}>보류</option>
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
                value={Todotitle}
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
                value={Todocontent}
                onChange={onChangeContent}
                autoComplete="new-content"
                style={{ minHeight: '150px' }}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>마감일자</Label>
            <Input className="todo-date" value={Tododate} onChange={onChangeDate} type="date" />
          </FormGroup>
          <div className="text-center">
            {clickCategory ? (
              <Button color="primary" type="button" className="btn-md" onClick={onAddTodo}>
                추가
              </Button>
            ) : (
              <>
                <Button color="primary" type="button" className="btn-md" onClick={onUptTodo}>
                  수정
                </Button>
                <Button color="default" type="button" className="btn-md" onClick={onDelTodoCheck}>
                  삭제
                </Button>
              </>
            )}
          </div>
        </Form>
      </CardBody>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
      <SweetAlert
        warning
        showCancel
        show={delAlertShow}
        cancelBtnText="취소"
        confirmBtnText="삭제"
        confirmBtnBsStyle="danger"
        title="삭제하시겠습니까?"
        onConfirm={() => onDelTodo()}
        onCancel={() => setDelAlertShow(false)}
        focusCancelBtn
      />
    </>
  );
};

TodoModal.defaultProps = {
  todo: PropTypes.shape({
    id: '',
    category: '',
    sequence: '',
    title: '',
    content: '',
    deadline: ''
  })
};

export default TodoModal;
