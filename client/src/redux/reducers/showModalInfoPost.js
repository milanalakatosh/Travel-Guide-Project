import initState from '../initState';

/* eslint-disable default-param-last */
const showModalInfoPostReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHANGE_SHOW_POST':
      return payload;

    default:
      return state;
  }
};

export default showModalInfoPostReducer;
