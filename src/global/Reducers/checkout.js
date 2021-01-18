import {
  getCheckout,
  clearCheckout,
  pending,
  fulfilled,
  rejected,
} from '../actionType';

const defaultState = {
  data: [],
};

const checkoutReducer = (prevState = defaultState, action) => {
  // console.log(action.payload);
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

    default:
      return {
        ...prevState,
      };
  }
};

export default checkoutReducer;
