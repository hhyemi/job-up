import React, { useCallback, useState } from 'react';
import { Button, Card, CardHeader, Row, Col, Input, FormGroup, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import QuillWrapper from '../Memo/QuillWrapper';
import useInput from '../../hooks/useInput';
import { ADD_COMMTY_REQUEST, UPT_COMMTY_REQUEST } from '../../reducers/commty';

const EditCommty = ({ setEditOpen, commty, setAlertShow, setAlertTitle, setAlertType }) => {
  const dispatch = useDispatch();
  const [commtyTitle, onCommtyTitle] = useInput(commty ? commty.title : ''); // 제목
  const [commtyContent, setCommtyContent] = useState(commty ? commty.content : ''); // 내용

  // 내용 바뀔때마다 SET해주기
  const onChangeContent = useCallback(
    (text) => {
      setCommtyContent(text);
    },
    [commtyContent]
  );

  // 취소 클릭
  const onCancle = useCallback((e) => {
    e.preventDefault();
    setEditOpen(false);
  });

  // 글쓰기 클릭
  const onAddPost = useCallback(
    (e) => {
      e.preventDefault();
      if (!commtyTitle && commtyContent === '') {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('모든 칸을 입력해주세요.');
        return;
      }
      dispatch({
        type: ADD_COMMTY_REQUEST,
        data: {
          title: commtyTitle,
          content: commtyContent
        }
      });
      setEditOpen(false);
    },
    [commtyTitle, commtyContent]
  );

  // 글수정 클릭
  const onUptPost = useCallback(
    (e) => {
      e.preventDefault();
      if (!commtyTitle && commtyContent === '') {
        setAlertShow(true);
        setAlertType('warning');
        setAlertTitle('모든 칸을 입력해주세요.');
        return;
      }
      dispatch({
        type: UPT_COMMTY_REQUEST,
        data: {
          title: commtyTitle,
          content: commtyContent,
          id: commty.id
        }
      });
      setEditOpen(false);
    },
    [commtyTitle, commtyContent]
  );

  return (
    <>
      <Row className="add-commty-row">
        <Col className="mb-5 mb-xl-0">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col" style={{ maxWidth: '65%' }}>
                  <h3 className="mb-0">{commty ? '글수정' : '글쓰기'}</h3>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              <FormGroup className="mb-3">
                <Input
                  placeholder="제목을 입력해주세요."
                  type="text"
                  value={commtyTitle}
                  onChange={onCommtyTitle}
                  required
                />
              </FormGroup>
              <FormGroup>
                <QuillWrapper value={commtyContent} onChange={(text) => onChangeContent(text)} />
              </FormGroup>
              <div style={{ textAlign: 'center' }}>
                <Button color="default" className="btn-md" type="submit" onClick={onCancle}>
                  취소
                </Button>
                <Button color="primary" className="btn-md" type="submit" onClick={commty ? onUptPost : onAddPost}>
                  {commty ? '수정' : '등록'}
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

EditCommty.propTypes = {
  setEditOpen: PropTypes.func.isRequired,
  commty: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.any
  })
};

export default EditCommty;
