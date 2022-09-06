/* eslint-disable default-param-last */
import initState from '../initState';

const yandexMapsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_INPUT_YANDEX_MAP':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default yandexMapsReducer;
