import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_COMMTY_REQUEST } from '../../reducers/commty';

const CommtyOne = ({ commty, num }) => {
  const { id, title, createdAt, views, User, Comments, Likers } = commty;
  const dispatch = useDispatch();
  const { commties, commtyCnt, loadCommtyDone, loadCommtyError } = useSelector((state) => state.commty);

  return (
    <>
      <tr>
        <td>{num}</td>
        <td className="comm-title">
          {title.split(/(#[^\s#]+)/g).map((v, i) => {
            if (v.match(/(#[^\s#]+)/)) {
              return (
                <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                  <a>{v}</a>
                </Link>
              );
            }
            return v;
          })}
          {Comments.length > 0 && (
            <font className="text-red pl-1">
              <b>[{Comments.length}]</b>
            </font>
          )}
        </td>
        <td>{User.name}</td>
        <td>{createdAt.substring(0, 10)}</td>
        <td>{views}</td>
        <td>
          <i className="ni ni-favourite-28 text-red mr-1" />
          {Likers.length}
        </td>
      </tr>
    </>
  );
};

CommtyOne.propTypes = {
  commty: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.any,
    views: PropTypes.number,
    User: PropTypes.object,
    Comments: PropTypes.array,
    Likers: PropTypes.array,
    createdAt: PropTypes.string
  }).isRequired,
  num: PropTypes.number.isRequired
};

export default CommtyOne;
