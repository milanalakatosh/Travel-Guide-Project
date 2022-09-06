import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OnePostComment from './OnePostComment';
import style from './style.module.css';

function Postcomments() {
  const post = useSelector((state) => state.post);
  const commentsPosts = useSelector((state) => state.commentsPosts);
  const postId = post.id;
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = localStorage.getItem('UserId');

  // подгружаем коменты с сервера
  useEffect(() => {
    axios.get(`http://localhost:3001/postComment/${id}`)
      .then((allComments) => {
        dispatch({ type: 'SET_POSTCOMMENT', payload: allComments.data });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    axios.post('http://localhost:3001/postComment/add', { text, postId, userId })
      .then((comment) => {
        dispatch({ type: 'ADD_POSTCOMMENT', payload: comment.data });
      });
    e.target.reset();
  };

  return (
    <div className={style.comments_container}>
      {commentsPosts.length > 0 ? (
        <div className="card-comments">
          <h3 className={style.title}>Комментарии:</h3>
          {commentsPosts.map((el) => (
            <OnePostComment el={el} key={el.id} id={el.id} />
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className={style.comment_inputs}>
        <input type="text" name="text" placeholder="Оставь свой комментарий" />
        <input
          style={{
            background: 'transparent', width: 'auto', border: 'none', color: '#2360C5', fontSize: '18px',
          }}
          type="submit"
          value="Опубликовать"
        />
      </form>
    </div>
  );
}

export default Postcomments;
