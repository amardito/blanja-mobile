import {
  getMyBag,
  clearMyBag,
  pending,
  fulfilled,
  rejected,
} from '../actionType';

const defaultState = {
  data: [],
};

const mybagReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case getMyBag + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getMyBag + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case getMyBag + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: JSON.parse(action.payload),
      };

    case clearMyBag + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case clearMyBag + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload,
      };
    case clearMyBag + fulfilled:
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

export default mybagReducer;
