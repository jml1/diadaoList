import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  errors: errorReducer
});
