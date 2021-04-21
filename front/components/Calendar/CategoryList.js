import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const CategoryList = ({ category, index }) => {
  return (
    <>
      <tr className="cat-tr">
        <th>
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input className="custom-control-input" type="checkbox" id={category.id} />
            <label className="custom-control-label" htmlFor={category.id} />
          </div>
        </th>
        <td>{index + 1}</td>
        <td>{category.name}</td>
        <td>
          <input type="color" value={category.color} disabled />
        </td>
      </tr>
    </>
  );
};

CategoryList.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default CategoryList;
