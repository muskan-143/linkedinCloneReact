import { GET_LIKE } from "../actions/actionType";

const INITIAL_STATE = 0;

const likeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIKE:
      return {
        ...state,
        like: action.like + 1,
      };

    default:
      return state;
  }
};

export default likeReducer;
