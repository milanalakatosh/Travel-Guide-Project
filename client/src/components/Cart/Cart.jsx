import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainCart from './MainCart/MainCart';
import Title from './Title/Title';

import style from './Section-cart.module.css';

export default function Cart() {
  const navigate = useNavigate();
  // Стейт модульного окна
  const showCart = useSelector((state) => state.showCart);
  // useEffect(() => {
  //   dispatch({ type: 'SET_CHANGE_SHOW', payload: true });
  // }, []);
  const dispatch = useDispatch();

  // Закрывает модальное окно
  const handleClose = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_CART', payload: !showCart });
  };

  const navigateToOrder = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_CART', payload: !showCart });
    navigate('./order');
  };
  return (
  // <section className="section-cart">
  //   <header className="section-cart__header">
  //     <div className="container">
  //       <Title />
  //     </div>
  //   </header>
  //   <div className="section-cart__body">
  //     <div className="container" />
  //     <MainCart />
  //   </div>
  // </section>

    <div>
      <Modal show={showCart} onHide={handleClose}>

        <Modal.Header closeButton className={style.section_cart__header}>
          <Modal.Title className={style.container}><Title /></Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.container}>

          <MainCart />

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Выйти
          </Button>
          <Button onClick={() => navigateToOrder()} type="submit" variant="secondary" className="btn btn-primary login-email-pass-but">
            Оформить заказ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
