import initState from '../initState';

/* eslint-disable default-param-last */
const showOrderModalReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHANGE_SHOW_ORDER':
      return payload;

    default:
      return state;
  }
};

export default showOrderModalReducer;
