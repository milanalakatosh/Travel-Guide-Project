/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Nav } from 'react-bootstrap';
import style from './OneExcursionPage.module.css';
import ExcursionComments from '../../Comments/ExcursionComments';

function OneExcursionPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const excursion = useSelector((state) => state.excursion);
  const excursions = useSelector((state) => state.excursions);
  const showSignUp = useSelector((state) => state.showSignUp);
  const [liked, setLiked] = useState(false);
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-shadow
  function editExursion(id) {
    setEdit(true);
    // eslint-disable-next-line react/prop-types
    setText(excursion.text);
    setTitle(excursion.title);
  }

  useEffect(() => {
    axios(`http://localhost:3001/excursions/${id}`).then((jsonRest) => {
      dispatch({
        type: 'SET_EXCURSION',
        payload: { ...jsonRest.data, loading: false },
      });
    });
    axios.post(`http://localhost:3001/excursion/like/check/${id}`, { id: localStorage.getItem('UserId') }).then((response) => {
      if (response.status === 200) {
        setLiked(true);
      }
    });
  }, []);

  const LikeHandler = (excursionId, userId) => {
    try {
      if (!user.name) { dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp }); } else if (!liked) {
        axios
          .post(`http://localhost:3001/excursion/like/plus/${excursionId}`, {
            id: userId,
          })
          .then((result) => {
            // все лайки
            if (result.status === 200) {
              const newExcursions = [...excursions];
              for (let i = 0; i < newExcursions.length; i += 1) {
                if (newExcursions[i].id === excursionId) {
                  newExcursions[i].likes += 1;
                  break;
                }
              }
              dispatch({
                type: 'SET_EXCURSIONS',
                payload: newExcursions,
              });
              excursion.likes += 1;
              dispatch({ type: 'SET_EXCURSION', payload: excursion });
              setLiked(true);
            }
          });
      } else {
        axios
          .post(`http://localhost:3001/excursion/like/minus/${excursionId}`, {
            id: userId,
          })
          .then((result) => {
            // все лайки
            if (result.status === 200) {
              const newExcursions = [...excursions];
              if (excursion.likes > 0) {
                for (let i = 0; i < newExcursions.length; i += 1) {
                  if (newExcursions[i].id === excursionId) {
                    newExcursions[i].likes -= 1;
                    break;
                  }
                }
              }
              dispatch({
                type: 'SET_EXCURSIONS',
                payload: newExcursions,
              });
              if (excursion.likes > 0) {
                excursion.likes -= 1;
              }
              dispatch({ type: 'SET_EXCURSION', payload: excursion });
              setLiked(false);
            }
          });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteExcursion = (ID) => {
    axios.delete(`http://localhost:3001/excursions/${ID}`).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: 'SET_EXCURSIONS',
          payload: excursions.filter((el) => el.id !== ID),
        });
      }
    });
    navigate('/excursions');
  };

  // const AddToCart = (ID) => {
  //   if (cart.every((el) => el.id !== ID)) {
  //     dispatch({ type: 'SET_ADD_CART', payload: (excursions.filter((ex) => ex.id === ID))[0] });
  //   } else {
  //     dispatch({
  //       type: 'SET_INCREASE_CART',
  //       payload: cart.map((product) => {
  //         if (product.id === ID) {
  //           return {
  //             ...product,
  //             count: Number(product.count) + 1,
  //             priceTotal: Number(product.count + 1) * product.price,
  //           };
  //         }
  //         return product;
  //       }),
  //     });
  //   }
  // };
  function saveExcursion() {
    axios
      .put(`http://localhost:3001/excursions/updexc/${id}`, { text, title })
      .then((res) => {
        dispatch({
          type: 'SET_EXCURSION',
          payload: res.data,
        });
        setEdit(false);
      });
  }

  return (
    <div className={style.page_contain}>
      {excursion.loading ? (
        <div className="spinner-border text-success" style={{ height: '60vh' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
        : (
          <Card className={style.page}>
            <Card.Img
              className={style.image}
              variant="top"
              src={`http://localhost:3001/${excursion.img}`}
            />

            {
            edit
              ? (
                <div className={style.input_container}>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} />
                  <input value={text} onChange={(e) => setText(e.target.value)} />

                </div>
              )
              : (
                <Card.Body>
                  <Card.Title className={style.title}>{excursion.title}</Card.Title>
                  <Card.Text>{excursion.text}</Card.Text>
                  <Card.Text>
                    Локация:
                    {' '}
                    {excursion.location}
                  </Card.Text>
                </Card.Body>
              )

          }
            {
            edit ? (
              <div>
                <button style={{ margin: '0 20px' }} type="button" onClick={() => saveExcursion(id)}>
                  сохранить
                </button>
              </div>
            )
              : (
                <div className={style.buttons}>
                  {excursion.user_id === Number(localStorage.getItem('UserId')) ? (
                    <>
                      <Nav.Item className={style.edit_btn} onClick={() => editExursion(id)}>
                        <EditRoundedIcon />
                      </Nav.Item>
                      <Nav.Item
                        onClick={() => deleteExcursion(excursion.id)}
                        className={style.delete_btn}
                      >
                        <ClearOutlinedIcon />
                      </Nav.Item>
                    </>
                  ) : null }
                </div>
              )
          }

            <div className={style.btn_container}>
              <div className={style.like_container}>
                <Card.Text
                  className={style.like_btn}
                  onClick={() => LikeHandler(excursion.id, localStorage.getItem('UserId'))}
                >
                  {' '}
                  {!liked ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                  {' '}
                </Card.Text>
                <span className={style.like_counter}>{excursion.likes}</span>
              </div>

            </div>
            <ExcursionComments />
          </Card>
        )}
    </div>
  );
}

export default OneExcursionPage;
