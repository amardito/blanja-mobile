import {authLoginType, authLogoutType} from '../actionType';

const defaultState = {
  isLogin: false,
};

const authReducer = (prevState = defaultState, action) => {
  // console.log(defaultState());
  switch (action.type) {
    case authLoginType:
      return {
        ...prevState,
        isLogin: true,
      };

    case authLogoutType:
      return {
        ...prevState,
        isLogin: false,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
