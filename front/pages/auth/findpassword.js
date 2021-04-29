import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from 'reactstrap';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import Auth from '../../layouts/Auth';
import useInput from '../../hooks/useInput';
import { FIND_PASSWORD_REQUEST } from '../../reducers/user';

const FindPassword = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const { findPasswordDone, findPasswordError } = useSelector((state) => state.user);
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  // 비밀번호 찾기 버튼
  const onClickForm = useCallback(() => {
    dispatch({
      type: FIND_PASSWORD_REQUEST,
      data: { name, email }
    });
  }, [name, email]);

  // 비밀번호 찾기 성공
  useEffect(() => {
    if (findPasswordDone) {
      setAlertShow(true);
      setAlertType('info');
      setAlertTitle('임시비밀번호를 전송했습니다.');
    }
  }, [findPasswordDone]);

  // 비밀번호 찾기 실패
  useEffect(() => {
    if (findPasswordError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(findPasswordError);
    }
  }, [findPasswordError]);

  // 로그인 버튼
  const onClickLogin = useCallback(() => {
    Router.replace('/auth/login');
  }, []);

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {!findPasswordDone ? (
            <>
              <CardHeader className="bg-transparent ">
                <div className="text-muted text-center mt-2">
                  <small>등록된 정보를 입력해주세요.</small>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="이름"
                        name="name"
                        type="text"
                        value={name}
                        onChange={onChangeName}
                        required
                        autoComplete="new-name"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="이메일"
                        name="email"
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                        required
                        autoComplete="new-email"
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button" onClick={onClickForm}>
                      비밀번호 찾기
                    </Button>
                    <br />
                  </div>
                </Form>
              </CardBody>
            </>
          ) : (
            <>
              <CardHeader className="bg-transparent ">
                <div className="text-muted text-center mt-2">
                  <small>임시비밀번호로 비밀번호가 변경되었습니다.</small>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className=" text-center">
                  <font style={{ fontSize: '14px' }}>
                    임시 비밀번호로 로그인하신 후 <br />
                    원하시는 비밀번호로 수정해서 이용하시기 바랍니다.
                  </font>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={onClickLogin}>
                    로그인
                  </Button>
                </div>
              </CardBody>
            </>
          )}
        </Card>
      </Col>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

FindPassword.layout = Auth;

export default FindPassword;
