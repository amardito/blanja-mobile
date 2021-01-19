import {getMyAddress, pending, fulfilled, rejected} from '../actionType';

const defaultState = {
  data: {},
  err: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const getAddress = (prevState = defaultState, action) => {
  switch (action.type) {
    case getMyAddress + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getMyAddress + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case getMyAddress + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data.data,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default getAddress;
