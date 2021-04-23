import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import SweetAlert from 'react-bootstrap-sweetalert';

import { backUrl } from '../../config/config';
import Admin from '../../layouts/Admin';
import UserHeader from '../../components/Headers/UserHeader';
import useInput from '../../hooks/useInput';
import { UPDATE_MY_INFO_REQUEST, UPLOAD_IMG_REQUEST } from '../../reducers/user';

const ErrorMessage = styled.div`
  color: red;
  font-size: 80%;
`;

const UploadImg = styled.img`
  width: 50px;
  top: 95px !important;
  left: 225px !important;
  cursor: pointer;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { me, imagePaths } = useSelector((state) => state.user);
  const [name, setName] = useState(me?.name || '');
  const [email, onChangeEmail] = useInput(me?.email || '');
  const [password, setPassword] = useState(me?.password || '');

  const [nameError, setNameError] = useState('');
  const [passwordNotError, setPasswordNotError] = useState('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { updateMyInfoError, updateMyInfoDone } = useSelector((state) => state.user);

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('');

  // 로그인 풀리면
  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);

  // 프로필 사진 변경
  const onClickProfileImg = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  // 프로필 사진 업로드
  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMG_REQUEST,
      data: imageFormData
    });
  });

  // 비밀번호 , 비밀번호 확인 체크
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  // 이름입력창
  const onChangeName = useCallback(
    (e) => {
      e.preventDefault();
      setNameError(false);
      setName(e.target.value);
    },
    [name]
  );
  // 비밀번호입력창
  const onChangePassword = useCallback(
    (e) => {
      e.preventDefault();
      setPasswordNotError(false);
      setPassword(e.target.value);
    },
    [password]
  );

  // 수정 버튼
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!name) {
        return setNameError(true);
      }
      if (!password) {
        return setPasswordNotError(true);
      }

      dispatch({
        type: UPDATE_MY_INFO_REQUEST,
        data: {
          name,
          password,
          src: imagePaths[0]
        }
      });
    },
    [name, password, passwordCheck, imagePaths]
  );

  // 수정 성공
  useEffect(() => {
    if (updateMyInfoDone) {
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('내정보가 수정되었습니다.');
    }
  }, [updateMyInfoDone]);

  // 수정 실패
  useEffect(() => {
    if (updateMyInfoError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(updateMyInfoError);
    }
  }, [updateMyInfoError]);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image" style={{ position: 'relative' }}>
                      <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                      <img
                        src={imagePaths ? `${backUrl}/${imagePaths}` : me && me.src && `${backUrl}/${me.src}`}
                        className="rounded-circle"
                        alt="..."
                      />
                      <UploadImg
                        alt="..."
                        src={require('assets/img/icons/user/plus.png')}
                        onClick={onClickProfileImg}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs="8" />
                  <Col className="text-right" xs="4">
                    <Button color="primary" href="#pablo" onClick={onSubmit} size="sm">
                      수정
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4 mt-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            이름
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={name}
                            onChange={onChangeName}
                            id="input-username"
                            placeholder="이름"
                            type="text"
                          />
                          {nameError && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            이메일
                          </label>
                          <Input
                            disabled
                            className="form-control-alternative"
                            id="input-email"
                            value={email}
                            placeholder="이메일"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            비밀번호
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={password}
                            onChange={onChangePassword}
                            placeholder="비밀번호"
                            id="input-first-name"
                            type="password"
                          />
                          {passwordNotError && <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            비밀번호확인
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={passwordCheck}
                            onChange={onChangePasswordCheck}
                            id="input-last-name"
                            placeholder="비밀번호 확인을 입력해주세요."
                            type="password"
                          />
                          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

Profile.layout = Admin;

export default Profile;
