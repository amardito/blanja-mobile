import {getCheckout, clearCheckout} from '../actionType';
import AsyncStorage from '@react-native-community/async-storage';

export const getCheckoutAction = () => {
  return {
    type: getCheckout,
    payload: AsyncStorage.getItem('checkout'),
  };
};

export const clearCheckoutAction = () => {
  return {
    type: clearCheckout,
    payload: AsyncStorage.removeItem('checkout'),
  };
};
