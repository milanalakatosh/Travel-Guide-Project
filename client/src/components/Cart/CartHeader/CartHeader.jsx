import React from 'react';
import style from './CartHeader.module.css';

export default function CartHeader() {
  return (
    <header className={style.cart_header}>
      <div className={style.cart_header__title}>наименование</div>
      <div className={style.cart_header__count}>количество</div>
      <div className={style.cart_header__cost}>стоимость</div>
    </header>
  );
}
