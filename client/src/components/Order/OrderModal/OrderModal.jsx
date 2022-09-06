import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import style from './OrderModal.module.css';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showOrderModal = useSelector((state) => state.showOrderModal);

  // Закрывает модальное окно
  const handleClose = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_ORDER', payload: !showOrderModal });
  };

  const showExcursionsHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_ORDER', payload: !showOrderModal });
    dispatch({ type: 'SET_CART', payload: [] });
    navigate('/excursions');
  };

  return (
    <div>
      <Modal className={style.modal_container} show={showOrderModal} onHide={handleClose}>
        <Modal.Header closeButton className={style.title_text} />
        <Modal.Title className={style.title_text}>
          Заказ подтвержден и отправлен в обработку
        </Modal.Title>
        <span className={style.span_text}>
          Выбрать еще
          {' '}
          <Button
            className={style.btn}
            onClick={() => showExcursionsHandler()}
          >
            экскурсии
          </Button>
        </span>
      </Modal>
    </div>
  );
}
