import React from 'react';
import style from './Five.module.css';

export default function Five() {
  return (
    <div className={style.five_parallax}>
      <div className={style.main_text}>
        <div className={style.five_text_parallax}>
          <h1 style={{ fontWeight: ' bold;' }} className="wow bounceInUp">Travel Guide</h1>
          <h3
            style={{
              fontSize: '28px;', textAlign: 'justify;', margin: '15px 0;',
            }}
            className="wow bounceInUp"
          >
            Оставляй свои заметки о путешествиях. Делись фотографиями и впечатлениями.
            Находи единомышленников.
          </h3>
        </div>
      </div>
      <div className={style.five_mask} />
    </div>
  );
}
