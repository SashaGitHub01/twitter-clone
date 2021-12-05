import { IUser } from "./IUser";

export enum Actions {
   SET_PROFILE = 'currentUser/SET_TWEET',
   SET_IS_LOADING = 'currentUser/SET_IS_LOADING',
   SET_ERROR = 'currentUser/SET_ERROR',
}


export interface IState {
   profile: IUser | null,
   error: string,
   isLoading: boolean
}

export interface setProfile {
   type: Actions.SET_PROFILE,
   payload: IUser
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export type ActionTypes = setProfile | setError | setIsLoading;