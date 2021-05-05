import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../../store/configureStore';
import Header from '../../components/Headers/Header';
import Admin from '../../layouts/Admin';

// eslint-disable-next-line arrow-body-style
const Community = () => {
  return (
    <>
      <Header />
      <Container className="mt--9 community-container" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">커뮤니티</h3>
                  </div>
                  <div className="col text-right" style={{ position: 'absolute' }}>
                    <InputGroup className="input-group-alternative" style={{ float: 'right', width: '25%' }}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="검색어를 입력하세요." type="text" />
                      <button type="button" className="btn btn-primary btn-sm mt-1" style={{ height: '30px' }}>
                        글쓰기
                      </button>
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
                    <i className=" fa fa-angle-left"></i>
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
                    <i className=" fa fa-angle-right"></i>
                    <span className=" sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Community.layout = Admin;

export default Community;
