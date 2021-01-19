import {
  getCheckout,
  clearCheckout,
  getCheckoutAddress,
  deleteCheckoutAddress,
} from '../actionType';
import AsyncStorage from '@react-native-community/async-storage';

export const getCheckoutAction = () => {
  return {
    type: getCheckout,
    payload: AsyncStorage.getItem('checkout'),
  };
};

export const getCheckoutAddressAction = (data) => {
  return {
    type: getCheckoutAddress,
    payload: data,
  };
};

export const deleteCheckoutAddressAction = () => {
  return {
    type: deleteCheckoutAddress,
  };
};

export const clearCheckoutAction = () => {
  return {
    type: clearCheckout,
    payload: AsyncStorage.removeItem('checkout'),
  };
};
