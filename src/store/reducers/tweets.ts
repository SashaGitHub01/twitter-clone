import { Actions, IState, ActionTypes } from "../../types/tweets";

const initialState: IState = {
   items: [],
   isLoading: false,
   error: null,
}

const tweetsReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case Actions.SET_ITEMS:
         return {
            ...state,
            isLoading: false,
            items: action.payload,
         }

      case Actions.ADD_ITEM:
         let newItems;

         if (!state.items.length) {
            newItems = [action.payload];
         } else {
            newItems = [...state.items, action.payload]
         }

         return {
            ...state,
            items: newItems,
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

export default tweetsReducer;