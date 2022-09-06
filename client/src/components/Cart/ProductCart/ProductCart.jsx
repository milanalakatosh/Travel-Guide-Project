/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import CountCart from '../CountCart/CountCart';
import style from './ProductCart.module.css';

export default function ProductCart({
  product, changeValue,
}) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increase = (ID) => {
    dispatch({
      type: 'SET_INCREASE_CART',
      payload: cart.map((prod) => {
        if (prod.id === ID) {
          return {
            ...prod,
            count: Number(prod.count) + 1,
            priceTotal: Number(prod.count + 1) * prod.price,
          };
        }
        return prod;
      }),
    });
    dispatch({
      type: 'SET_INCREASE_PRICE',
      payload: product.price,
    });
    dispatch({
      type: 'SET_INCREASE_COUNT',
      payload: 1,
    });
  };

  const deleteProduct = (ID) => {
    dispatch({ type: 'SET_ADD_CART_DELETE', payload: cart.filter((prod) => prod.id !== ID) });
    dispatch({ type: 'SET_DECREASE_PRICE', payload: product.priceTotal });
    dispatch({ type: 'SET_DECREASE_COUNT', payload: product.count });
  };

  const decrease = (ID) => {
    if (product.count > 1) {
      dispatch({
        type: 'SET_DECREASE_CART',
        payload: cart.map((prod) => {
          if (prod.id === ID) {
            const newCount = Number(prod.count) - 1 > 1 ? Number(prod.count) - 1 : 1;
            return {
              ...prod,
              count: newCount,
              priceTotal: newCount * prod.price,
            };
          }
          return prod;
        }),
      });
      dispatch({
        type: 'SET_DECREASE_PRICE',
        payload: product.price,
      });
      dispatch({
        type: 'SET_DECREASE_COUNT',
        payload: 1,
      });
    } else {
      deleteProduct(ID);
    }
  };

  return (
    <section className={style.product}>
      <div className={style.product__title}>{product.title}</div>
      <div className={style.product__count}>
        <CountCart
          product={product}
          increase={increase}
          decrease={decrease}
          changeValue={changeValue}
        />
      </div>
      <div className={style.product__price}>
        {product.priceTotal}
      </div>
      <div style={{ marginLeft: '5px' }}>руб.</div>
      {/* <div className={style.product__controls}>
        <button style={{ border: 'none', background: '#fff' }} type="button" onClick={() => deleteProduct(product.id)}>
          {/* <img src="./img/icons/cross.svg" alt="Delete" /> */}
      {/* <CloseIcon /> */}
      {/* </button> */}
      {/* </div> */}
      {' '}
    </section>

  );
}
