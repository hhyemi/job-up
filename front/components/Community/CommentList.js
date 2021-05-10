import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Media,
  ButtonGroup,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  InputGroup,
  Input
} from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import { backUrl } from '../../config/config';
import { DEL_COMMENT_REQUEST, UPT_COMMENT_REQUEST } from '../../reducers/comment';

const CommentList = ({ comment, setAlertType, setAlertShow, setAlertTitle }) => {
  const dispatch = useDispatch();
  const { id, content, createdAt, User } = comment;
  const { me } = useSelector((state) => state.user);
  const { uptCommentDone } = useSelector((state) => state.comment);

  const [delAlertShow, setDelAlertShow] = useState(false);
  const [uptFormOpen, setUptFormOpen] = useState(false); // 수정창 여부
  const [uptContent, onUptContent] = useInput(content); // 수정내용

  // 댓글 수정창 열기
  const onUptCommentCheck = useCallback((e) => {
    e.preventDefault();
    setUptFormOpen(true);
  }, []);

  // 댓글 수정
  const uptComment = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: UPT_COMMENT_REQUEST,
        data: { id, content: uptContent }
      });
    },
    [id, uptContent]
  );

  // 댓글 수정 취소
  const onUptCancel = useCallback((e) => {
    e.preventDefault();
    setUptFormOpen(false);
  }, []);

  // 댓글 수정 성공
  useEffect(() => {
    if (uptCommentDone) {
      setUptFormOpen(false);
      setAlertShow(true);
      setAlertType('success');
      setAlertTitle('댓글이 수정되었습니다.');
    }
  }, [uptCommentDone]);

  // 댓글 삭제
  const onDelCommentCheck = useCallback((e) => {
    e.preventDefault();
    setDelAlertShow(true);
  }, []);
  const delComment = useCallback(() => {
    dispatch({
      type: DEL_COMMENT_REQUEST,
      data: id
    });
  }, [id]);

  return (
    <>
      <Row className="comment-list-row">
        <Media className="align-items-center pl-3 mt-2">
          <span className="avatar avatar-sm rounded-circle">
            <img alt="..." src={`${backUrl}/${User.src}`} />
          </span>
          <Media className="ml-2 d-none d-lg-block">
            <span className="mb-0 text-md font-weight-bold">{User.name}</span>
            <span className="mb-0 ml- text-sm text-muted ml-2">{createdAt}</span>
            <div className="mb-0 text-md text-darker mt-1">
              {uptFormOpen ? (
                <>
                  <InputGroup className="upt-comment-input">
                    <Input type="textarea" value={uptContent} onChange={onUptContent} />
                  </InputGroup>
                  <button className="btn btn-sm btn-default mt-2 f-r" type="button" onClick={uptComment}>
                    수정
                  </button>
                  <button className="btn btn-sm btn-secondary m-2 f-r" type="button" onClick={onUptCancel}>
                    최소
                  </button>
                </>
              ) : (
                content
              )}
            </div>
          </Media>
        </Media>
        {me.id === User.id && (
          <UncontrolledDropdown>
            <ButtonGroup>
              <DropdownToggle caret type="button">
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#pablo" onClick={onUptCommentCheck}>
                  수정
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={onDelCommentCheck}>
                  삭제
                </DropdownItem>
              </DropdownMenu>
            </ButtonGroup>
          </UncontrolledDropdown>
        )}
      </Row>
      <SweetAlert
        warning
        showCancel
        show={delAlertShow}
        cancelBtnText="취소"
        confirmBtnText="삭제"
        confirmBtnBsStyle="danger"
        title="삭제하시겠습니까?"
        onConfirm={() => delComment()}
        onCancel={() => setDelAlertShow(false)}
        focusCancelBtn
      />
      <hr />
    </>
  );
};

CommentList.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    CommtyId: PropTypes.number,
    User: PropTypes.object
  }).isRequired,
  setAlertShow: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setAlertTitle: PropTypes.func.isRequired
};

export default CommentList;
