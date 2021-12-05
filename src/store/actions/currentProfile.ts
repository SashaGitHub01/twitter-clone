import { Dispatch } from "react";
import UsersService from "../../API/UsersService";
import { Actions, ActionTypes } from "../../types/currentProfile";
import { IUser } from "../../types/IUser";


//ACTIONS
export const setProfile = (user: IUser): ActionTypes => (
   { type: Actions.SET_PROFILE, payload: user }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getProfile = (username: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await UsersService.fetchUser(username);

         dispatch(setProfile(res));
      } catch (err: any) {
         dispatch(setError(err.message));
      }
   }
}