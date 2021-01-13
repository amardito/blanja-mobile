import {ActionType} from 'redux-promise-middleware';

export const authLoginType = 'AUTH_LOGIN';
export const authLogoutType = 'AUTH_LOGOUT';
export const getNewProduct = 'GET_NEW_PRODUCT';
export const getPopularProduct = 'GET_POPULAR_PRODUCT';
export const getSingleProduct = 'GET_SINGLE_PRODUCT';
export const getMyBag = 'GET_WISHLIST_PRODUCT';

export const pending = `_${ActionType.Pending}`;
export const rejected = `_${ActionType.Rejected}`;
export const fulfilled = `_${ActionType.Fulfilled}`;
