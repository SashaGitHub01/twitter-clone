import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import { Actions, ActionTypes } from "../../types/currentTweet";
import { ITweet } from "../../types/tweets";

//ACTIONS
export const setTweet = (tweet: ITweet): ActionTypes => (
   { type: Actions.SET_TWEET, payload: tweet }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getTweet = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await TweetsService.fetchOneTweet(id);

         dispatch(setTweet(res));
      } catch (err: any) {
         dispatch(setError(err.message));
      }
   }
}