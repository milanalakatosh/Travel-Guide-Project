/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartFooter from '../CartFooter/CartFooter';
import CartHeader from '../CartHeader/CartHeader';
import ProductCart from '../ProductCart/ProductCart';

export default function MainCart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const changeValue = (id, value) => {
    dispatch({
      type: 'SET_CHANGE_VALUE_INPUT_CART',
      payload: cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: value,
            priceTotal: value * product.price,
          };
        }
        return product;
      }),
    });
  };

  return (
    <section className="cart">
      <CartHeader />
      {cart.length > 0
        ? cart.map((product) => (
          <ProductCart
            product={product}
            key={product.id}
            changeValue={changeValue}
          />
        ))

        : (
          <div style={{
            fontSize: '20px', display: 'flex', justifyContent: 'center', color: '#6c757d',
          }}
          >
            В корзине ничего нет :(
          </div>
        )}
      <CartFooter />
    </section>
  );
}
