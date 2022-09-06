/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import style from './style.module.css';

// eslint-disable-next-line react/prop-types
function OneExcursionComment({ el, id }) {
  const comments = useSelector((state) => state.commentsExcursions);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/excursioComment/${id}`).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: 'SET_EXCURSIONCOMMENT',
          payload: comments.filter((el) => el.id !== id),
        });
      }
    });
  };

  // eslint-disable-next-line no-unused-vars
  function editComment(id) {
    setEdit(true);
    // eslint-disable-next-line react/prop-types
    setValue(el.text);
  }

  function saveComment() {
    axios
      .put(`http://localhost:3001/excursioComment/comment/${id}`, { value })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'SET_EXCURSIONCOMMENT',
            payload: [...comments].map((comment) => {
              if (comment.id === id) {
                // eslint-disable-next-line react/prop-types
                // eslint-disable-next-line no-param-reassign
                el.text = value;
              }
              return comment;
            }),
          });
        }
      });
    setEdit(false);
  }

  return (
    <div className={style.one_comment_container}>
      {el.user_id === Number(localStorage.getItem('UserId')) ? (
        <form style={{ display: 'flex' }} className="comments-item">
          {edit ? (
            <div>
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          ) : (
            <div>
              <span className={style.username}>
                {el.name}
                :
                {' '}
              </span>
              <span className={style.comment_text}>
                {el.text}
                {' '}
              </span>
              <span className={style.data}>
                {' '}
                (
                {el.createdAt}
                )
              </span>
            </div>
          )}
          {edit ? (
            <div>
              <button
                type="button"
                onClick={() => saveComment(id)}
              >
                сохранить
              </button>
            </div>
          ) : (
            <div className={style.buttons}>
              <Nav.Item
                className={style.edit_btn}
                onClick={() => editComment(id)}
              >
                <EditRoundedIcon />
              </Nav.Item>
              <Nav.Item
                onClick={() => deleteComment(id)}
                className={style.delete_btn}
              >
                <ClearOutlinedIcon />
              </Nav.Item>
            </div>
          )}
        </form>
      ) : (
        <form style={{ display: 'flex', color: '#605B56' }} className="comments-item">
          <div>
            <span className={style.username}>
              {el.name}
              :
              {' '}
            </span>
            <span style={{ color: '#605B56' }} className={style.comment_text}>
              {el.text}
            </span>
            <span className={style.data}>
              {' '}
              (
              {el.createdAt}
              )
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default OneExcursionComment;
