import { combineReducers } from 'redux';
import signinReducer from './signinReducer';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import postsReducer from './postsReducer';
import onePostReducer from './onePostReducer';
import excursionsReducer from './excursionsReducer';
import oneExcursionReducer from './oneExcursionReducer';
import cartReducer from './cartReducer';
import excurCommentReducer from './excurCommentReducer';
import postCommentReduser from './postCommentReduser';
import showSignUpReducer from './showSignUpReducer';
import showSignInReducer from './showSignInReducer';
import showCartReducer from './showCartReducer';
import allCountReducer from './allCountReducer';
import allPriceReducer from './allPriceReducer';
import yandexMapsReducer from './yandexMapsReducer';
import arrYandexMapReducer from './arrYandexMapReducer';
import placemarksReducer from './placemarksReducer';
import showModalInfoPostReducer from './showModalInfoPost';
import showModalInfoExcursionReducer from './showModalInfoExcursion';
import showOrderModalReducer from './showOrderModalReducer';
import personalOrderReducer from './personalOrderReducer';

const rootReducer = combineReducers({
  user: userReducer,
  inputSignup: signupReducer,
  inputSignin: signinReducer,
  posts: postsReducer,
  post: onePostReducer,
  excursions: excursionsReducer,
  excursion: oneExcursionReducer,
  cart: cartReducer,
  commentsExcursions: excurCommentReducer,
  commentsPosts: postCommentReduser,
  showSignUp: showSignUpReducer,
  showSignIn: showSignInReducer,
  showCart: showCartReducer,
  showPost: showModalInfoPostReducer,
  showExcursion: showModalInfoExcursionReducer,
  showOrderModal: showOrderModalReducer,
  allPrice: allPriceReducer,
  allCount: allCountReducer,
  yandexMaps: yandexMapsReducer,
  arrYandexMap: arrYandexMapReducer,
  placemarks: placemarksReducer,
  personalOrder: personalOrderReducer,
});

export default rootReducer;
