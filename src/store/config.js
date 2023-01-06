import { combineReducers, createStore } from "redux";

import { chairReducer } from "./reducers/chairReducer";

import { userReducer } from "./reducers/userReducer";

//rootReducer: reducer tổng
const rootReducer = combineReducers({
  chairReducer,
  userReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
