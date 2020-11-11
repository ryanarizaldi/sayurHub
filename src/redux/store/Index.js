import { createStore, compose, applyMiddleware, combineReducers  } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/Reducer";
import reducerCart from "../reducer/ReducerCart";


const rootReducer = combineReducers({
	index: reducer,
	cart: reducerCart
})

const allEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, allEnhancers);

export default store;
