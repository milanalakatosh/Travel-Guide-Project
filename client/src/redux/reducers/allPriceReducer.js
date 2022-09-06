import initState from '../initState';

/* eslint-disable default-param-last */
const allPriceReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_PRICE':
      return payload;

    case 'SET_INCREASE_PRICE':
      return (state + payload);

    case 'SET_DECREASE_PRICE':
      return (state - payload);

    default:
      return state;
  }
};

export default allPriceReducer;
