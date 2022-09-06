/* eslint-disable max-len */
import React from 'react';
import style from './Four.module.css';

export default function Four() {
  return (
    <div className={style.four_parallax}>
      <div className={style.main_text}>
        <div className={style.four_text_parallax}>
          <div className={style.text_in_main_bold}>
            <h1 className="wow bounceInUp">Каньо-Кристалес, Колумбия</h1>
          </div>
          <div className={style.text_in_main}>
            <h3 className="wow bounceInUp">
              Каньо-Кристалес местные жители называют рекой пяти цветов — вода скользит над разноцветными мхами, и создаётся полная иллюзия, что река окрашена в разные цвета радуги. Лучше всего сюда приезжать в период с конца июля до декабря, когда река особенно яркая. Кроме того, здесь вы можете увидеть 420 различных видов птиц, 8 видов приматов и 10 особенных разновидностей земноводных. Местные осознали, насколько привлекательна их земля для туристов, и теперь проводят разнообразные экскурсии.
            </h3>
          </div>
        </div>
      </div>
      <div className={style.four_mask} />
    </div>
  );
}
