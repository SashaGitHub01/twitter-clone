import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import UploadService from "../../API/UploadService";
import { INewTweet } from "../../types/INewTweet";
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

export const setFormError = (err: string): ActionTypes => (
   { type: Actions.SET_FORM_ERROR, payload: err }
)

//THUNKS
export const getTweets = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await TweetsService.fetchTweets();

         dispatch(setItems(res));
      } catch (err: any) {
         dispatch(setError('error'));
      }
   }
}

export const createNewTweet = (data: INewTweet) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         let images;

         if (data.images.length) {
            images = await UploadService.uploadImages(data.images)
         }

         const res = await TweetsService.addNewTweet(data.text, images);

         dispatch(addItem(res));
      } catch (err) {
         dispatch(setFormError('error'))
      }
   }
}