import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table } from 'reactstrap';

import useInput from '../../hooks/useInput';
import { ADD_CATEGORY_REQUEST, DEL_CATEGORY_REQUEST } from '../../reducers/category';
import CategoryList from './CategoryList';

const Category = () => {
  const dispatch = useDispatch();
  const { addCategoryError, addCategoryDone, categories } = useSelector((state) => state.category);
  const [color, onChangeColor, setColor] = useInput('');
  const [name, onChangeName, setName] = useInput('');
  const [checkItems, setCheckItems] = useState([]);

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

  // 체크박스 단일 개체 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      categories.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  // 카테고리 삭제
  const deleteCategory = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: DEL_CATEGORY_REQUEST,
        data: { checkItems }
      });
      console.log(checkItems);
    },
    [checkItems]
  );

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
                <input
                  className="custom-control-input"
                  type="checkbox"
                  id="customCheckRegister"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={checkItems.length === categories.length}
                />
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
              <CategoryList
                key={category.id}
                category={category}
                index={categories.length - 1 - i}
                checkItems={checkItems}
                handleSingleCheck={handleSingleCheck}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <button type="button" className="btn btn-danger btn-sm mb-2" onClick={deleteCategory}>
        삭제
      </button>
    </>
  );
};

export default Category;
