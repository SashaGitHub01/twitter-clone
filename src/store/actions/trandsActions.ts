import { Dispatch } from "react";
import TrandsService from "../../API/TrandsService";
import { Actions, ActionTypes, ITrand } from "../../types/trands";

//ACTIONS
export const setItems = (items: ITrand[]): ActionTypes => (
   { type: Actions.SET_ITEMS, payload: items }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getTrands = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await TrandsService.fetchTrands();

         dispatch(setItems(res));
      } catch (err: any) {
         dispatch(setError(err.message));
      }
   }
}