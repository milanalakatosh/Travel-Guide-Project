/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import style from './PostItem.module.css';
import Signup from '../../Signup/Signup';

export default function PostItem({ post }) {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  console.log('posts: ', posts);
  const showSignUp = useSelector((state) => state.showSignUp);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = post;
    axios.post(`http://localhost:3001/post/like/check/${id}`, { id: localStorage.getItem('UserId') }).then((response) => {
      if (response.status === 200) {
        setLiked(true);
      }
    });
  }, []);

  const LikeHandler = (postId, userId) => {
    try {
      if (!user.name) {
        dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
      } else if (!liked) {
        axios.post(`http://localhost:3001/post/like/plus/${postId}`, { id: userId }).then((result) => { // все лайки
          if (result.status === 200) {
            const newPosts = [...posts];
            for (let i = 0; i < newPosts.length; i += 1) {
              if (newPosts[i].id === postId) {
                newPosts[i].likes += 1;
                break;
              }
            }
            dispatch({
              type: 'SET_POSTS',
              payload: newPosts,
            });
            setLiked(true);
          }
        });
      } else {
        axios.post(`http://localhost:3001/post/like/minus/${postId}`, { id: userId }).then((result) => { // все лайки
          if (result.status === 200) {
            const newPosts = [...posts];
            if (post.likes > 0) {
              for (let i = 0; i < newPosts.length; i += 1) {
                if (newPosts[i].id === postId) {
                  newPosts[i].likes -= 1;
                  break;
                }
              }
            }
            dispatch({
              type: 'SET_POSTS',
              payload: newPosts,
            });
          }
          setLiked(false);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Card className={style.card_container}>
        <Card.Img className={style.image} variant="top" src={`http://localhost:3001/${post.img}`} />
        <Card.Body className={style.text_container}>
          <Card.Title className={style.title}>{post.title}</Card.Title>
          <Card.Text className={style.text}>{post.text}</Card.Text>
        </Card.Body>
        <div className={style.btn_container}>
          <div className={style.like_container}>
            <Card.Text className={style.like_btn} onClick={() => LikeHandler(post.id, localStorage.getItem('UserId'))}>
              {' '}
              {!liked ? <FavoriteBorderIcon /> : <FavoriteIcon /> }
              {' '}
            </Card.Text>
            <span className={style.like_counter}>{post.likes}</span>
          </div>
          <Card.Link className={style.details_btn} as={Link} to={`/posts/${post.id}`}>Подробнее</Card.Link>
        </div>
      </Card>
      {showSignUp ? <Signup /> : null}
    </>
  );
}
