export enum Actions {
   SET_IS_LOADING = 'tweets/SET_IS_LOADING',
   SET_ITEMS = 'tweets/SET_ITEMS',
   SET_ERROR = 'tweets/SET_ERROR',
   DELETE_ITEM = 'tweets/DELETE_ITEM'
}

export interface ITweet {
   text: string,
   _id: string,
   user: {
      fullName: string,
      username: string,
      avatar_url: string
   }
}

export interface IState {
   items: ITweet[],
   isLoading: boolean,
   error: string | null
}

export interface setItems {
   type: Actions.SET_ITEMS,
   payload: ITweet[],
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string,
}

export type ActionTypes = setItems | setIsLoading | setError;