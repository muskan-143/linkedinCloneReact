import { combineReducers } from "redux";

import userReducer from "./userReducer";
import articleReducer from "./articleReducer";
import likeReducer from "./likeReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
  likeState: likeReducer,
});

export default rootReducer;
