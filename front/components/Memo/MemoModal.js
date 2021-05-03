import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Label,
  Button
} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import useInput from '../../hooks/useInput';
import { ADD_TODO_REQUEST, DEL_TODO_REQUEST, UPT_TODO_REQUEST } from '../../reducers/todo';

// eslint-disable-next-line react/prop-types
const MemoModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <CardBody className="px-lg-1 py-lg-1">
        <Form role="form" className="todo-add-form">
          <FormGroup className="mb-3">
            <Label>제목</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="제목을 입력해주세요."
                name="user-title"
                type="text"
                required
                autoComplete="new-title"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>내용</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-align-left-2" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="일정내용을 입력해주세요."
                name="user-content"
                type="textarea"
                autoComplete="new-email"
                style={{ minHeight: '380px' }}
              />
            </InputGroup>
          </FormGroup>
          <div className="text-center">
            <Button color="primary" type="button">
              추가
            </Button>
          </div>
        </Form>
      </CardBody>
    </>
  );
};

MemoModal.defaultProps = {};

export default MemoModal;
