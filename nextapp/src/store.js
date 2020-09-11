import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//handle async actions with redux
const middleware = [thunk];
//define initial state  
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

store.subscribe(() => console.log(store.getState()));

export default () => store;
