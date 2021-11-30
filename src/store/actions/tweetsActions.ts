import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import { ITweet } from "../../types/ITweet";
import { Actions, ActionTypes } from "../../types/tweets";

//ACTIONS
export const setItems = (items: ITweet[]): ActionTypes => (
   { type: Actions.SET_ITEMS, payload: items }
)

export const addItem = (item: ITweet): ActionTypes => (
   { type: Actions.ADD_ITEM, payload: item }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getTweets = () => {
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

export const createNewTweet = (text: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await TweetsService.addNewTweet(text);
         console.log(res)
         dispatch(addItem(res));
      } catch (err) {
         console.log(err)
      }
   }
}