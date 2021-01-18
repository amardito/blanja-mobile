import {combineReducers} from 'redux';

import authReducer from './auth';
import productReducer from './product';
import mybagReducer from './bag';
import checkoutReducer from './checkout';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  bag: mybagReducer,
  checkout: checkoutReducer,
});

export default reducers;
