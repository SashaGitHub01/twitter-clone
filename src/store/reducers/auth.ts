import { IState, ActionTypes, Actions } from "../../types/auth";


const initialState: IState = {
   user: null,
   isLoading: true,
   isAuth: false,
   signInError: null,
   error: null,
   signUpError: null,
}

const authReducer = (state = initialState, action: ActionTypes) => {
   switch (action.type) {
      case Actions.SET_USER:
         return {
            ...state,
            user: action.payload,
            isLoading: false,
            isAuth: true,
            signInError: null,
            signUpError: null,
            error: null
         }

      case Actions.REMOVE_USER:
         return {
            ...state,
            user: null,
            isLoading: false,
            isAuth: false,
            signInError: null,
            signUpError: null,
            error: null
         }

      case Actions.CLOSE_MODAL:
         return {
            ...state,
            signInError: null,
            signUpError: null,
            error: null
         }

      case Actions.SET_IS_LOADING:
         return {
            ...state,
            isLoading: action.payload
         }

      case Actions.ADD_LIKE:
         if (!state.user) return state;

         return {
            ...state,
            user: {
               ...state.user,
               likes: [...state.user.likes, action.payload]
            }
         }

      case Actions.FOLLOW:
         if (!state.user) return state;

         return {
            ...state,
            user: {
               ...state.user,
               following: [...state.user.following, action.payload]
            }
         }

      case Actions.UNFOLLOW:
         if (!state.user) return state;

         return {
            ...state,
            user: {
               ...state.user,
               following: state.user.following.filter((id) => {
                  return id !== action.payload
               })
            }
         }

      case Actions.DELETE_LIKE:
         if (!state.user) return state;

         return {
            ...state,
            user: {
               ...state.user,
               likes: state.user.likes.filter((id) => {
                  return id !== action.payload
               })
            }
         }

      case Actions.SET_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false
         }

      case Actions.SET_SIGNIN_ERROR:
         return {
            ...state,
            signInError: action.payload,
            isLoading: false
         }

      case Actions.SET_SIGNIN_ERROR:
         return {
            ...state,
            signUpError: action.payload,
            isLoading: false
         }

      default:
         return state;
   }
}

export default authReducer;