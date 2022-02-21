import { ActionTypes, Actions, IState } from "../../types/currentTweet";

const initialState: IState = {
   tweet: null,
   isLoading: false,
   error: '',
   isFetchingLike: false,
}

const currentTweetReducer = (state = initialState, action: ActionTypes): IState => {
   switch (action.type) {
      case Actions.SET_TWEET:
         return {
            ...state,
            tweet: action.payload,
            isLoading: false,
            error: '',
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

      case Actions.DELETE_COMMENT:
         if (!state.tweet) return state

         return {
            ...state,
            tweet: {
               ...state.tweet,
               comments: state.tweet.comments.filter(({ _id }) => {
                  return _id !== action.payload
               })
            }
         }

      case Actions.CREATE_COMMENT:
         if (!state.tweet) return state

         return {
            ...state,
            tweet: {
               ...state.tweet,
               comments: [...state.tweet.comments, action.payload]
            }
         }

      case Actions.FETCH_LIKE:
         return {
            ...state,
            isFetchingLike: true
         }

      case Actions.CREATE_LIKE:
         if (!state.tweet) return state

         return {
            ...state,
            isFetchingLike: false,
            tweet: {
               ...state.tweet,
               likes: [...state.tweet.likes, action.payload]
            }
         }

      case Actions.DELETE_LIKE:
         if (!state.tweet) return state

         return {
            ...state,
            isFetchingLike: false,
            tweet: {
               ...state.tweet,
               likes: state.tweet.likes.filter((like) => {
                  return like !== action.payload
               })
            }
         }

      default:
         return state;
   }
}

export default currentTweetReducer;