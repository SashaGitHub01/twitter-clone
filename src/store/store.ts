import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import trandsReducer from "./reducers/trands";
import tweetsReducer from "./reducers/tweets";
import userscolReducer from "./reducers/userscol";
import currentTweetReducer from "./reducers/currentTweet";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
   tweets: tweetsReducer,
   trands: trandsReducer,
   userscol: userscolReducer,
   currentTweet: currentTweetReducer,
   auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store;