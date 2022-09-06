import initState from '../initState';

/* eslint-disable default-param-last */
const cartReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CART':
      return payload;

    case 'SET_ADD_CART':
      return [...state, payload];

    case 'SET_ADD_CART_DELETE':
      return payload;

    case 'SET_INCREASE_CART':
      return payload;

    case 'SET_DECREASE_CART':
      return payload;

    case 'SET_CHANGE_VALUE_INPUT_CART':
      return payload;

    default:
      return state;
  }
};

export default cartReducer;
