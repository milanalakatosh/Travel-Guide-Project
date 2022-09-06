import initState from '../initState';

/* eslint-disable default-param-last */
const onePostReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_POST':
      return payload;

    case 'DELETE_POST':
      return [...state, payload];

    default:
      return state;
  }
};

export default onePostReducer;
