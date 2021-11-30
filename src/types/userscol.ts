import { IUser } from "./IUser";

export enum Actions {
   SET_IS_LOADING = 'users/SET_IS_LOADING',
   SET_ITEMS = 'users/SET_ITEMS',
   SET_ERROR = 'users/SET_ERROR',
}

export interface IState {
   items: IUser[],
   isLoading: boolean,
   error: string | null
}

export interface setItems {
   type: Actions.SET_ITEMS,
   payload: IUser[],
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string,
}

export type ActionTypes = setItems | setIsLoading | setError;