import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/Reducer";

const allEnhancers = compose(
  applyMiddleware(thunk)
);

const store = createStore(reducer, allEnhancers);

export default store;