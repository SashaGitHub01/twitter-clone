import { IUser } from "./IUser";

export enum Actions {
   SET_USER = 'auth/SET_USER',
   SET_IS_LOADING = 'auth/SET_IS_LOADING',
   SET_ERROR = 'auth/SET_ERROR',
   SET_SIGNIN_ERROR = 'auth/SET_SIGNIN_ERROR',
   SET_SIGNUP_ERROR = 'auth/SET_SIGNUP_ERROR',
   CLOSE_MODAL = 'auth/CLOSE_MODAL',
   REMOVE_USER = 'auth/REMOVE_USER',
   ADD_LIKE = 'auth/ADD_LIKE',
   DELETE_LIKE = 'auth/DELETE_LIKE',
   EDIT_AVATAR = 'auth/EDIT_AVATAR',
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

export interface addLike {
   type: Actions.ADD_LIKE,
   payload: string
}

export interface editAvatar {
   type: Actions.EDIT_AVATAR,
   payload: string
}

export interface deleteLike {
   type: Actions.DELETE_LIKE,
   payload: string
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
   | removeUser
   | addLike
   | deleteLike;