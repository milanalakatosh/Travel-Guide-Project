/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import style from './Personal.module.css';
import PersonalProductItem from './PersonalProductItem';
// import OrderItem from '../Order/OrderItem/OrderItem';

export default function Personal() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.user);
  const personalOrder = useSelector((state) => state.personalOrder);
  // const dispatch = useDispatch();
  console.log(12345, personalOrder);
  // const [sum, setSum] = useState(0);
  // const [sumCount, setSumCount] = useState(0);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const showOrderModal = useSelector((state) => state.showOrderModal);
  // const showSignUp = useSelector((state) => state.showSignUp);
  useEffect(() => {
    // if (user.name) {
    //   axios.get(`http://localhost:3001/order/${user.id}`)
    //     .then((res) => console.log(1234, res.data));
    //   // dispatch({ type: 'SET_PERSONAL_ORDER', payload: res.data }));
    // }
    const num = personalOrder.reduce((acc, obj) => acc + obj.count, 0);
    setTotalCount(num);
    const price = personalOrder.reduce((acc, obj) => acc + obj.totalPrice, 0);
    setTotalPrice(price);
  }, []);

  return (
    <div className={style.order_container}>
      <h1 className={style.title}>Ваши данные:</h1>
      <h3 className={style.text}>
        Логин:
        {' '}
        {user.name}
      </h3>
      <h3 className={style.text}>
        Электронная почта:
        {' '}
        {user.email}
      </h3>
      {personalOrder.length !== 0
        ? (
          <>
            <h1 className={style.title}>Ваши заказы:</h1>
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
                { personalOrder?.map((product, index) => (
                  <PersonalProductItem
                    product={product}
                    id={product.id}
                    key={product.id}
                    index={index}
                  />
                ))}
                <tr>
                  <th>#</th>
                  <th>Итого:</th>
                  <th>{totalCount}</th>
                  <th>{totalPrice}</th>
                </tr>
              </tbody>
            </Table>
          </>
        ) : null}
    </div>
  );
}
