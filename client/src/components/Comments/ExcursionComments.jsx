import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OneExcursionComment from './OneExcursionComment';
import style from './style.module.css';

function ExcursionComments() {
  const excursion = useSelector((state) => state.excursion);
  const comments = useSelector((state) => state.commentsExcursions);
  const excursionId = excursion.id;
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = localStorage.getItem('UserId');

  // подгружаем коменты с сервера
  useEffect(() => {
    axios
      .get(`http://localhost:3001/excursioComment/${id}`)
      .then((allComments) => {
        dispatch({ type: 'SET_EXCURSIONCOMMENT', payload: allComments.data });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    axios
      .post('http://localhost:3001/excursioComment/add', {
        text,
        excursionId,
        userId,
      })
      .then((comment) => {
        dispatch({ type: 'ADD_EXCURSIONCOMMENT', payload: comment.data });
      });
    e.target.reset();
  };

  return (
    <div className={style.comments_container}>
      {comments.length > 0 ? (
        <div className="card-comments">
          <h3 className={style.title}>Комментарии:</h3>
          {comments.map((el) => (
            <OneExcursionComment el={el} key={el.id} id={el.id} />
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className={style.comment_inputs}>
        <input type="text" name="text" placeholder="Добавить комментарий..." />
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

export default ExcursionComments;
