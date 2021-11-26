import { ITweet } from "./tweets";

export enum Actions {
   SET_TWEET = 'currentUser/SET_TWEET',
   SET_IS_LOADING = 'currentUser/SET_IS_LOADING',
   SET_ERROR = 'currentUser/SET_ERROR',
}


export interface IState {
   tweet: ITweet | null,
   error: string,
   isLoading: boolean
}

export interface setTweet {
   type: Actions.SET_TWEET,
   payload: ITweet
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export type ActionTypes = setTweet | setError | setIsLoading;