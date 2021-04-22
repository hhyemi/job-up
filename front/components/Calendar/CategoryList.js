import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const CategoryList = ({ category, index, handleSingleCheck, checkItems }) => {
  return (
    <>
      <tr className="cat-tr">
        <th>
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
        </th>
        <td>{index + 1}</td>
        <td>{category.name}</td>
        <td>
          <input type="color" value={category.bgColor} disabled />
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
