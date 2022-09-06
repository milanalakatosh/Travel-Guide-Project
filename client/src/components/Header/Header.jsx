/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, NavbarBrand } from 'react-bootstrap';
import style from './Header.module.css';
import MenuItems from './MenuItems/MenuItems';

export default function Header() {
  const dispatch = useDispatch();
  // const [checked, setChecked] = useState('false');
  // Работаем с localStorage
  useEffect(() => {
    const userLocalStorage = localStorage.getItem('UserId');
    if (userLocalStorage) {
      axios.get(`http://localhost:3001/auth/${userLocalStorage}`, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: 'SET_USER', payload: response.data });
            // setChecked('true');
          } else {
            // setChecked('true');
          }
        })
        .catch((res) => {
          if (res.response.status === 409) {
            localStorage.clear();
            // setChecked('true');
          }
        });
    }
  }, []);

  return (

    <header className={style.my_header}>
      <div className={style.container}>
        <div className={style.header_inner}>
          <NavbarBrand className={style.header_logo} as={Link} to="/">
            <div className={style.logo}>
              <div className={style.head} />
              <div className={style.mask} />
              <div className={style.eye} />
              <div className={style.beak} />
            </div>
            <div>Travel Guide</div>
          </NavbarBrand>
          <nav className={style.my_nav}>
            <Nav.Link className={style.my_nav_link} as={Link} to="/">Главная</Nav.Link>
            <Nav.Link className={style.my_nav_link} as={Link} to="/posts">Блог</Nav.Link>
            <Nav.Link className={style.my_nav_link} as={Link} to="/excursions">Экскурсии</Nav.Link>
            <Nav.Link className={style.my_nav_link} as={Link} to="/map">Карта</Nav.Link>
            <MenuItems />
            {/* {checked === 'true' ? <MenuItems />
						  : <></>} */}
          </nav>
        </div>
      </div>
    </header>

  );
}
