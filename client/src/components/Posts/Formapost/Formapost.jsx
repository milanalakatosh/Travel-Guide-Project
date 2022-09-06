// import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import InfoModal from '../InfoModal/InfoModal';
import style from './Formapost.module.css';

function Formapost() {
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState();
  const [inputs, setInputs] = useState({});
  const showPost = useSelector((state) => state.showPost);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('title', inputs.title);
    data.append('text', inputs.text);
    data.append('url', inputs.url);
    data.append('image', fileData);
    data.append('userId', localStorage.getItem('UserId'));
    data.append('likes', 0);
    axios.post(
      'http://localhost:3001/post/add',
      data,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )
      .then((post) => {
        dispatch({ type: 'SET_ADD_POST', payload: post.data });
        dispatch({ type: 'SET_CHANGE_SHOW_POST', payload: !showPost });
      });
  };

  return (
    <div className={style.form_container}>
      <h3 className={style.title}>Добавьте пост</h3>
      <div className={style.form}>
        <form className="mb-3" onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={style.form_label}>Название поста</Form.Label>
            <Form.Control className={style.form_input} required name="title" onChange={inputHandler} type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className={style.form_label}>Описание поста</Form.Label>
            <Form.Control className={style.form_input} required name="text" onChange={inputHandler} as="textarea" />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className={style.form_label}>Добавь фото</Form.Label>
            <Form.Control type="file" name="image" onChange={fileChangeHandler} />
          </Form.Group>
          <button style={{ margin: '20px 0' }} type="submit" className="btn btn-primary">Опубликовать</button>
        </form>
        {showPost ? <InfoModal /> : null}

      </div>

    </div>
  );
}

export default Formapost;
