import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table } from 'reactstrap';

import useInput from '../../hooks/useInput';
import { ADD_CATEGORY_REQUEST, LOAD_CATEGORY_REQUEST } from '../../reducers/category';
import CategoryList from './CategoryList';

const Category = () => {
  const dispatch = useDispatch();
  const { loadCategoryError, addCategoryError, addCategoryDone, categories } = useSelector((state) => state.category);
  const [color, onChangeColor, setColor] = useInput('');
  const [name, onChangeName, setName] = useInput('');

  // 카테고리 가져오기
  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORY_REQUEST
    });
  }, []);

  // 카테고리 가져오기 실패
  useEffect(() => {
    if (loadCategoryError) {
      alert(loadCategoryError);
    }
  }, [loadCategoryError]);

  // 카테고리 추가
  const addCategory = useCallback(
    (e) => {
      e.preventDefault();
      if (!name || !name.trim()) {
        return alert('카테고리명을 작성하세요.');
      }
      dispatch({
        type: ADD_CATEGORY_REQUEST,
        data: { color, name }
      });
    },
    [color, name]
  );

  // 카테고리 추가 성공
  useEffect(() => {
    if (addCategoryDone) {
      setName('');
      setColor('#000000');
    }
  }, [addCategoryDone]);

  // 카테고리 추가 실패
  useEffect(() => {
    if (addCategoryError) {
      alert(addCategoryError);
    }
  }, [addCategoryError]);

  return (
    <>
      <Input type="color" className="inputColorCss" value={color} onChange={onChangeColor} />
      <Input
        placeholder="카테고리명을 입력해주세요."
        type="text"
        className="inputNameCss"
        value={name}
        onChange={onChangeName}
        required
      />
      <button type="button" className="btn btn-primary btn-sm mb-2" style={{ float: 'right' }} onClick={addCategory}>
        추가
      </button>
      <Table className="align-items-center table-flush" responsive>
        <colgroup>
          <col width="5%" />
          <col width="20%" />
          <col width="35%" />
          <col />
        </colgroup>
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
      </Table>
      <div className="scroll">
        <Table>
          <colgroup>
            <col width="5%" />
            <col width="20%" />
            <col width="35%" />
            <col />
          </colgroup>
          <tbody className="cat-tbody">
            {categories.map((category, i) => (
              <CategoryList key={category.id} category={category} index={categories.length - 1 - i} />
            ))}
          </tbody>
        </Table>
      </div>
      <button type="button" className="btn btn-danger btn-sm mb-2">
        삭제
      </button>
    </>
  );
};

export default Category;
