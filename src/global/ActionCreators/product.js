import axios from 'axios';
import {
  getNewProduct,
  getPopularProduct,
  getSingleProduct,
} from '../actionType';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getNewProductAction = () => {
  console.log('URL ', BASE_URL);
  return {
    type: getNewProduct,
    payload: api.get('products?sortby=latest&sort=DESC'),
  };
};

export const getPopularProductAction = () => {
  return {
    type: getPopularProduct,
    payload: api.get('products?sortby=popular&sort=DESC'),
  };
};

export const getSingleProductAction = (params) => {
  return {
    type: getSingleProduct,
    payload: api.get(`product/${params}`),
  };
};
