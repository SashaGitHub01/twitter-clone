import { ITweet } from "./ITweet";
import { IUser } from "./IUser";

export enum Actions {
   SET_PROFILE = 'currentUser/SET_TWEET',
   SET_IS_LOADING = 'currentUser/SET_IS_LOADING',
   SET_ERROR = 'currentUser/SET_ERROR',
   SET_MEDIA = 'currentUser/SET_MEDIAS',
   DELETE_COMMENT = 'currentUser/DELETE_COMMENT'
}


export interface IState {
   profile: IUser | null,
   error: string,
   media?: ITweet[],
   isLoading: boolean
}

export interface setProfile {
   type: Actions.SET_PROFILE,
   payload: IUser
}

export interface deleteComment {
   type: Actions.DELETE_COMMENT,
   payload: string
}

export interface setMedia {
   type: Actions.SET_MEDIA,
   payload: ITweet[]
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export type ActionTypes = setProfile
   | setError
   | setIsLoading
   | setMedia
   | deleteComment;