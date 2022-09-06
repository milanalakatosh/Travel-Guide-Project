/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import style from './YandexMap.module.css';

export default function YandexMap() {
  const dispatch = useDispatch();

  // Стейт инпутов
  const yandexMaps = useSelector((state) => state.yandexMaps);
  // Стейт для всех меток
  const placemarks = useSelector((state) => state.placemarks);

  const canvasRef = useRef(null);
  const postIdForMap = '2';

  function init() {
    const map = new ymaps.Map('map', {
      center: [55.72761071631892, 37.723423350478775],
      zoom: 5,
    });

    const geoObjects = [];

    for (let i = 0; i < placemarks.length; i += 1) {
      const arr = placemarks[i].coordinates.split(',');
      const newArr = arr.map((el) => Number(el));
      geoObjects.push(new ymaps.Placemark(
        newArr,
        {
          balloonContentHeader: placemarks[i].text,
          balloonContentBody: placemarks[i].content,
          balloonContentFooter: placemarks[i].link,
        },

      ));
    }

    const clusterer = new ymaps.Clusterer();
    clusterer.add(geoObjects);
    map.geoObjects.add(clusterer);

    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
  }

  // Ручка, отслеживающая состояние инпутов
  const inputYandexMapsHandler = (event) => {
    dispatch({ type: 'SET_INPUT_YANDEX_MAP', payload: { [event.target.name]: event.target.value } });
  };

  const formMap = async (e) => {
    e.preventDefault();
    // Получаем координаты и присваеваем их переменной coord
    const response = await ymaps.geocode(yandexMaps.text);
    const coord = response.geoObjects.get(0).geometry.getCoordinates();

    let linkPostId = '';
    if (postIdForMap !== '') {
      linkPostId = `<a href='/posts/${postIdForMap}'>Ссылка на пост</a>`;

      // linkPostId = '<button id="linkPostBtn">Ссылка на пост</button>';
      // onClick={${postIdForMap} => ${navigateHandler(postIdForMap)}}
    }
    // Создаём объект с нужными ключами и значениями и передаём на бэк
    const newPlacemark = {
      // coordinates: yandexMaps.coordinates,
      coordinates: `${coord[0]},${coord[1]}`,
      text: yandexMaps.text,
      content: yandexMaps.content,
      link: linkPostId,
      postId: Number(postIdForMap),
    };
    axios.post('http://localhost:3001/map/add', newPlacemark)
      .then((res) => {
        const newObj = {
          coordinates: res.data.coordinates,
          text: res.data.text,
          content: res.data.content,
          link: res.data.link,
        };
        dispatch({ type: 'SET_ONE_PLACEMARKS', payload: [...placemarks, newObj] });
      });
  };

  // Выводим все метки
  useEffect(() => {
    axios.get('http://localhost:3001/map').then((res) => {
      dispatch({ type: 'SET_PLACEMARKS', payload: res.data });
    });
  }, []);

  // Срабатывает функция инит (создания метки) и ведётся борьба с канвасом
  useEffect(() => {
    ymaps.ready(init);

    return () => {
      canvasRef?.current?.removeChild(canvasRef?.current?.firstChild);
    };
  }, [placemarks]);
  return (
    <>
      <div className={style.map_container}>
        <div ref={canvasRef} id="map" className={style.map} />
      </div>

      <form className={style.form_container} type="submit" onSubmit={formMap}>
        <div className={style.input_container}>
          {/* <input className={style.input_type} onChange={inputYandexMapsHandler}
          type="text" placeholder="Введите коррдинаты (центр)" name="coordinates" /> */}
          <input className={`${style.input_type} ${style.input_map} ${style.input_maps}`} onChange={inputYandexMapsHandler} type="text" placeholder="Введите город или адрес" name="text" />
          <input className={`${style.input_type} ${style.input_map} ${style.input_maps}`} onChange={inputYandexMapsHandler} type="text" placeholder="Введите описание" name="content" />
        </div>
        <div className={style.input_container}>
          <button className={`${style.butt_place}`} type="submit">Добавить метку</button>
          {/* <a className={style.link_a} target="_blank" href="https://yandex.ru/map-constructor/location-tool/?from=club" rel="noreferrer">Узнать координаты</a> */}
        </div>
      </form>
    </>
  );
}
