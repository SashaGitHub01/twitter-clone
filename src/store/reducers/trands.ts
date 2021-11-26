import { Actions, IState, ActionTypes } from "../../types/trands";

const initialState: IState = {
   items: [],
   isLoading: false,
   error: null,
}

const trandsReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case Actions.SET_ITEMS:
         return {
            ...state,
            isLoading: false,
            items: action.payload,
         }

      case Actions.SET_IS_LOADING:
         return {
            ...state,
            isLoading: true,
         }

      case Actions.SET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         }


      default:
         return state;
   }
}

export default trandsReducer;