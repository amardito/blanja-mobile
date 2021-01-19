import {combineReducers} from 'redux';

import authReducer from './auth';
import productReducer from './product';
import mybagReducer from './bag';
import checkoutReducer from './checkout';
import addressReducer from './address';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  bag: mybagReducer,
  checkout: checkoutReducer,
  address: addressReducer,
});

export default reducers;
