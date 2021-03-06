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
        idUser: action.idUser,
      };

    case authLogoutType:
      return {
        ...prevState,
        isLogin: false,
        level: null,
        idUser: null,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
