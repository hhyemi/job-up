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
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import GitHubLogin from 'react-github-login';
import GoogleLogin from 'react-google-login';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';

import Auth from '../../layouts/Auth';
import useInput from '../../hooks/useInput';
import { GIT_LOG_IN_REQUEST, LOAD_MY_INFO_REQUEST, loginRequestAction, LOG_IN_REQUEST } from '../../reducers/user';

const Login = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { me, git } = useSelector((state) => state.user);
  const { logInDone, logInError } = useSelector((state) => state.user);
  const { findPasswordDone, findPasswordError } = useSelector((state) => state.user);
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');
  const router = useRouter();

  // 로그인 성공, 로그인 되어있으면 메인페이지로 이동
  useEffect(() => {
    if (logInDone) {
      router.push('/admin/main');
    }
  }, [logInDone]);

  // 로그인 버튼 클릭
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, password);
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password]
  );

  // 로그인 실패
  useEffect(() => {
    if (logInError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(logInError);
    }
  }, [logInError]);

  // Google 로그인
  const responseGoogle = (res) => {
    console.log(res);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email: res.profileObj.email, password: res.profileObj.googleId, social: true }
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
        type: LOG_IN_REQUEST,
        data: { email: git.email, password: git.id, social: true }
      });
    }
  }, [git]);

  // 소셜 로그인 실패
  const responseFail = (err) => {
    console.error(err);
  };

  // 비밀번호 찾기
  const onClickFindPassword = useCallback((e) => {
    e.preventDefault();
    router.push('/auth/findpassword');
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary dark-shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>다른계정으로 로그인</small>
            </div>
            <div className="btn-wrapper text-center">
              <GitHubLogin
                clientId={process.env.GITHUB_KEY}
                redirectUri="http://localhost:3000"
                buttonText="Github"
                onSuccess={responseGithub}
                onFailure={responseFail}
                className="btn-neutral btn-icon mr-4 btn"
              >
                <span className="btn-inner--icon">
                  <img alt="..." src={require('assets/img/icons/common/github.svg')} />
                </span>
                <span className="btn-inner--text">Github</span>
              </GitHubLogin>
              <GoogleLogin
                className="goole-btn btn btn-neutral btn-icon"
                clientId={process.env.GOOGLE_KEY}
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseFail}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={onSubmitForm}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="이메일"
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
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="비밀번호"
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  로그인
                </Button>
                <br />
                <a className="text-muted" href="#pablo" onClick={onClickFindPassword}>
                  <small>비밀번호 찾기</small>
                </a>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

Login.layout = Auth;

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

export default Login;
