/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import style from './ExcursionItem.module.css';

function ExcursionItem({ excursion }) {
  const excursions = useSelector((state) => state.excursions);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const showSignUp = useSelector((state) => state.showSignUp);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post(`http://localhost:3001/excursion/like/check/${excursion.id}`, { id: localStorage.getItem('UserId') }).then((response) => {
      if (response.status === 200) {
        setLiked(true);
      }
    });
  }, []);

  const LikeHandler = (excursionId, userId) => {
    try {
      if (!user.name) dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
      else if (!liked) {
        axios.post(`http://localhost:3001/excursion/like/plus/${excursionId}`, { id: userId }).then((result) => { // все лайки
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
            setLiked(true);
          }
        });
      } else {
        axios.post(`http://localhost:3001/excursion/like/minus/${excursionId}`, { id: userId }).then((result) => { // все лайки
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
            setLiked(false);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const AddToCart = (id) => {
    if (cart.every((el) => el.id !== id)) {
      const obj = excursions.filter((ex) => ex.id === id)[0];
      obj.count = Number(obj.count);
      obj.priceTotal = obj.price;

      dispatch({ type: 'SET_ADD_CART', payload: obj });
    } else {
      dispatch({
        type: 'SET_INCREASE_CART',
        payload: cart.map((product) => {
          if (product.id === id) {
            return {
              ...product,
              count: Number(product.count) + 1,
              priceTotal: Number(product.count + 1) * product.price,
            };
          }
          return product;
        }),
      });
    }
  };
  return (
    <Card className={style.card_container}>
      <Card.Img className={style.image} variant="top" src={`http://localhost:3001/${excursion.img}`} />
      <Card.Body className={style.text_container}>
        <Card.Title>{excursion.title}</Card.Title>
        <Card.Text className={style.text}>{excursion.text}</Card.Text>
        <Card.Text>
          Локация:
          {' '}
          {excursion.location}
        </Card.Text>
        <div>
          Цена:
          {' '}
          {excursion.price}
        </div>
      </Card.Body>
      <div className={style.btn_container}>
        <div className={style.like_container}>
          <Card.Text className={style.like_btn} onClick={() => LikeHandler(excursion.id, localStorage.getItem('UserId'))}>
            {' '}
            {!liked ? <FavoriteBorderIcon /> : <FavoriteIcon /> }
            {' '}
          </Card.Text>
          <span className={style.like_counter}>{excursion.likes}</span>
        </div>
        <Card.Link className={style.details_btn} as={Link} to={`/excursions/${excursion.id}`}>Подробнее</Card.Link>

      </div>
      {/* <button type="button" onClick={() => deleteExcursion(excursion.id)} className="btn btn-outline-danger mx-1">Удалить</button> */}
      <button className={style.buy_btn} type="button" onClick={() => AddToCart(excursion.id)}>В корзину</button>
    </Card>
  );
}

export default ExcursionItem;
