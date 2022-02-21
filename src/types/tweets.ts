import { ITweet } from "./ITweet";

export enum Actions {
   SET_IS_LOADING = 'tweets/SET_IS_LOADING',
   SET_ITEMS = 'tweets/SET_ITEMS',
   SET_ERROR = 'tweets/SET_ERROR',
   DELETE_ITEM = 'tweets/DELETE_ITEM',
   ADD_ITEM = 'tweets/ADD_ITEM',
   SET_FORM_ERROR = 'tweets/SET_FORM_ERROR',
   CREATE_LIKE = 'tweets/CREATE_LIKE',
   DELETE_LIKE = 'tweets/DELETE_LIKE',
   FETCH_LIKE = 'tweets/FETCH_LIKE',
}

export interface IState {
   items: ITweet[],
   isLoading: boolean,
   formError: string | null,
   error: string | null,
   isFetchingLike: boolean,
}

export interface setItems {
   type: Actions.SET_ITEMS,
   payload: ITweet[],
}

export interface addItem {
   type: Actions.ADD_ITEM,
   payload: ITweet,
}

export interface deleteItem {
   type: Actions.DELETE_ITEM,
   payload: string,
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string,
}

export interface setFormError {
   type: Actions.SET_FORM_ERROR,
   payload: string,
}

export interface createLike {
   type: Actions.CREATE_LIKE,
   payload: { tweet: string, user: string },
}

export interface deleteLike {
   type: Actions.DELETE_LIKE,
   payload: { tweet: string, user: string },
}

export interface fetchLike {
   type: Actions.FETCH_LIKE,
}

export type ActionTypes = setItems
   | setIsLoading
   | setError
   | addItem
   | deleteItem
   | setFormError
   | createLike
   | deleteLike
   | fetchLike;