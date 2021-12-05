import { Actions, IState, ActionTypes } from "../../types/tweets";

const initialState: IState = {
   items: [],
   isLoading: false,
   formError: null,
   error: null,
}

const tweetsReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case Actions.SET_ITEMS:
         return {
            ...state,
            isLoading: false,
            items: action.payload,
            error: null,
            formError: null
         }

      case Actions.ADD_ITEM:
         let newItems;

         if (!state.items.length) {
            newItems = [action.payload];
         } else {
            newItems = [action.payload, ...state.items]
         }

         return {
            ...state,
            formError: null,
            error: null,
            items: newItems,
         }

      case Actions.DELETE_ITEM:
         return {
            ...state,
            items: state.items.filter((item) => item._id !== action.payload)
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

      case Actions.SET_FORM_ERROR:
         return {
            ...state,
            isLoading: false,
            formError: action.payload,
         }


      default:
         return state;
   }
}

export default tweetsReducer;