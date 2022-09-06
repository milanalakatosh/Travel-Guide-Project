import initState from '../initState';

/* eslint-disable default-param-last */
const excursionsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_EXCURSIONS':
      return payload;

    case 'SET_ADD_EXCURSIONS':
      return [...state, payload];

    default:
      return state;
  }
};

export default excursionsReducer;
