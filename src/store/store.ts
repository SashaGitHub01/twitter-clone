import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import tweetsReducer from "./reducers/tweets";

const rootReducer = combineReducers({
   tweets: tweetsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store;