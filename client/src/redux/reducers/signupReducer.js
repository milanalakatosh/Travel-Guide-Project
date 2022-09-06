/* eslint-disable default-param-last */
import initState from '../initState';

const signupReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_INPUT_SIGNUP':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default signupReducer;
