import initState from '../initState';

/* eslint-disable default-param-last */
const showCartReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHANGE_SHOW_CART':
      return payload;

    default:
      return state;
  }
};

export default showCartReducer;
