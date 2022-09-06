import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ExcursionItem from '../ExcursionItem/ExcursionItem';
import style from './ExcursionList.module.css';

function ExcursionList() {
  const excursions = useSelector((state) => state.excursions);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/excursions').then((allExcursions) => {
        console.log('allExcursions.data', allExcursions.data);
        dispatch({ type: 'SET_EXCURSIONS', payload: allExcursions.data });
        console.log('excursions', excursions);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={style.excursions_container}>
      {excursions?.map((excursion) => <ExcursionItem excursion={excursion} key={excursion.id} />)}
      {excursions.length === 0 ? <div className={style.empty}>Записей нет</div> : null}
    </div>
  );
}

export default ExcursionList;
