import { Dispatch } from "react";
import AuthService from "../../API/AuthService";
import { Actions, ActionTypes } from "../../types/auth";
import { ISignIn, ISignUp } from "../../types/AuthTypes";
import { IUser } from "../../types/IUser";

export const setUser = (user: IUser): ActionTypes => (
   { type: Actions.SET_USER, payload: user }
)

export const authAddLike = (id: string): ActionTypes => (
   { type: Actions.ADD_LIKE, payload: id }
)

export const authDeleteLike = (id: string): ActionTypes => (
   { type: Actions.DELETE_LIKE, payload: id }
)

export const closeModal = (): ActionTypes => (
   { type: Actions.CLOSE_MODAL }
)

export const setError = (err: any): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

export const removeUser = (): ActionTypes => (
   { type: Actions.REMOVE_USER }
)

export const setSignInError = (err: any): ActionTypes => (
   { type: Actions.SET_SIGNIN_ERROR, payload: err }
)

export const setSignUpError = (err: any): ActionTypes => (
   { type: Actions.SET_SIGNUP_ERROR, payload: err }
)

export const setIsLoading = (bool: boolean): ActionTypes => (
   { type: Actions.SET_IS_LOADING, payload: bool }
)

//thunks
export const authMe = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading(true));

         const res = await AuthService.authMe();

         if (!res) {
            return dispatch(setIsLoading(false));;
         }

         return dispatch(setUser(res));

      } catch (err) {
         dispatch(setError(err))
      }
   }
}

export const signIn = (data: ISignIn) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await AuthService.signIn(data);

         if (!res) {
            return dispatch(setSignInError('error'));
         }

         return dispatch(setUser(res));

      } catch (err) {
         dispatch(setSignInError(err));
      }
   }
}

export const signUp = (data: ISignUp) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await AuthService.signUp(data);

         if (!res) {
            return dispatch(setSignUpError('error'));
         }

         return dispatch(setUser(res));

      } catch (err) {
         dispatch(setSignUpError(err));
      }
   }
}

export const logout = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(removeUser());

         await AuthService.logout();
      } catch (err) {
         dispatch(setSignUpError(err));
      }
   }
}