import initState from '../initState';

/* eslint-disable default-param-last */
const placemarksReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_PLACEMARKS':
      return payload;

    case 'SET_ONE_PLACEMARKS':
      return payload;

    default:
      return state;
  }
};

export default placemarksReducer;
