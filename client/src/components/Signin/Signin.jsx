import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import style from './Signin.module.css';

export default function Signin() {
  // Стейт вывода ошибки
  const [error, setError] = useState({});
  // Стейт закрытия модального окна
  const showSignIn = useSelector((state) => state.showSignIn);
  // Стейт инпутов для регистрации
  const inputSignin = useSelector((state) => state.inputSignin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Закрывает модальное окно
  const handleClose = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_SIGNIN', payload: !showSignIn });
  };
  // Меняет состояние инпутов
  const inputSigninHandler = (e) => {
    dispatch({ type: 'SET_INPUT_SIGNIN', payload: { [e.target.name]: e.target.value } });
  };

  const submitSigninHandler = (event) => {
    event.preventDefault();
    const newUser = { name: inputSignin.name, password: inputSignin.password };
    axios.post('http://localhost:3001/auth/signin', newUser, { withCredentials: true })
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: res.data });
        localStorage.setItem('UserId', res.data.id);
        dispatch({ type: 'SET_CHANGE_SHOW_SIGNIN', payload: !showSignIn });
        navigate('/');
      })
      .catch((res) => {
        if (res.response.status === 401) {
          setError(res.response.data);
        } else if (res.response.status === 500) {
          setError(res.response.data);
        }
      });
  };
  return (
    <div className={style.intro_container}>
      <Modal show={showSignIn} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="signinForm" onSubmit={submitSigninHandler}>
            <Form.Group className="mb-3">
              <Form.Label />
              <Form.Control
                onChange={inputSigninHandler}
                id="username"
                className="form-control login-email-pass"
                name="name"
                placeholder="Введите логин"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label />
              <Form.Control
                onChange={inputSigninHandler}
                id="password"
                className="form-control login-email-pass"
                name="password"
                placeholder="Введите пароль"
                type="password"
                required
              />
              <div className="errMessages">{error.message}</div>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                Выйти
              </Button>
              <Button type="submit" variant="secondary" className="btn btn-primary login-email-pass-but">
                Войти
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
