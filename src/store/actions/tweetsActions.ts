import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import { Actions, ActionTypes, ITweet } from "../../types/tweets";

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
      const tweet = {
         id: Math.random().toString(11).substring(2),
         _id: Math.random().toString(10).substring(1),
         text: text,
         created_at: new Date().toString(),
         user: {
            fullName: "Howard Armstrong",
            _id: "77712mgage",
            username: "Marisa",
            avatar_url: "https://source.unsplash.com/random/100x100?2"
         }
      }

      console.log(tweet)

      try {
         const res = await TweetsService.addNewTweet(tweet);
         console.log(res)
         dispatch(addItem(res));
      } catch (err) {
         console.log(err)
      }
   }
}