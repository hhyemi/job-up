import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const CommtyOne = ({ commty, num }) => {
  const { id, title, createdAt, views, User, Comments, Likers } = commty;

  return (
    <>
      <tr>
        <td>{num}</td>
        <Link href={`/admin/commty/${id}`}>
          <td className="comm-title cursor">
            {title.split(/(#[^\s#]+)/g).map((v, i) => {
              if (v.match(/(#[^\s#]+)/)) {
                return (
                  <Link href={`/admin/hashtag/${v.slice(1)}`} key={i}>
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
        </Link>
        <td>{User.name}</td>
        <td>{createdAt.substring(0, 10)}</td>
        <td>{views}</td>
        <td>{Likers.length}</td>
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
