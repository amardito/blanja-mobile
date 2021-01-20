import {authLoginType, authLogoutType} from '../actionType';

const defaultState = {
  isLogin: false,
};

const authReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case authLoginType:
      return {
        ...prevState,
        isLogin: true,
        level: action.level,
      };

    case authLogoutType:
      return {
        ...prevState,
        isLogin: false,
        level: null,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
