import { ActionTypes, Actions, IState } from "../../types/currentTweet";

const initialState: IState = {
   tweet: null,
   isLoading: false,
   error: ''
}

const currentTweetReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case Actions.SET_TWEET:
         return {
            ...state,
            tweet: action.payload,
            isLoading: false
         }

      case Actions.SET_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false
         }

      case Actions.SET_IS_LOADING:
         return {
            ...state,
            isLoading: true
         }

      default:
         return state;
   }
}

export default currentTweetReducer;