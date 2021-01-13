import {combineReducers} from 'redux';

import authReducer from './auth';
import productReducer from './product';
import mybagReducer from './bag';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  bag: mybagReducer,
});

export default reducers;
