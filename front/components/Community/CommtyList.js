import React, { useCallback } from 'react';
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

const CommtyList = ({ setAddPostOpen }) => {
  // 글쓰기 클릭
  const onAddPostOpen = useCallback((e) => {
    e.preventDefault();
    setAddPostOpen(true);
  });

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
                    <Input placeholder="검색어를 입력해주세요" type="text" />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" id="button-addon2" type="button">
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
                <col width="50%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col />
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
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    <font className="text-blue pl-1">#리액트 #코딩 #신입</font>
                    프리하다가 정직원을 할때에 대해 토론해보고자 합니다.
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    싸피(SSAFY) 6기에 지원하려는 비전공자인데 궁금한 점이 있습니다..
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td className="comm-title">
                    고민이많아요,,,,,,,,,이거잘모르겠어요{' '}
                    <font className="text-red pl-1">
                      <b>[2]</b>
                    </font>
                  </td>
                  <td>이혜미</td>
                  <td>2021-05-05</td>
                  <td>123</td>
                  <td>
                    <i className="ni ni-favourite-28 text-red mr-1" />3
                  </td>
                </tr>
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
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabindex="-1">
                  <i className=" fa fa-angle-left" />
                  <span className=" sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className=" active">
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  2 <span className=" sr-only">(current)</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  3
                </PaginationLink>
              </PaginationItem>
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
  setAddPostOpen: PropTypes.func.isRequired
};

export default CommtyList;
