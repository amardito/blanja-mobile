import {
  getNewProduct,
  getPopularProduct,
  getSingleProduct,
  pending,
  fulfilled,
  rejected,
} from '../actionType';

const defaultState = {
  newProduct: {},
  popularProduct: {},
  singleProduct: {},
  err: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const getProduct = (prevState = defaultState, action) => {
  switch (action.type) {
    case getNewProduct + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getNewProduct + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case getNewProduct + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        newProduct: action.payload.data.data,
      };

    case getPopularProduct + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getPopularProduct + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case getPopularProduct + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        popularProduct: action.payload.data.data,
      };

    case getSingleProduct + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getSingleProduct + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case getSingleProduct + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        singleProduct: action.payload.data.data,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default getProduct;
