import { Dispatch } from "react";
import { LikesService } from "../../API/LikesService";
import TweetsService from "../../API/TweetsService";
import UploadService from "../../API/UploadService";
import { INewTweet } from "../../types/INewTweet";
import { ITweet } from "../../types/ITweet";
import { Actions, ActionTypes } from "../../types/tweets";
import { ActionTypes as AuthActionTypes } from '../../types/auth'
import { authAddLike, authDeleteLike } from "./authActions";

//ACTIONS
export const setItems = (items: ITweet[]): ActionTypes => (
   { type: Actions.SET_ITEMS, payload: items }
)

export const addItem = (item: ITweet): ActionTypes => (
   { type: Actions.ADD_ITEM, payload: item }
)

export const deleteItem = (id: string): ActionTypes => (
   { type: Actions.DELETE_ITEM, payload: id }
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

export const fetchLike = (): ActionTypes => (
   { type: Actions.FETCH_LIKE }
)

export const createLike = (user: string, tweet: string): ActionTypes => (
   { type: Actions.CREATE_LIKE, payload: { user, tweet } }
)

export const deleteLike = (user: string, tweet: string): ActionTypes => (
   { type: Actions.DELETE_LIKE, payload: { user, tweet } }
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

export const createNewTweet = (data: INewTweet) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         let images;

         if (data.images.length) {
            images = await UploadService.uploadImages(data.images)
         }

         const res = await TweetsService.addNewTweet(data.text, images);

         dispatch(addItem(res));
      } catch (err: any) {
         dispatch(setFormError(err.message))
      }
   }
}

export const deeleteTweet = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(deleteItem(id));

         await TweetsService.deleteTweet(id);
      } catch (err: any) {
         dispatch(setFormError(err.message))
      }
   }
}

export const fetchCreateLike = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes | AuthActionTypes>) => {
      try {
         dispatch(fetchLike())

         const res = await LikesService.like(id);

         dispatch(createLike(res, id))
         dispatch(authAddLike(id))
      } catch (err: any) {
         console.log(err.message)
      }
   }
}

export const fetchDeleteLike = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes | AuthActionTypes>) => {
      try {
         dispatch(fetchLike())

         const res = await LikesService.like(id);

         dispatch(deleteLike(res, id))
         dispatch(authDeleteLike(id))
      } catch (err: any) {
         console.log(err.message)
      }
   }
}