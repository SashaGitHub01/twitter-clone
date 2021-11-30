import { Dispatch } from "react";
import UsersService from "../../API/UsersService";
import { IUser } from "../../types/IUser";
import { Actions, ActionTypes } from "../../types/userscol";

//ACTIONS
export const setItems = (items: IUser[]): ActionTypes => (
   { type: Actions.SET_ITEMS, payload: items }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getUsers = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await UsersService.fetchColUsers();

         dispatch(setItems(res));
      } catch (err: any) {
         dispatch(setError(err.message));
      }
   }
}