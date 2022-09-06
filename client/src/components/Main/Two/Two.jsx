/* eslint-disable max-len */
import React from 'react';
import style from './Two.module.css';

export default function Two() {
  return (
    <div className={style.two_parallax}>
      <div className={style.main_text}>
        <div className={style.two_text_parallax}>
          <div className={style.text_in_main_bold}>
            <h1 className="wow bounceInUp">Чёрный пляж, Гавайи </h1>
          </div>
          <div className={style.text_in_main}>
            <h3 className="wow bounceInUp">
              Чёрный пляж — Паналуу — сформировался в результате вулканической активности.
              Пляж, по сути, представляет собой смесь лавы и базальта, поэтому песок на побережье насыщенного чёрного цвета.
              На пляже можно встретить не только туристов, но и множество морских черепах, в том числе — исчезающих бисс.
            </h3>
          </div>
        </div>
      </div>
      <div className={style.two_mask} />
    </div>
  );
}
