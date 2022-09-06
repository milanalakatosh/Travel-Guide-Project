import initState from '../initState';

/* eslint-disable default-param-last */
const postsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_POSTS':
      return payload;

    case 'SET_ADD_POST':
      return [...state, payload];

    default:
      return state;
  }
};

export default postsReducer;
