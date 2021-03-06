import {ActionType} from 'redux-promise-middleware';

export const authLoginType = 'AUTH_LOGIN';
export const authLogoutType = 'AUTH_LOGOUT';
export const getNewProduct = 'GET_NEW_PRODUCT';
export const getPopularProduct = 'GET_POPULAR_PRODUCT';
export const getSingleProduct = 'GET_SINGLE_PRODUCT';
export const getMyBag = 'GET_WISHLIST_PRODUCT';
export const clearMyBag = 'CLEAR_WISHLIST_PRODUCT';
export const getCheckout = 'GET_CHECKOUT_ORDER';
export const getCheckoutAddress = 'GET_CHECKOUT_ADDRESS';
export const deleteCheckoutAddress = 'DELETE_CHECKOUT_ADDRESS';
export const clearCheckout = 'cLEAR_CHECKOUT_ORDER';
export const getMyAddress = 'GET_USER_ADDRESS';

export const pending = `_${ActionType.Pending}`;
export const rejected = `_${ActionType.Rejected}`;
export const fulfilled = `_${ActionType.Fulfilled}`;
