import axios from 'axios';
import {getMyAddress} from '../actionType';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
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
