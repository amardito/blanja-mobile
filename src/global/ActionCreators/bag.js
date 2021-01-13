import {getMyBag, clearMyBag} from '../actionType';
import AsyncStorage from '@react-native-community/async-storage';

export const getMyBagAction = () => {
  return {
    type: getMyBag,
    payload: AsyncStorage.getItem('belanjaUser'),
  };
};

export const clearMyBagAction = () => {
  return {
    type: clearMyBag,
    payload: AsyncStorage.removeItem('belanjaUser'),
  };
};
