import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Table,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_COMMTIES_REQUEST, LOAD_HASHTAG_COMMTY_REQUEST } from '../../reducers/commty';
import CommtyOne from './CommtyOne';
import useInput from '../../hooks/useInput';

const CommtyList = ({ tag, setAddPostOpen, setAlertShow, setAlertType, setAlertTitle }) => {
  const dispatch = useDispatch();
  const { commties, commtyCnt, loadCommtiesDone, loadCommtiesError } = useSelector((state) => state.commty);
  const [pages, setPages] = useState([]); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const [searchWord, onSearchWord] = useInput(''); // 검색어

  // 커뮤니티 가져오기
  useEffect(() => {
    if (tag) {
      dispatch({
        type: LOAD_HASHTAG_COMMTY_REQUEST,
        data: {
          offset: 0,
          tag: encodeURIComponent(tag)
        }
      });
    } else {
      dispatch({
        type: LOAD_COMMTIES_REQUEST,
        data: {
          offset: 0
        }
      });
    }
  }, []);

  // 커뮤니티 가져오기 실패
  useEffect(() => {
    if (loadCommtiesError) {
      setAlertShow(true);
      setAlertType('danger');
      setAlertTitle(loadCommtiesError);
    }
  }, [loadCommtiesError]);

  // 커뮤니티 가져오기 성공
  useEffect(() => {
    if (loadCommtiesDone) {
      const tmpCnt = Math.ceil(commtyCnt / 20);
      const commtyPages = Array.from({ length: tmpCnt }, (v, i) => i + 1);
      setPages(commtyPages);
    }
  }, [loadCommtiesDone]);

  // 글쓰기 클릭
  const onAddPostOpen = useCallback((e) => {
    e.preventDefault();
    setAddPostOpen(true);
  });

  // 페이지 이동
  const movePage = useCallback(
    (e) => {
      e.preventDefault();
      const pageno = e.target.getAttribute('data-pageno');
      setCurrentPage(pageno);
      if (tag) {
        dispatch({
          type: LOAD_HASHTAG_COMMTY_REQUEST,
          data: {
            offset: (pageno - 1) * 20,
            tag: encodeURIComponent(tag)
          }
        });
      } else {
        dispatch({
          type: LOAD_COMMTIES_REQUEST,
          data: {
            offset: (pageno - 1) * 20,
            searchWord
          }
        });
      }
    },
    [currentPage, searchWord]
  );

  // 검색하기
  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOAD_COMMTIES_REQUEST,
        data: {
          offset: 0,
          searchWord
        }
      });
    },
    [searchWord]
  );

  // 검색하기 (엔터)
  const onSearchKey = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        dispatch({
          type: LOAD_COMMTIES_REQUEST,
          data: {
            offset: 0,
            searchWord
          }
        });
      }
    },
    [searchWord]
  );

  return (
    <>
      <Row>
        <Col className="mb-5 mb-xl-0">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col" style={{ maxWidth: '65%' }}>
                  <h3 className="mb-0">커뮤니티</h3>
                </div>
                <div style={{ width: '33%' }}>
                  <InputGroup>
                    <Input
                      placeholder="검색어를 입력해주세요"
                      type="text"
                      value={searchWord}
                      onChange={onSearchWord}
                      onKeyPress={onSearchKey}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" id="button-addon2" type="button" onClick={onSearch}>
                        <i className="fas fa-search" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <colgroup>
                <col width="10%" />
                <col />
                <col width="10%" />
                <col width="15%" />
                <col width="8%" />
                <col width="8%" />
              </colgroup>
              <thead className="thead-light">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope="col">작성일</th>
                  <th scope="col">조회</th>
                  <th scope="col">좋아요</th>
                </tr>
              </thead>
              <tbody>
                {commties.map((commty, index) => (
                  <CommtyOne key={commty.id} commty={commty} num={commtyCnt - 20 * (currentPage - 1) - index} />
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col>
          <nav aria-label="...">
            <Pagination>
              <PaginationItem className=" disabled">
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className=" fa fa-angle-left" />
                  <span className=" sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              {pages.map((page) =>
                page == currentPage ? (
                  <PaginationItem className="active" key={page}>
                    <PaginationLink data-pageno={page} href="#pablo" onClick={movePage}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink data-pageno={page} href="#pablo" onClick={movePage}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className=" fa fa-angle-right" />
                  <span className=" sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
          <Button color="primary" className="btn-md" type="submit" style={{ float: 'right' }} onClick={onAddPostOpen}>
            글쓰기
          </Button>
        </Col>
      </Row>
    </>
  );
};

CommtyList.propTypes = {
  setAddPostOpen: PropTypes.func.isRequired,
  setAlertShow: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setAlertTitle: PropTypes.func.isRequired
};

export default CommtyList;
