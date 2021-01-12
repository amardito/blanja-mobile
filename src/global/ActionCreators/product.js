import axios from 'axios';
import {
  getNewProduct,
  getPopularProduct,
  getSingleProduct,
} from '../actionType';

const api = axios.create({
  baseURL: 'http://192.168.1.6:1010/api/v1/',
});

export const getNewProductAction = () => {
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
