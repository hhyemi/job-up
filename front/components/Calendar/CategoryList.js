import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';

import useInput from '../../hooks/useInput';
import { UPTL_CATEGORY_REQUEST } from '../../reducers/category';

const CategoryList = ({ category, index, handleSingleCheck, checkItems }) => {
  const dispatch = useDispatch();
  const { uptCategoryDone } = useSelector((state) => state.category);

  const [uptState, setUptState] = useState(false); // 수정 상태
  const [name, onChangeName] = useInput(category.name); // 카테고리명
  const [color, onChangeColor] = useInput(category.bgColor); // 카테고리 색상

  // 카테고리 수정 창
  const onUptCatShow = useCallback(
    (e) => {
      e.preventDefault();
      setUptState(true);
    },
    [uptState]
  );

  // 카테고리 수정
  const onUptCat = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: UPTL_CATEGORY_REQUEST,
        data: { color, name, id: category.id }
      });
    },
    [color, name, category.id]
  );

  // 수정 완료
  useEffect(() => {
    if (uptCategoryDone) {
      setUptState(false);
    }
  }, [uptCategoryDone]);

  // 카테고리 수정 취소
  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      setUptState(false);
    },
    [uptState]
  );

  return (
    <>
      <tr className="cat-tr">
        <td>
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
              className="custom-control-input"
              type="checkbox"
              id={category.id}
              onChange={(e) => handleSingleCheck(e.target.checked, category.id)}
              checked={checkItems.includes(category.id)}
            />
            <label className="custom-control-label" htmlFor={category.id} />
          </div>
        </td>
        <td>{index + 1}</td>
        <td>{uptState ? <Input type="text" value={name} onChange={onChangeName} /> : <>{category.name}</>}</td>
        <td>
          <input type="color" value={color} onChange={onChangeColor} disabled={!uptState} />
        </td>
        <td>
          {uptState ? (
            <>
              <button type="button" className="btn btn-white btn-sm " onClick={onUptCat}>
                수정
              </button>
              <button
                type="button"
                className="btn btn-white btn-sm"
                onClick={onCancel}
                style={{ backgroundColor: ' #e9e7e7' }}
              >
                취소
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-white btn-sm " onClick={onUptCatShow}>
              수정
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

CategoryList.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    bgColor: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleSingleCheck: PropTypes.func.isRequired,
  checkItems: PropTypes.array.isRequired
};

export default CategoryList;
