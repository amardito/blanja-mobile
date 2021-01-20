import {authLoginType, authLogoutType} from '../actionType';

export const authLoginAction = (payload) => {
  return {
    type: authLoginType,
    level: payload,
  };
};

export const authLogoutAction = () => {
  return {
    type: authLogoutType,
  };
};
