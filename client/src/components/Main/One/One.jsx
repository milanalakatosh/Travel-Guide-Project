import React from 'react';
import style from './One.module.css';

export default function One() {
  return (
    <div className={style.one_parallax}>
      <div className={style.main_text}>
        <div className={style.one_text_parallax}>
          <div className={style.text_in_main_bold}>
            <h1 className="wow bounceInUp">Travel Guide</h1>
          </div>
          <div className={style.text_in_main}>
            <h3 className="wow bounceInUp">
              Путешествуйте - это по-прежнему того стоит.
            </h3>
          </div>
        </div>
      </div>
      <div className={style.one_mask} />
    </div>

  );
}
