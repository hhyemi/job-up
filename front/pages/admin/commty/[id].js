import React, { useCallback, useEffect, useState } from 'react';
import { Container, Card, CardHeader, Row, Col, Input, FormGroup, CardBody, Media, InputGroup } from 'reactstrap';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';

import wrapper from '../../../store/configureStore';
import Header from '../../../components/Headers/Header';
import { LOAD_MY_INFO_REQUEST } from '../../../reducers/user';
import {
  DEL_COMMTY_REQUEST,
  LIKE_COMMTY_REQUEST,
  LOAD_COMMTY_REQUEST,
  UNLIKE_COMMTY_REQUEST,
  UPT_COMMTY_REQUEST
} from '../../../reducers/commty';
import Admin from '../../../layouts/Admin';
import { backUrl } from '../../../config/config';
import useInput from '../../../hooks/useInput';
import { ADD_COMMENT_REQUEST, LOAD_COMMENT_REQUEST } from '../../../reducers/comment';
import CommentList from '../../../components/Community/CommentList';
import EditCommty from '../../../components/Community/EditCommty';

const SingleCommty = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { singleCommty, delCommtyDone, loadCommtyDone } = useSelector((state) => state.commty);
  const userId = useSelector((state) => state.user.me?.id);
  const { comments, addCommentDone, addCommentError } = useSelector((state) => state.comment);
  const [commentContent, onCommentContent, setCommentText] = useInput(''); // 댓글 내용
  const liked = singleCommty && singleCommty.Likers.find((v) => v.id === userId); // 좋아요
  const [uptCommtyOpen, setUptCommtyOpen] = useState(false); // 수정페이지

  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');
  const [delAlertShow, setDelAlertShow] = useState(false);

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_COMMTY_REQUEST,
        data: id
      });
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: { commtyId: id }
      });
    }
  }, [me]);

  // 커뮤니티 로딩 후
  useEffect(() => {
    if (loadCommtyDone) {
      dispatch({
        type: UPT_COMMTY_REQUEST,
        data: { views: 1, id }
      });
    }
  }, [loadCommtyDone]);

  // 커뮤니티 삭제
  const onDelCommtyCheck = useCallback((e) => {
    e.preventDefault();
    setDelAlertShow(true);
  }, []);
  const delCommty = useCallback(() => {
    dispatch({
      type: DEL_COMMTY_REQUEST,
      data: id
    });
    setDelAlertShow(false);
  }, [id]);

  // 커뮤니티 삭제 성공
  useEffect(() => {
    if (delCommtyDone) {
      router.push('/admin/commty');
    }
  }, [delCommtyDone]);

  // 커뮤니티 수정
  const onUptCommtyOpen = useCallback((e) => {
    e.preventDefault();
    setUptCommtyOpen(true);
  }, []);

  // 목록으로
  const onListCommty = useCallback((e) => {
    e.preventDefault();
    router.push('/admin/commty');
  });

  // 댓글 추가
  const addComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentContent) {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('댓글 내용을 입력해주세요.');
        return;
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentContent, commtyId: singleCommty && singleCommty.id }
      });
    },
    [commentContent, singleCommty]
  );

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

  // 좋아요
  const onLike = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LIKE_COMMTY_REQUEST,
      data: singleCommty && singleCommty.id
    });
  });

  // 좋아요 취소
  const onUnLike = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: UNLIKE_COMMTY_REQUEST,
      data: singleCommty && singleCommty.id
    });
  });

  return (
    <>
      <Header />
      <Container className="mt-3 info-commty-container" fluid>
        {!uptCommtyOpen ? (
          <Row className="add-commty-row">
            <Col className="mb-5 mb-xl-0">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center pb-2">
                    <div className="col" style={{ maxWidth: '65%' }}>
                      <span className="mb-0 text-xl font-weight-normal text-darker">
                        {singleCommty && singleCommty.title}
                      </span>
                    </div>
                  </Row>
                  <Row>
                    <Media className="align-items-center pl-3 mt-2">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={`${backUrl}/${singleCommty && singleCommty.User.src}`} />
                      </span>
                      <Media className="ml-2 d-lg-block">
                        <span className="mb-0 mr-2 text-sm font-weight-bold">
                          {singleCommty && singleCommty.User.name}
                        </span>
                        <div className="mb-0 text-sm text-muted">
                          {singleCommty && singleCommty.createdAt}
                          &ensp;조회 {singleCommty && singleCommty.views}
                        </div>
                      </Media>
                    </Media>
                  </Row>
                  <hr className="mt-4" />
                </CardHeader>
                <CardBody>
                  <FormGroup className="mb-5">
                    <div dangerouslySetInnerHTML={{ __html: singleCommty && singleCommty.content }} />
                  </FormGroup>
                  <span className="text-md comment-click">
                    댓글 <span className="text-dark font-weight-bold">{comments.length}</span>
                  </span>
                  <span className="text-md ml-2 comment-click">
                    {liked ? (
                      <i className="fas fa-heart text-red mr-1 cursor" onClick={onUnLike} />
                    ) : (
                      <i className="far fa-heart text-red mr-1 cursor" onClick={onLike} />
                    )}
                    좋아요{' '}
                    <span className="text-dark font-weight-bold">{singleCommty && singleCommty.Likers.length}</span>
                  </span>
                  <button type="button" className="btn btn-md btn-danger f-r" onClick={onDelCommtyCheck}>
                    삭제
                  </button>
                  <button type="button" className="btn btn-md btn-warning f-r" onClick={onUptCommtyOpen}>
                    수정
                  </button>
                  <button type="button" className="btn btn-md btn-white f-r" onClick={onListCommty}>
                    목록
                  </button>
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
                    <button type="button" className="mt-3 btn btn-md btn-primary f-r" onClick={addComment}>
                      등록
                    </button>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <EditCommty
            setEditOpen={setUptCommtyOpen}
            commty={singleCommty && singleCommty}
            setAlertShow={setAlertShow}
            setAlertTitle={setAlertTitle}
            setAlertType={setAlertType}
          />
        )}
      </Container>
      <SweetAlert
        warning
        showCancel
        show={delAlertShow}
        cancelBtnText="취소"
        confirmBtnText="삭제"
        confirmBtnBsStyle="danger"
        title="삭제하시겠습니까?"
        onConfirm={() => delCommty()}
        onCancel={() => setDelAlertShow(false)}
        focusCancelBtn
      />
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
