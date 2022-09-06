import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import style from './InfoModal.module.css';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showPost = useSelector((state) => state.showPost);

  // Закрывает модальное окно
  const handleClose = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_POST', payload: !showPost });
  };

  const showPostHandler = () => {
    dispatch({ type: 'SET_CHANGE_SHOW_POST', payload: !showPost });
    navigate('/posts');
  };

  return (
    <div>
      <Modal className={style.modal_container} show={showPost} onHide={handleClose}>
        <Modal.Header className={style.title_text} />
        <Modal.Title className={style.title_text}>Пост опубликован</Modal.Title>
        <span className={style.span_text}>
          Посмотреть все
          {' '}
          <Button
            style={{
              color: '#2a69e0', fontSize: 'inherit', fontWeight: '100', display: 'contents',
            }}
            className={style.btn}
            onClick={() => showPostHandler()}
          >
            посты
          </Button>
        </span>
      </Modal>
    </div>
  );
}
