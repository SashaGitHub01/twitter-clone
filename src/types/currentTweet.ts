import { IComment } from "./IComment";
import { ITweet } from "./ITweet";

export enum Actions {
   SET_TWEET = 'currentTweet/SET_TWEET',
   SET_IS_LOADING = 'currentTweet/SET_IS_LOADING',
   SET_ERROR = 'currentTweet/SET_ERROR',
   DELETE_COMMENT = 'currentTweet/DELETE_COMMENT',
   CREATE_COMMENT = 'currentTweet/CREATE_COMMENT',
   CREATE_LIKE = 'currentTweet/CREATE_LIKE',
   DELETE_LIKE = 'currentTweet/DELETE_LIKE',
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

export interface createLike {
   type: Actions.CREATE_LIKE,
   payload: string
}

export interface deleteLike {
   type: Actions.DELETE_LIKE,
   payload: string
}

export interface createComment {
   type: Actions.CREATE_COMMENT,
   payload: IComment
}

export interface deleteComment {
   type: Actions.DELETE_COMMENT,
   payload: string
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export type ActionTypes = setTweet
   | setError
   | setIsLoading
   | deleteComment
   | createComment
   | deleteLike
   | createLike;