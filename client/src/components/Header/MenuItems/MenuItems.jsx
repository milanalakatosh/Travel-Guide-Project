/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import axios from 'axios';
import {
  Button, NavDropdown, NavItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
// import PersonIcon from '@mui/icons-material/Person';
import style from '../Header.module.css';
import Signup from '../../Signup/Signup';
import Signin from '../../Signin/Signin';
import Cart from '../../Cart/Cart';

export default function MenuItems() {
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
    dispatch({ type: 'SET_PERSONAL_ORDER', payload: [] });
    localStorage.clear();
    navigate('/');
  };
  const user = useSelector((state) => state.user);

  const showCart = useSelector((state) => state.showCart);
  const showSignUp = useSelector((state) => state.showSignUp);
  const showSignIn = useSelector((state) => state.showSignIn);

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
    <>
      <div className="container">
        {!user?.name ? (
          <>
            <NavItem onClick={() => showSignupHandler()} className={style.my_nav_item}>
              Регистрация
            </NavItem>

            <NavItem onClick={() => showSigninHandler()} className={style.my_nav_item}>
              {' '}
              Авторизация
              {' '}
            </NavItem>
            <NavItem onClick={() => showCartHandler()} className={style.my_nav_item}>
              {' '}
              Корзина
              {' '}
            </NavItem>
          </>
        ) : (
          <nav className={style.my_nav}>
            <NavDropdown
              className={style.my_nav_link}
              title={
                <span className={style.my_nav_dropdown}>Личный кабинет</span>
						}
            >
              <NavDropdown.Item
                className={style.dropdown_nav_link}
                as={Link}
                to="/personal"
              >
                Персональные данные
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className={style.dropdown_nav_link}
                as={Link}
                to="/post"
              >
                Создать пост
              </NavDropdown.Item>
              <NavDropdown.Item
                className={style.dropdown_nav_link}
                as={Link}
                to="/excursion"
              >
                Создать Экскурсию
              </NavDropdown.Item>
            </NavDropdown>
            <NavItem onClick={() => showCartHandler()} style={{ margin: '0 30px 0 25px' }} className={style.my_nav_item}>
              {' '}
              Корзина
              {' '}
            </NavItem>
            <Button
              className={style.nav_btn}
              style={{
						  border: 'none',
						  backgroundColor: 'transparent',
						  color: '#668193',
						  display: 'contents',
						  fontSize: 'large',
              }}
              onClick={() => logoutHandler()}
            >
              {' '}
              <LogoutIcon />
              {' '}
            </Button>
          </nav>
        )}
      </div>
      {showSignUp ? <Signup /> : null}
      {showSignIn ? <Signin /> : null}
      {showCart ? <Cart /> : null}

    </>
  );
}
