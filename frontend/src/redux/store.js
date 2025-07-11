import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./features/auth-slice";
import gamesReducer from "./features/game-slice";

const rootReducer = combineReducers({
  games: gamesReducer,
  auth: authReducer
});


let enhancer;

if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger= (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

const store = configureStore()

export default store;
