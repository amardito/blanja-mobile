import {combineReducers} from 'redux';

import authReducer from './auth';
import productReducer from './product';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
});

export default reducers;
