import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Form, CardBody, FormGroup, InputGroupAddon, InputGroupText, InputGroup, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import 'react-quill/dist/quill.snow.css';

import useInput from '../../hooks/useInput';
import { ADD_MEMO_REQUEST } from '../../reducers/memo';

// editor 설정
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

const MemoModal = ({ memo }) => {
  const dispatch = useDispatch();
  const [memoTitle, onChangeMemoTitle] = useInput(memo.title); // 제목
  const [memoContent, setMemoContent] = useState(memo.content); // 내용

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
      dispatch({
        type: ADD_MEMO_REQUEST,
        data: { title: memoTitle, content: memoContent, bookmark: false }
      });
    },
    [memoTitle, memoContent]
  );

  return (
    <>
      <CardBody className="px-lg-1 py-lg-1">
        <Form role="form" className="memo-add-form">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="far fa-sticky-note" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="제목을 입력해주세요."
                name="user-title"
                type="text"
                value={memoTitle}
                onChange={onChangeMemoTitle}
                required
                autoComplete="new-title"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              theme="snow"
              value={memoContent}
              onChange={(content, delta, source, editor) => onChangeContent(editor.getContents())}
            />
          </FormGroup>
          <div className="text-center" style={{ paddingTop: '2rem' }}>
            <Button color="primary" type="button" onClick={onAddMemo}>
              추가
            </Button>
          </div>
        </Form>
      </CardBody>
    </>
  );
};

MemoModal.propTypes = {
  memo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.any,
    bookmard: PropTypes.bool,
    createdAt: PropTypes.string
  })
};

MemoModal.defaultProps = {
  memo: PropTypes.shape({
    id: '',
    title: '',
    content: '',
    bookmard: '',
    createdAt: ''
  })
};

export default MemoModal;
