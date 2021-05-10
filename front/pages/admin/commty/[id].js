// commty/[id].js
import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Button,
  Card,
  CardHeader,
  Row,
  Col,
  Input,
  FormGroup,
  CardBody,
  Media,
  InputGroup
} from 'reactstrap';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';

import wrapper from '../../../store/configureStore';
import Header from '../../../components/Headers/Header';
import { LOAD_MY_INFO_REQUEST } from '../../../reducers/user';
import { LOAD_COMMTY_REQUEST } from '../../../reducers/commty';
import Admin from '../../../layouts/Admin';
import { backUrl } from '../../../config/config';
import useInput from '../../../hooks/useInput';
import { ADD_COMMENT_REQUEST, LOAD_COMMENT_REQUEST } from '../../../reducers/comment';
import CommentList from '../../../components/Community/CommentList';

const SingleCommty = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { singleCommty } = useSelector((state) => state.commty);
  const { comments, addCommentDone, addCommentError } = useSelector((state) => state.comment);
  const [commtyContent, setCommtyContent] = useState(singleCommty.content); // 내용
  const [commentContent, onCommentContent, setCommentText] = useInput(''); // 댓글 내용

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  // 댓글 추가
  const addComment = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentContent, commtyId: singleCommty.id }
    });
  });

  // 댓글 추가 성공
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('댓글이 등록되었습니다.');
    }
  }, [addCommentDone]);

  // 댓글 추가 실패
  useEffect(() => {
    if (addCommentError) {
      setCommentText('');
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle('댓글이 등록이 실패되었습니다.');
    }
  }, [addCommentError]);

  return (
    <>
      <Header />
      <Container className="mt--9 info-commty-container" fluid>
        <Row className="add-commty-row">
          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center pb-2">
                  <div className="col" style={{ maxWidth: '65%' }}>
                    <span className="mb-0 text-xl font-weight-normal text-darker">{singleCommty.title}</span>
                  </div>
                </Row>
                <Row>
                  <Media className="align-items-center pl-3 mt-2">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={`${backUrl}/${singleCommty.User.src}`} />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">{singleCommty.User.name}</span>
                      <div className="mb-0 text-sm text-muted">
                        {singleCommty.createdAt}
                        &ensp;조회 {singleCommty.views}
                      </div>
                    </Media>
                  </Media>
                </Row>
                <hr className="mt-4" />
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <div dangerouslySetInnerHTML={{ __html: commtyContent }} />
                </FormGroup>
                <span className="text-md comment-click">
                  댓글 <span className="text-danger font-weight-bold">{comments.length}</span>
                </span>
                <span className="text-md ml-2 comment-click">
                  좋아요 <span className="text-danger font-weight-bold">{singleCommty.Likers.length}</span>
                </span>
                <FormGroup className="comment-list mt-4">
                  <hr />
                  {comments.map((comment) => (
                    <CommentList
                      key={comment.id}
                      comment={comment}
                      setAlertType={setAlertType}
                      setAlertShow={setAlertShow}
                      setAlertTitle={setAlertTitle}
                    />
                  ))}
                  <InputGroup>
                    <Input
                      style={{ height: '8rem' }}
                      type="textarea"
                      value={commentContent}
                      onChange={onCommentContent}
                      placeholder="댓글 내용을 입력해주세요."
                    />
                  </InputGroup>
                  <Button
                    color="primary"
                    type="button"
                    className="mt-3"
                    style={{ float: 'right' }}
                    onClick={addComment}
                  >
                    등록
                  </Button>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

SingleCommty.layout = Admin;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : ''; // 쿠키까지 전달
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({
    type: LOAD_COMMTY_REQUEST,
    data: context.params.id // router.query에 접근
  });
  context.store.dispatch({
    type: LOAD_COMMENT_REQUEST,
    data: { commtyId: context.params.id }
  });

  context.store.dispatch(END); // 데이터를 success될때까지 기다려줌
  await context.store.sagaTask.toPromise();
});

export default SingleCommty;
