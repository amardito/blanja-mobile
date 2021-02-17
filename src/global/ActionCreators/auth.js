import {authLoginType, authLogoutType} from '../actionType';

export const authLoginAction = (payloadLevel, payloadidUser) => {
  return {
    type: authLoginType,
    level: payloadLevel,
    idUser: payloadidUser,
  };
};

export const authLogoutAction = () => {
  return {
    type: authLogoutType,
  };
};
