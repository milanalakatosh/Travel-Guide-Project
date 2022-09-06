import initState from '../initState';

// eslint-disable-next-line default-param-last
const userReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      return payload;
    default:
      return state;
  }
};

export default userReducer;
