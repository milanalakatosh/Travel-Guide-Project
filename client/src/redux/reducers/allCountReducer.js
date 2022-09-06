import initState from '../initState';

/* eslint-disable default-param-last */
const allCountReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_COUNT':
      return payload;

    case 'SET_INCREASE_COUNT':
      return (state + payload);

    case 'SET_DECREASE_COUNT':
      return (state - payload);

    default:
      return state;
  }
};

export default allCountReducer;
