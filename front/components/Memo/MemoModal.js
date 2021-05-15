import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import { Form, CardBody, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import { ADD_MEMO_REQUEST, DEL_MEMO_REQUEST, UPT_MEMO_REQUEST } from '../../reducers/memo';
import QuillWrapper from './QuillWrapper';

const MemoModal = ({ memo, content, setAlertShow, setAlertTitle, setAlertType }) => {
  const { id, title, bookmard, secret, color, createdAt } = memo;
  const dispatch = useDispatch();
  const [memoTitle, onMemoTitle] = useInput(title); // 제목
  const [memoContent, setMemoContent] = useState(content); // 내용
  const [memoPassword, setPassword] = useState(secret); // 비밀번호
  const [secretChek, setSecretChek] = useState(secret); // 비밀글 체크박스
  const [disPassword, setDisPassword] = useState(!secret); // 비밀글 input
  const [memoColor, setMemoColor] = useState({
    displayColorPicker: false,
    color: color || '#c4def6'
  }); // 메모 색상

  const [delAlertShow, setDelAlertShow] = useState(false);

  // 메모 이벤트 (클릭,닫기,변환)
  const handleClick = () => {
    setMemoColor({ displayColorPicker: !memoColor.displayColorPicker });
  };
  const handleClose = () => {
    setMemoColor({ displayColorPicker: false });
  };
  const handleChange = (color) => {
    setMemoColor({ color: color.hex });
  };

  // 색상 선택
  const onColor = useCallback(
    (e) => {
      setColor(e.target.value);
      document.getElementById('categorySelect').style.backgroundColor = { color };
    },
    [color]
  );

  // 비밀글 체크
  const onSecretChek = useCallback(
    (e) => {
      setSecretChek(e.target.checked);
      setDisPassword(!e.target.checked);
      if (!e.target.checked) {
        setPassword('');
      }
    },
    [secretChek]
  );

  // 비밀번호
  const onMemoPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [memoPassword]
  );

  // 메모 내용 바뀔때마다 SET해주기
  const onChangeContent = useCallback(
    (text) => {
      setMemoContent(text);
    },
    [memoContent]
  );

  // 메모 추가
  const onAddMemo = useCallback(
    (e) => {
      e.preventDefault();
      if (!memoTitle || memoContent === '') {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('모든 칸을 입력해주세요.');
        return;
      }
      dispatch({
        type: ADD_MEMO_REQUEST,
        data: {
          title: memoTitle,
          content: memoContent,
          color: memoColor.color,
          secret: secretChek ? memoPassword : null,
          bookmark: false
        }
      });
    },
    [memoTitle, memoContent, memoColor.color, memoPassword]
  );

  // 일정 삭제
  const onDelMemoCheck = useCallback((e) => {
    e.preventDefault();
    setDelAlertShow(true);
  }, []);
  const onDelMemo = useCallback(() => {
    dispatch({
      type: DEL_MEMO_REQUEST,
      data: id
    });
  }, [id]);

  // 일정 수정
  const onUptMemo = useCallback(
    (e) => {
      e.preventDefault();
      if (!memoTitle || memoContent === '') {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('모든 칸을 입력해주세요.');
        return;
      }
      dispatch({
        type: UPT_MEMO_REQUEST,
        data: {
          id,
          title: memoTitle,
          content: memoContent,
          color: memoColor.color,
          secret: secretChek ? memoPassword : ''
        }
      });
    },
    [id, memoTitle, memoContent, memoColor.color, memoPassword]
  );

  return (
    <>
      <CardBody className="px-lg-1 py-lg-1">
        <Form role="form" className="memo-add-form">
          <FormGroup className="mb-3 color-form">
            <div className="memo-color">
              <div className="memo-back" onClick={handleClick}>
                <div
                  style={{
                    width: '100%',
                    height: '30px',
                    borderRadius: '2px',
                    background: `${memoColor.color}`
                  }}
                />
              </div>
              {memoColor.displayColorPicker ? (
                <div style={{ position: 'absolute', zIndex: '2' }}>
                  <div className="memo-handle" onClick={handleClose} />
                  <GithubPicker color={memoColor.color} onChange={handleChange} />
                </div>
              ) : null}
            </div>
            <Input
              style={{ width: '94%', position: 'relative' }}
              className="meme-title-input"
              placeholder="제목을 입력해주세요."
              name="memo-title"
              type="text"
              value={memoTitle}
              onChange={onMemoTitle}
              required
              autoComplete="new-title"
            />
          </FormGroup>
          <FormGroup>
            <QuillWrapper theme="snow" value={memoContent} onChange={(text) => onChangeContent(text)} />
          </FormGroup>
        </Form>
      </CardBody>
      <div>
        <span>
          <input
            className="custom-control-input"
            id="checkSecret"
            type="checkbox"
            checked={secretChek}
            onChange={onSecretChek}
          />
          <label className="custom-control-label cursor pl-5 pr-3 pt-1" htmlFor="checkSecret" style={{ float: 'left' }}>
            <span>비밀글</span>
          </label>
          <Input
            disabled={disPassword}
            placeholder="비밀번호"
            name="memo-password"
            type="password"
            value={memoPassword}
            onChange={onMemoPassword}
            style={{ width: '20%', height: '2rem' }}
          />
        </span>
      </div>
      <div className="text-center mt-2">
        {id === undefined ? (
          <button color="primary" type="button" onClick={onAddMemo} className="btn btn-primary btn-md">
            추가
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-primary btn-md" onClick={onUptMemo}>
              수정
            </button>
            <button type="button" className="btn btn-default btn-md" onClick={onDelMemoCheck}>
              삭제
            </button>
          </>
        )}
      </div>
      <SweetAlert
        warning
        showCancel
        show={delAlertShow}
        cancelBtnText="취소"
        confirmBtnText="삭제"
        confirmBtnBsStyle="danger"
        title="삭제하시겠습니까?"
        onConfirm={() => onDelMemo()}
        onCancel={() => setDelAlertShow(false)}
        focusCancelBtn
      />
    </>
  );
};

MemoModal.propTypes = {
  memo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    bookmard: PropTypes.bool,
    secret: PropTypes.string,
    color: PropTypes.string,
    createdAt: PropTypes.string
  }),
  content: PropTypes.string
};

MemoModal.defaultProps = {
  memo: PropTypes.shape({
    id: '',
    title: '',
    bookmard: '',
    secret: '',
    color: '#c4def6',
    createdAt: ''
  }),
  content: ''
};

export default MemoModal;
