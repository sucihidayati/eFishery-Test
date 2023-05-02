import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { loadState, saveState } from "../libs/localStorage";
import reducer from "../redux/reducers";

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
