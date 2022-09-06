import initState from '../initState';

/* eslint-disable default-param-last */
const excurCommentReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_EXCURSIONCOMMENT':
      return payload;
    case 'ADD_EXCURSIONCOMMENT':
      return [...state, payload];
    default:
      return state;
  }
};

export default excurCommentReducer;
