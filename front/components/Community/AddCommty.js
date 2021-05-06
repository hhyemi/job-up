import React, { useCallback, useState } from 'react';
import { Button, Card, CardHeader, Row, Col, Input, FormGroup, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import QuillWrapper from '../Memo/QuillWrapper';
import useInput from '../../hooks/useInput';
import { ADD_COMMTY_REQUEST } from '../../reducers/commty';

const AddCommty = ({ setAddPostOpen }) => {
  const dispatch = useDispatch();
  const [commtyTitle, onCommtyTitle] = useInput(''); // 제목
  const [commtyContent, setCommtyContent] = useState(''); // 내용

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
    setAddPostOpen(false);
  });

  // 글쓰기 클릭
  const onAddPost = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_COMMTY_REQUEST,
        data: {
          title: commtyTitle,
          content: commtyContent
        }
      });
      setAddPostOpen(false);
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
                  <h3 className="mb-0">글쓰기</h3>
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
              <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Button color="default" className="btn-md" type="submit" onClick={onCancle}>
                  취소
                </Button>
                <Button color="primary" className="btn-md" type="submit" onClick={onAddPost}>
                  글쓰기
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

AddCommty.propTypes = {
  setAddPostOpen: PropTypes.func.isRequired
};

export default AddCommty;
