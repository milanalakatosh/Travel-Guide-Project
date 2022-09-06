/* eslint-disable default-param-last */
import initState from '../initState';

const arrYandexMapReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_YANDEX_MAP':
      return [...state, payload];
    default:
      return state;
  }
};

export default arrYandexMapReducer;
