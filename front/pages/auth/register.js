import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Input
} from 'reactstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import GitHubLogin from 'react-github-login';
import GoogleLogin from 'react-google-login';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import Auth from '../../layouts/Auth';
import { GIT_LOG_IN_REQUEST, SEND_EMAIL_REQUEST, SIGN_UP_REQUEST } from '../../reducers/user';

// styled
const ErrorMessage = styled.div`
  color: #fb6340;
  font-size: 80%;
`;

const Register = () => {
  const dispatch = useDispatch();
  const [name, onChangeName] = useInput('');
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

  // 약관
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState('');
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  // 회원가입 버튼
  const onSubmit = useCallback(() => {
    if (!term) {
      return setTermError(true);
    }
    if (!emailPass) {
      setAlertShow(true);
      setAlertType('warning');
      setAlertTitle('이메일 인증을 해주세요.');
      return;
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        name,
        email,
        password
      }
    });
  }, [name, email, password, term, emailPass]);

  // 로그인일때 회원가입 막기
  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  // 회원가입 성공
  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  // 회원가입 실패
  useEffect(() => {
    if (signUpError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(signUpError);
    }
  }, [signUpError]);

  // Google 로그인
  const responseGoogle = (res) => {
    console.log(res);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { name: res.profileObj.name, email: res.profileObj.email, password: res.profileObj.googleId, social: true }
    });
  };

  // Github 로그인
  const responseGithub = async (res) => {
    console.log(res.code);
    dispatch({
      type: GIT_LOG_IN_REQUEST,
      data: { code: res.code }
    });
  };

  // Github 정보 받기
  useEffect(async () => {
    if (git) {
      console.log(git);
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email: git.email, password: git.id, name: git.name, social: true }
      });
    }
  }, [git]);

  // 소셜 로그인 실패
  const responseFail = (err) => {
    console.error(err);
  };

  // 이메일 인증번호 전송
  const sendEmail = useCallback(async (e) => {
    e.preventDefault();
    if (!email) {
      setAlertShow(true);
      setAlertType('warning');
      setAlertTitle('이메일을 입력해주세요.');
      return;
    }
    setEmailVisible(true);
    dispatch({
      type: SEND_EMAIL_REQUEST,
      data: { email }
    });
    setAlertShow(true);
    setAlertType('info');
    setAlertTitle('이메일을 전송했습니다.');
  });

  // 이메일 인증번호 전송 성공
  useEffect(() => {
    if (sendEmailDone) {
      console.log(emailCode);
    }
  }, [sendEmailDone, emailCode]);

  // 이메일 인증버튼
  const checkEmail = useCallback((e) => {
    e.preventDefault();
    if (!emailCheck) {
      setAlertShow(true);
      setAlertType('warning');
      setAlertTitle('인증번호를 입력해주세요.');
      return;
    }
    if (emailCheck === emailCode) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('인증되었습니다');
      setEmailVisible(false);
      setEmailPass(true);
    } else {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle('인증번호가 일치하지 않습니다.');
    }
  });

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>다른 계정으로 회원가입하기</small>
            </div>
            <div className="text-center">
              <GitHubLogin
                clientId={process.env.GITHUB_KEY}
                redirectUri="http://localhost:3000"
                buttonText="Github"
                onSuccess={responseGithub}
                onFailure={responseFail}
                className="btn-neutral btn-icon mr-4 btn btn-default"
              >
                <span className="btn-inner--icon">
                  <img alt="..." src={require('assets/img/icons/common/github.svg')} />
                </span>
                <span className="btn-inner--text">Github</span>
              </GitHubLogin>
              <GoogleLogin
                clientId={process.env.GOOGLE_KEY}
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseFail}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <AvForm role="form" onValidSubmit={onSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <AvField
                    placeholder="이름"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: '이름을 입력해주세요.' }
                    }}
                    value={name}
                    onChange={onChangeName}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <AvField
                    placeholder="이메일"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    errorMessage="이메일 형식으로 입력해주세요."
                    validate={{
                      required: { value: true, errorMessage: '이메일을 입력해주세요.' }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <Button type="button" onClick={sendEmail} style={{ marginBottom: '10px' }}>
                이메일 인증
              </Button>
              <FormGroup>
                {emailVisible && (
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      placeholder="인증번호"
                      name="emailCheck"
                      value={emailCheck}
                      onChange={onChangeEmailCheck}
                      validate={{
                        required: { value: true, errorMessage: '인증번호를 입력해주세요.' }
                      }}
                    />
                    <Button type="button" onClick={checkEmail}>
                      인증확인
                    </Button>
                  </InputGroup>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <AvField
                    placeholder="비밀번호"
                    name="originPassword"
                    type="password"
                    onChange={onChangePassword}
                    validate={{
                      required: { value: true, errorMessage: '비밀번호를 입력해주세요.' }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <AvField
                    placeholder="비밀번호 확인"
                    name="confirmationPassword"
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: '비밀번호확인을  입력해주세요.' },
                      match: { value: 'originPassword', errorMessage: '비밀번호가 일치하지 않습니다.' }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      checked={term}
                      onChange={onChangeTerm}
                    />
                    <label className="custom-control-label" htmlFor="customCheckRegister">
                      <span className="text-muted">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          개인정보약관
                        </a>
                        에 동의합니다.
                      </span>
                    </label>
                    {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" loading={signUpLoading.toString()}>
                  회원가입
                </Button>
              </div>
            </AvForm>
          </CardBody>
        </Card>
      </Col>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

Register.layout = Auth;

export default Register;
