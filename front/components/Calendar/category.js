/* eslint-disable arrow-body-style */
import React from 'react';
import { Input, Table } from 'reactstrap';

const Category = () => {
  return (
    <>
      <Input type="color" className="inputColorCss" />
      <Input placeholder="카테고리명을 입력해주세요." type="text" className="inputNameCss" required />
      <button type="button" className="btn btn-primary btn-sm mb-2" style={{ float: 'right' }}>
        추가
      </button>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="customCheckRegister" />
                <label className="custom-control-label" htmlFor="customCheckRegister" />
              </div>
            </th>
            <th scope="col">No</th>
            <th scope="col">카테고리명</th>
            <th scope="col">색상</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="customCheckRegister" />
                <label className="custom-control-label" htmlFor="customCheckRegister" />
              </div>
            </th>
            <td>4,569</td>
            <td>4,569</td>
            <td>340</td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="customCheckRegister" />
                <label className="custom-control-label" htmlFor="customCheckRegister" />
              </div>
            </th>
            <td>3,985</td>
            <td>319</td>
            <td>4,569</td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="customCheckRegister" />
                <label className="custom-control-label" htmlFor="customCheckRegister" />
              </div>
            </th>
            <td>3,513</td>
            <td>294</td>
            <td>4,569</td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="customCheckRegister" />
                <label className="custom-control-label" htmlFor="customCheckRegister" />
              </div>
            </th>
            <td>2,050</td>
            <td>4,569</td>
            <td>147</td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="customCheckRegister" />
                <label className="custom-control-label" htmlFor="customCheckRegister" />
              </div>
            </th>
            <td>1,795</td>
            <td>190</td>
            <td>4,569</td>
          </tr>
        </tbody>
      </Table>
      <button type="button" className="btn btn-danger btn-sm mb-2">
        삭제
      </button>
    </>
  );
};

export default Category;
