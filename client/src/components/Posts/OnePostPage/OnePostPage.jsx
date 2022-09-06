/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Nav } from 'react-bootstrap';
import style from './OnePostPage.module.css';
import Postcomments from '../../Comments/PostComments';
// import PostItem from '../PostItem/PostItem';
export default function OnePostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.post);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const showSignUp = useSelector((state) => state.showSignUp);
  const [liked, setLiked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // eslint-disable-next-line no-unused-vars
  function editPost(id) {
    setEdit(true);
    // eslint-disable-next-line react/prop-types
    setText(post.text);
    setTitle(post.title);
  }
  useEffect(() => {
    axios(`http://localhost:3001/posts/${id}`)
      .then((postFromServer) => {
        console.log('postFromServer:', postFromServer);
        dispatch({ type: 'SET_POST', payload: { ...postFromServer.data, loading: false } });
      });
    // rest.json())
    // .then((jsonRest) => {
    console.log(post);
    // dispatch({ type: 'SET_POST', payload: jsonRest });
    axios.post(`http://localhost:3001/post/like/check/${id}`, { id: localStorage.getItem('UserId') }).then((response) => {
      if (response.status === 200) {
        setLiked(true);
      }
    });
    console.log(liked);
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
            post.likes += 1;
            dispatch({ type: 'SET_POST', payload: post });
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
            if (post.likes > 0) {
              post.likes -= 1;
            }
            dispatch({ type: 'SET_POST', payload: post });
            setLiked(false);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: 'SET_POSTS',
          payload: posts.filter((el) => el.id !== id),
        });
      }
    });
    navigate('/posts');
  };
  function savePost() {
    axios
      .put(`http://localhost:3001/posts/updpost/${id}`, { text, title })
      .then((res) => {
        dispatch({
          type: 'SET_POST',
          payload: res.data,
        });
        setEdit(false);
      });
  }
  return (
    <div className={style.page_contain}>
      {post.loading ? (
        <div className="spinner-border text-success" style={{ height: '60vh' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
        : (
          <Card className={style.page}>
            <Card.Img
              className={style.image}
              variant="top"
              src={`http://localhost:3001/${post.img}`}
            />
            {
              edit
                ? (
                  <div className={style.input_container}>
                    <input
                      className={style.text}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      className={style.text}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                )
                : (
                  <Card.Body>
                    <Card.Title className={style.title}>{post.title}</Card.Title>
                    <Card.Text>{post.text}</Card.Text>
                  </Card.Body>
                )
            }
            {
              edit ? (
                <div>
                  <button style={{ margin: '0 20px' }} type="button" onClick={() => savePost(id)}>
                    сохранить
                  </button>
                </div>
              )
                : (
                  <div className={style.buttons}>
                    {post.user_id === Number(localStorage.getItem('UserId')) ? (
                      <>
                        <Nav.Item className={style.edit_btn} onClick={() => editPost(id)}>
                          <EditRoundedIcon />
                        </Nav.Item>
                        <Nav.Item onClick={() => deletePost(post.id)} className={style.delete_btn}>
                          <ClearOutlinedIcon />
                        </Nav.Item>
                      </>
                    ) : null}
                  </div>
                )
            }
            <div className={style.btn_container}>
              <div className={style.like_container}>
                <Card.Text
                  className={style.like_btn}
                  onClick={() => LikeHandler(post.id, localStorage.getItem('UserId'))}
                >
                  {' '}
                  {!liked ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                  {' '}
                </Card.Text>
                <span className={style.like_counter}>{post.likes}</span>
              </div>
            </div>
            <Postcomments />
          </Card>
        )}
    </div>
  );
}
