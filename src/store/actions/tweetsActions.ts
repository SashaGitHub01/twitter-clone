import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import { Actions, ActionTypes, ITweet } from "../../types/tweets";

//ACTIONS
export const setItems = (items: ITweet[]): ActionTypes => (
   { type: Actions.SET_ITEMS, payload: items }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getItems = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await TweetsService.fetchTweets();

         dispatch(setItems(res));
      } catch (err: any) {
         dispatch(setError(err.message));
      }
   }
}