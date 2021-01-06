import {authLoginType, authLogoutType} from '../actionType';
import AsyncStorage from '@react-native-community/async-storage';

const isLogin = async () => {
  try {
    console.log('initializing token: ');
    // console.log(await AsyncStorage.getItem('token'));
    const item = (await AsyncStorage.getItem('token')) === null ? false : true;
    return item;
  } catch (error) {
    // Error get data
    console.log(error);
  }
};

const defaultState = {
  isLogin: isLogin(),
};

const authReducer = (prevState = defaultState, action) => {
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
