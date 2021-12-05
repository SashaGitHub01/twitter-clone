import { IUser } from "./IUser";

export enum Actions {
   SET_USER = 'SET_USER',
   SET_IS_LOADING = 'SET_IS_LOADING',
   SET_ERROR = 'SET_ERROR',
   SET_SIGNIN_ERROR = 'SET_SIGNIN_ERROR',
   SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR',
   CLOSE_MODAL = 'CLOSE_MODAL',
   REMOVE_USER = 'REMOVE_USER'
}

export interface IState {
   user: IUser | null,
   isLoading: boolean,
   isAuth: boolean,
   error: any,
   signInError: any,
   signUpError: any,
}

export interface setUser {
   type: Actions.SET_USER,
   payload: IUser
}

export interface setError {
   type: Actions.SET_ERROR,
   payload: string
}

export interface removeUser {
   type: Actions.REMOVE_USER,
}


export interface setSignInError {
   type: Actions.SET_SIGNIN_ERROR,
   payload: any
}

export interface setSignUpError {
   type: Actions.SET_SIGNUP_ERROR,
   payload: any
}

export interface setIsLoading {
   type: Actions.SET_IS_LOADING,
   payload: boolean
}

export interface closeModal {
   type: Actions.CLOSE_MODAL,
}

export type ActionTypes = setUser
   | setIsLoading
   | setError
   | setSignInError
   | setSignUpError
   | closeModal
   | removeUser;