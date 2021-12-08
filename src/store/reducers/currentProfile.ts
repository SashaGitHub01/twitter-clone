import { ActionTypes, Actions, IState } from "../../types/currentProfile";

const initialState: IState = {
   profile: null,
   media: undefined,
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

      case Actions.SET_MEDIA:
         return {
            ...state,
            media: action.payload,
            isLoading: false
         }

      case Actions.EDIT_AVATAR:
         if (!state.profile) return state;

         return {
            ...state,
            profile: {
               ...state.profile,
               avatar_url: action.payload
            }
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