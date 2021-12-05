import { ActionTypes, Actions, IState } from "../../types/currentProfile";

const initialState: IState = {
   profile: null,
   isLoading: false,
   error: ''
}

const currentProfileReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case Actions.SET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            isLoading: false
         }

      case Actions.SET_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false
         }

      case Actions.SET_IS_LOADING:
         return {
            ...state,
            isLoading: true
         }

      default:
         return state;
   }
}

export default currentProfileReducer;