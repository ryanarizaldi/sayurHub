import { createStore, compose, applyMiddleware, combineReducers  } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/Reducer";
import reducerCart from "../reducer/ReducerCart";
import reducerDiscussion from "../reducer/ReducerDiscussion";


const rootReducer = combineReducers({
	index: reducer,
	cart: reducerCart,
	discussion: reducerDiscussion
})

const allEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, allEnhancers);

export default store;
