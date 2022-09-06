import initState from '../initState';

/* eslint-disable default-param-last */
const signinReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_INPUT_SIGNIN':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default signinReducer;
