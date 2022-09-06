import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import style from './Signup.module.css';
import Signin from '../Signin/Signin';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSignUp = useSelector((state) => state.showSignUp);
  const showSignIn = useSelector((state) => state.showSignIn);
  // Стейт вывода ошибки
  const [error, setError] = useState({});
  // Стейт инпутов для регистрации
  const inputSignup = useSelector((state) => state.inputSignup);

  // Закрывает модальное окно
  const handleClose = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
  };
  // Меняет состояние инпутов
  const inputSignupHandler = (e) => {
    dispatch({
      type: 'SET_INPUT_SIGNUP',
      payload: { [e.target.name]: e.target.value },
    });
  };
  // Регистрация
  const submitSignupHandler = (event) => {
    event.preventDefault();
    const newUser = {
      name: inputSignup.name,
      email: inputSignup.email,
      password: inputSignup.password,
    };
    axios
      .post('http://localhost:3001/auth/signup', newUser, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: res.data });
        localStorage.setItem('UserId', res.data.id);
        navigate('/');
        dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
      })
      .catch((res) => {
        if (res.response.status === 401) {
          setError(res.response.data);
        } else if (res.response.status === 500) {
          setError(res.response.data);
        }
      });
  };

  const showAuthHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
    dispatch({ type: 'SET_CHANGE_SHOW_SIGNIN', payload: !showSignIn });
  };

  return (
    <div className={style.intro_container}>
      <Modal show={showSignUp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Регистрация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitSignupHandler} id="signupForm">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name" />
              <Form.Control
                onChange={inputSignupHandler}
                id="name"
                className="form-control login-email-pass"
                name="name"
                type="text"
                placeholder="Введите логин"
                required
                pattern="[A-Za-z]\w+"
                minLength="4"
                title="Латинские буквы, цифры и _"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email" />
              <Form.Control
                onChange={inputSignupHandler}
                id="email"
                className="form-control login-email-pass"
                name="email"
                type="text"
                placeholder="Введите email"
                pattern="^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password" />
              <Form.Control
                onChange={inputSignupHandler}
                id="password"
                className="form-control login-email-pass"
                name="password"
                type="password"
                placeholder="Введите пароль"
                required
                minLength="6"
              />
              <div className="errMessages">{error.message}</div>
            </Form.Group>
            <span>
              Если вы зарегестрированы, то
              {' '}
              <Button
                className={style.btn_auth}
                onClick={() => showAuthHandler()}
              >
                авторизируйтесь
              </Button>
            </span>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                Выйти
              </Button>
              <Button
                type="submit"
                variant="secondary"
                className="btn btn-primary login-email-pass-but"
              >
                Зарегистрироваться
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {showSignIn ? <Signin /> : null}
    </div>
  );
}
