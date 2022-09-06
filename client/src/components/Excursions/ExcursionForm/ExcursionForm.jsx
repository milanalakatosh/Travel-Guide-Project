import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import style from './ExcursionForm.module.css';
import InfoModal from '../InfoModal/InfoModal';

function ExcursionForm() {
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState();
  const [inputs, setInputs] = useState({});
  const showExcursion = useSelector((state) => state.showExcursion);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // получение и передача данных

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('image', fileData);
    data.append('title', inputs.title);
    data.append('text', inputs.text);
    data.append('location', inputs.location);
    data.append('price', inputs.price);
    data.append('count', inputs.count);
    data.append('userId', localStorage.getItem('UserId'));
    data.append('likes', 0);

    axios.post(
      'http://localhost:3001/excursion/add',
      data,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )
      .then((post) => {
        dispatch({ type: 'SET_ADD_EXCURSIONS', payload: post.data });
      });
    dispatch({ type: 'SET_CHANGE_SHOW_EXCURSION', payload: !showExcursion });
  };

  return (
    <div className={style.form_container}>
      <h3 className={style.title}>Добавьте экскурсию</h3>
      <div className={style.form}>
        <form className="mb-3" onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={style.form_label}>Название экскурсии</Form.Label>
            <Form.Control className={style.form_input} required name="title" onChange={inputHandler} type="text" />
          </Form.Group>
          <Form.Group className={style.mb - 3} controlId="exampleForm.ControlInput1">
            <Form.Label className={style.form_label}>Расскажи о локации</Form.Label>
            <Form.Control className={style.form_input} required name="location" onChange={inputHandler} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={style.form_label}>Сколько будет стоить</Form.Label>
            <Form.Control className={style.form_input} required name="price" onChange={inputHandler} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className={style.form_label}>Описание экскурсии</Form.Label>
            <Form.Control className={style.form_input} required name="text" onChange={inputHandler} as="textarea" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className={style.form_label}>Добавь фото</Form.Label>
            <Form.Control type="file" name="image" onChange={fileChangeHandler} />
          </Form.Group>
          <button style={{ margin: '20px 0' }} type="submit" className="btn btn-primary">Опубликовать</button>
        </form>
        {showExcursion ? <InfoModal /> : null}
      </div>
    </div>
  );
}

export default ExcursionForm;
