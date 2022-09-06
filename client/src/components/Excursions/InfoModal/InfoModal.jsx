import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import style from './InfoModal.module.css';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showExcursion = useSelector((state) => state.showExcursion);

  // Закрывает модальное окно
  const handleClose = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_EXCURSION', payload: !showExcursion });
  };

  const showExcursionsHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_EXCURSION', payload: !showExcursion });
    navigate('/excursions');
  };

  return (
    <div>
      <Modal className={style.modal_container} show={showExcursion} onHide={handleClose}>
        <Modal.Header className={style.title_text} />
        <Modal.Title className={style.title_text}>Экскурсия опубликована</Modal.Title>
        <span className={style.span_text}>
          Посмотреть все
          {' '}
          <Button
            style={{
              color: '#2a69e0', fontSize: 'inherit', fontWeight: '100', display: 'contents',
            }}
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
