import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardImg, CardTitle, Input } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import Modal from '../Modal/Modal';
import MemoModal from './MemoModal';
import { BK_MARK_MEMO_REQUEST, UPT_MEMO_REQUEST } from '../../reducers/memo';
import useInput from '../../hooks/useInput';

const MemoCard = ({ memo }) => {
  const dispatch = useDispatch();
  const { id, title, content, bookmark, secret, color, createdAt } = memo;
  const [lockShow, setLockShow] = useState(false); // 비밀번호 입력
  const [secretPassword, onSecretPassword] = useInput(''); // 비밀번호

  const [modalOpen, setModalOpen] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('default');

  const { uptMemoDone } = useSelector((state) => state.memo);
  const imgContent = /src\=[\"\']?([^\"\'\s\>]+)/i.exec(content);

  // 메모 수정, 삭제 (모달창열기)
  const uptMemo = useCallback((e) => {
    e.preventDefault();
    if (secret) {
      return;
    }
    if (!e.target.getAttribute('data-mark')) {
      setModalOpen(true);
    }
  });

  // 모달창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  // 비밀번호 모달창 닫기
  const closeSecretModal = () => {
    setSecretModalOpen(false);
  };

  // 즐겨찾기 클릭
  const onBookmark = useCallback(
    (e) => {
      e.preventDefault();
      const mark = e.target.getAttribute('data-mark');
      dispatch({
        type: BK_MARK_MEMO_REQUEST,
        data: {
          id: id,
          bookmark: mark
        }
      });
    },
    [id, bookmark]
  );

  // 메모 수정 성공 (모달창닫기)
  useEffect(() => {
    if (uptMemoDone) {
      setModalOpen(false);
    }
  }, [uptMemoDone]);

  // 비밀번호 입력창 보기
  const onShowLock = useCallback((e) => {
    e.preventDefault();
    setLockShow(!lockShow);
  });

  // 비밀번호 입력 확인 버튼
  const onShowModal = useCallback(
    (e) => {
      e.preventDefault();
      if (secretPassword === secret) {
        setModalOpen(true);
      } else {
        setAlertShow(true);
        setAlertType('error');
        setAlertTitle('비밀번호가 틀렸습니다.');
      }
    },
    [secretPassword]
  );

  return (
    <>
      <Card onClick={uptMemo} style={{ backgroundColor: `${color}` }}>
        {bookmark ? (
          <i className="fas fa-star fa-lg" data-mark={false} style={{ color: '#ffff5d' }} onClick={onBookmark} />
        ) : (
          <i className="far fa-star fa-lg" data-mark={true} onClick={onBookmark} />
        )}
        {secret ? (
          <>
            <CardBody className="memo-body">
              <div className="memo-div-lock">
                <img className="memo-lock" src={require('assets/img/icons/common/lock.png')}></img>
                <div className="card-title">
                  <b>이 메모는 잠겨 있습니다.</b>
                  {lockShow ? (
                    <div className="mt-3">
                      <Input
                        placeholder="비밀번호"
                        className="memo-lock-input"
                        type="password"
                        value={secretPassword}
                        onChange={onSecretPassword}
                        autoComplete="new-title"
                      />
                      <button color="primary" type="button" className="btn btn-default btn-md" onClick={onShowModal}>
                        확인
                      </button>
                    </div>
                  ) : (
                    <p className="memo-lock-show">
                      <b onClick={onShowLock}>메모보기</b>
                    </p>
                  )}
                </div>
              </div>
            </CardBody>
          </>
        ) : (
          <>
            <CardBody className="memo-body">
              <CardTitle>
                <b>{title}</b>
              </CardTitle>
              <pre>
                {content.replace(/<(\/br|br)([^>]*)>/gi, '\r\n').replace(/(<([^>]+)>)/gi, '')}{' '}
                {content.indexOf('<img') != -1 ? <CardImg alt="..." src={imgContent && imgContent[1]} top /> : <div />}
              </pre>
              <div className="memo-date">
                <small className="text-muted">{createdAt.substring(0, 10)}</small>
              </div>
            </CardBody>
          </>
        )}
      </Card>
      <Modal open={modalOpen} close={closeModal} header="메모 수정">
        <MemoModal memo={memo} content={content} />
      </Modal>
      <SweetAlert type={alertType} show={alertShow} title={alertTitle} onConfirm={() => setAlertShow(false)} />
    </>
  );
};

MemoCard.propTypes = {
  memo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.any,
    bookmark: PropTypes.bool,
    secret: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
};

export default MemoCard;
