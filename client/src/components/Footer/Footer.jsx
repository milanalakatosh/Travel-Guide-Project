import axios from 'axios';
import React from 'react';
import { Button, NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Выход, удаление сессии и куки
  const logoutHandler = () => {
    axios
      .get('http://localhost:3001/auth/logout', { withCredentials: true })
    // eslint-disable-next-line
			.then((response) => console.log(response));
    dispatch({ type: 'SET_USER', payload: {} });
    dispatch({ type: 'SET_CART', payload: [] });
    localStorage.clear();
    navigate('/');
  };
  const user = useSelector((state) => state.user);
  const showSignUp = useSelector((state) => state.showSignUp);
  const showSignIn = useSelector((state) => state.showSignIn);
  const showCart = useSelector((state) => state.showCart);

  const showSignupHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_SIGNUP', payload: !showSignUp });
  };
  const showSigninHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_SIGNIN', payload: !showSignIn });
  };
  const showCartHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_CART', payload: !showCart });
  };
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>О сайте</h6>
            <p className="text-justify">Сайт создан творческой командой. Пусть пользование нашим приложением принесёт удовольствие.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Категории</h6>
            <ul className="footer-links">
              <li><Link as={Link} to="/posts">Прочитать заметки</Link></li>
              <li><Link as={Link} to="/excursions">Купить экскурсию</Link></li>
              <li><Link as={Link} to="/map">Взглянуть на карту</Link></li>
              <li className="cart_btn_foot">
                <NavItem style={{ textDecoration: 'underline' }} onClick={() => showCartHandler()}>
                  {' '}
                  Корзина
                  {' '}
                </NavItem>

              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            {!user?.name ? (
              <>
                <h6>Ссылки на вход</h6>
                <ul className="footer-links">
                  <li className="cart_btn_foot"><NavItem style={{ textDecoration: 'underline' }} onClick={() => showSigninHandler()}>Авторизация</NavItem></li>
                  <li className="cart_btn_foot"><NavItem style={{ textDecoration: 'underline' }} onClick={() => showSignupHandler()}>Регистрация</NavItem></li>
                </ul>
              </>
            ) : (
              <>
                <h6>Ссылка на выход</h6>
                <ul className="footer-links">
                  <li>
                    <Button
                      className="but_log_out"
                      onClick={() => logoutHandler()}
                    >
                      Выйти
                    </Button>
                  </li>
                </ul>
              </>

            )}

          </div>

        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2022.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <Link as={Link} className="facebook" style={{ textDecoration: 'none' }} to="/#">
                  <i className="fa fa-facebook" />
                  G
                </Link>
              </li>
              <li>
                <Link as={Link} className="twitter" style={{ textDecoration: 'none' }} to="/#">
                  <i className="fa fa-twitter" />
                  U
                </Link>
              </li>
              <li>
                <Link as={Link} className="dribbble" style={{ textDecoration: 'none' }} to="/#">
                  <i className="fa fa-dribbble" />
                  I
                </Link>
              </li>
              <li>
                <Link as={Link} className="linkedin" style={{ textDecoration: 'none' }} to="/#">
                  <i className="fa fa-linkedin" />
                  D
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
