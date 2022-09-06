import initState from '../initState';

/* eslint-disable default-param-last */
const oneExcursionReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_EXCURSION':
      return payload;
    default:
      return state;
  }
};

export default oneExcursionReducer;
