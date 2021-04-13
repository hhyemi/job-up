import React, { useCallback, useEffect } from 'react';
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
  Row,
  Col
} from 'reactstrap';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import GitHubLogin from 'react-github-login';
import GoogleLogin from 'react-google-login';

import Auth from '../../layouts/Auth';
import useInput from '../../hooks/useInput';
import { GIT_LOG_IN_REQUEST, loginRequestAction, LOG_IN_REQUEST } from '../../reducers/user';

const Login = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { me, git } = useSelector((state) => state.user);
  const { logInLoading, logInError } = useSelector((state) => state.user);

  // 로그인 버튼 클릭
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, password);
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password]
  );

  // 로그인 성공
  useEffect(() => {
    if (me) {
      Router.replace('/');
    }
  }, [me]);

  // 로그인 실패
  useEffect(() => {
    if (logInError) {
      alert(logInError);
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

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
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
            <Form role="form" onSubmit={onSubmitForm}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
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
                    placeholder="Password"
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
                  LOGIN
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>비밀번호 찾기</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>회원가입</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

Login.layout = Auth;

export default Login;
