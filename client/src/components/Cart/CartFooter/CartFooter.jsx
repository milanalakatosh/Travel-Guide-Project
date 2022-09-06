/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import style from './CartFooter.module.css';

export default function CartFooter() {
  // const allPrice = useSelector((state) => state.allPrice);
  // const allCount = useSelector((state) => state.allCount);
  const cart = useSelector((state) => state.cart);

  return (
    <footer className={style.cart_footer}>
      <div className={style.text_footer}>
        Итог:
        <div className={style.cart_footer__count}>
          {cart.reduce((acc, product) => acc + product.count, 0)}
          {' '}
          кол-во.
        </div>
        <div className={style.cart_footer__price}>
          {cart.reduce((acc, product) => acc + product.priceTotal, 0)}
          {' '}
          руб.
        </div>
      </div>
    </footer>
  );
}
