import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderItem from '../OrderItem/OrderItem';
import OrderModal from '../OrderModal/OrderModal';
import style from './OrderCheckOut.module.css';

export default function OrderCheckOut() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [sum, setSum] = useState(0);
  const [sumCount, setSumCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showOrderModal = useSelector((state) => state.showOrderModal);
  const showSignUp = useSelector((state) => state.showSignUp);

  useEffect(() => {
    const num = cart.reduce((acc, obj) => acc + obj.count, 0);
    const price = cart.reduce((acc, obj) => acc + obj.priceTotal, 0);
    setSum(price);
    setSumCount(num);
  }, []);

  const leaveHandler = () => {
    dispatch({ type: 'SET_CART', payload: [] });
    navigate('/excursions');
    setSum(0);
    setSumCount(0);
  };

  const confirmHandler = () => {
    if (!user.name) dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
    else {
      dispatch({ type: 'SET_CHANGE_SHOW_ORDER', payload: !showOrderModal });
      const newArr = [];
      const orderNr = Math.floor(Math.random() * 1000);
      for (let i = 0; i < cart.length; i += 1) {
        const obj = {
          excursion_id: cart[i].id,
          excursion_name: cart[i].title,
          count: cart[i].count,
          price: cart[i].price,
          totalPrice: cart[i].priceTotal,
          user_id: Number(localStorage.getItem('UserId')),
          order_nr: orderNr,
        };
        newArr.push(obj);
      // const order = cart.map((obj) => {obj, im:localStorage.getItem('UserId')});
      }
      axios.post('http://localhost:3001/order', newArr)
        .then((res) => dispatch({ type: 'SET_PERSONAL_ORDER', payload: res.data }));
      dispatch({ type: 'SET_CART', payload: [] });
      setSum(0);
      setSumCount(0);
    }
  };
  return (
    <div className={style.order_container}>
      <h1 className={style.title}>Ваш заказ:</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          { cart?.map((product, index) => (
            <OrderItem
              product={product}
              id={product.id}
              key={product.id}
              index={index}
              sum={sum}
              setSum={setSum}
              sumCount={sumCount}
              setSumCount={setSumCount}
            />
          ))}
          <tr>
            <th>#</th>
            <th>Итого: </th>
            <th>
              {sumCount}
              {/* cart.reduce((acc, product) => acc + product.count, 0)} */}
            </th>
            <th>
              {sum}
              {' '}
              руб.
            </th>
          </tr>
        </tbody>
      </Table>
      <div className={style.btn_container}>
        <Button onClick={() => leaveHandler()} variant="dark">Выйти</Button>
        <Button onClick={() => confirmHandler()} variant="success">Подтвердить</Button>
      </div>
      {showOrderModal ? <OrderModal /> : null}
    </div>
  );
}
