import React from 'react';
import PropTypes from 'prop-types';

const TimeList = ({ time, num, handleSingleCheck, checkItems }) => {
  const getSeconds = `0${time.time % 60}`.slice(-2);
  const minutes = `${Math.floor(time.time / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time.time / 3600)}`.slice(-2);

  return (
    <>
      <tr>
        <th>
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input
              className="custom-control-input"
              type="checkbox"
              id={time.id}
              onChange={(e) => handleSingleCheck(e.target.checked, time.id)}
              checked={checkItems.includes(time.id)}
            />
            <label className="custom-control-label" htmlFor={time.id} />
          </div>
        </th>
        <td>{num}</td>
        <td>
          <i className="far fa-clock mr-2" />
          {`${getHours}:${getMinutes}:${getSeconds}`}
        </td>
        <td>{time.createdAt.substring(0, 10)}</td>
        <td>{time.createdAt.substring(11, 16)}</td>
      </tr>
    </>
  );
};

TimeList.propTypes = {
  time: PropTypes.shape({
    id: PropTypes.number,
    time: PropTypes.number,
    createdAt: PropTypes.string
  }).isRequired,
  num: PropTypes.number.isRequired,
  handleSingleCheck: PropTypes.func.isRequired,
  checkItems: PropTypes.array.isRequired
};

export default TimeList;
