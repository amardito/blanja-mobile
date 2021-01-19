import {
  getCheckout,
  clearCheckout,
  getCheckoutAddress,
  deleteCheckoutAddress,
  pending,
  fulfilled,
  rejected,
} from '../actionType';

const defaultState = {
  data: [],
  address: {},
};

const checkoutReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case getCheckout + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getCheckout + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case getCheckout + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: JSON.parse(action.payload),
      };

    case clearCheckout + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case clearCheckout + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case clearCheckout + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: [],
      };

    case getCheckoutAddress:
      return {
        ...prevState,
        address: action.payload,
      };

    case deleteCheckoutAddress:
      return {
        ...prevState,
        address: {},
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default checkoutReducer;
