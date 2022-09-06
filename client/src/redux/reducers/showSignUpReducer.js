import initState from '../initState';

/* eslint-disable default-param-last */
const showSignUpReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHANGE_SHOW_SIGNUP':
      return payload;

    default:
      return state;
  }
};

export default showSignUpReducer;
