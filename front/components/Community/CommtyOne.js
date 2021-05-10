import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { backUrl } from '../../config/config';

const CommtyOne = ({ commty, num }) => {
  const { id, title, createdAt, views, User, Comments, Likers } = commty;
  const dispatch = useDispatch();

  // 글 상세보기
  const onCommtyClick = useCallback(() => {
    Router.push(`/admin/commty/${id}`);
  }, [id]);

  return (
    <>
      <tr>
        <td>{num}</td>
        <td className="comm-title cursor" onClick={onCommtyClick}>
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
