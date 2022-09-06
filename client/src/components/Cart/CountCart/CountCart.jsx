/* eslint-disable react/prop-types */
import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import style from './CountCart.module.css';

export default function CountCart({
  increase, decrease, changeValue, product,
}) {
  return (
    <div className={style.count}>
      <div className={style.count__box}>
        <input onChange={(e) => { changeValue(product.id, Number(e.target.value)); }} type="number" className={style.count__input} min="1" max="100" value={product.count} />
      </div>
      <div className={style.count__controls}>
        <button type="button" className={style.count__up} style={{ border: 'none', background: '#fff' }} onClick={() => increase(product.id)}>
          {/* <img src="./img/icons/icon-up.svg" alt="Increase" /> */}
          <KeyboardArrowUpIcon />
        </button>
        <button type="button" className={style.count__down} style={{ border: 'none', background: '#fff' }} onClick={() => decrease(product.id)}>
          {/* <img src="./img/icons/icon-down.svg" alt="Decrease" /> */}
          <KeyboardArrowDownIcon />
        </button>
      </div>
    </div>
  );
}
