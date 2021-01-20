import axios from 'axios';
import {getMyAddress} from '../actionType';

const api = axios.create({
  baseURL: 'http://192.168.1.6:1010/api/v1/',
});

export const getMyAddressAction = (data) => {
  return {
    type: getMyAddress,
    payload: api.post('profile/useraddress', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  };
};
