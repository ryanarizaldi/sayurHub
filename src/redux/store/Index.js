import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/Reducer";
import reducerCart from "../reducer/ReducerCart";
import reducerDiscussion from "../reducer/ReducerDiscussion";

const rootReducer = combineReducers({
  index: reducer,
  cart: reducerCart,
  discussion: reducerDiscussion,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export default store;
