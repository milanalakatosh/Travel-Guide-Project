import initState from '../initState';

/* eslint-disable default-param-last */
const showSignInReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHANGE_SHOW_SIGNIN':
      return payload;

    default:
      return state;
  }
};

export default showSignInReducer;
