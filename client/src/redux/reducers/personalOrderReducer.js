import initState from '../initState';

/* eslint-disable default-param-last */
const personalOrderReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_PERSONAL_ORDER':
      return payload;
    default:
      return state;
  }
};

export default personalOrderReducer;
