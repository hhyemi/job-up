import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Form,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  CustomInput,
  Label
} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';

const TodoAdd = () => {
  const dispatch = useDispatch();
  const [date, onChangeDate] = useState('');

  const [email, onChangeEmail] = useInput(''); // 이메일
  const [emailCheck, onChangeEmailCheck] = useInput(''); // 이메일 인증번호
  const [password, onChangePassword] = useInput('');
  const [emailVisible, setEmailVisible] = useState(false); // 인증번호 입력창 숨김처리 (f:숨김, t:보여줌)
  const [emailPass, setEmailPass] = useState(false); // 인증번호 성공
  const { me, git, emailCode, signUpLoading, signUpDone, signUpError, sendEmailDone } = useSelector(
    (state) => state.user
  );
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  // 로그인 버튼 클릭
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
  }, []);

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
              <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                <option>할일</option>
                <option>진행중</option>
                <option>완료</option>
                <option>보류</option>
              </CustomInput>
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
                name="user-email"
                type="email"
                value={email}
                onChange={onChangeEmail}
                required
                autoComplete="new-email"
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
                name="user-email"
                type="textarea"
                required
                autoComplete="new-email"
                style={{ minHeight: '150px' }}
              />
            </InputGroup>
          </FormGroup>
          <Label>마감일자</Label>
          <DatePicker id="example-datepicker" dateFormat="YYYY/MM/DD" value={date} onChange={onChangeDate} />
        </Form>
      </CardBody>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

export default TodoAdd;
