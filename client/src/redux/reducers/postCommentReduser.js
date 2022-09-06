import initState from '../initState';

/* eslint-disable default-param-last */
const postCommentReduser = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_POSTCOMMENT':
      return payload;
    case 'ADD_POSTCOMMENT':
      return [...state, payload];
    default:
      return state;
  }
};

export default postCommentReduser;
