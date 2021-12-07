import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import UsersService from "../../API/UsersService";
import { Actions, ActionTypes } from "../../types/currentProfile";
import { ITweet } from "../../types/ITweet";
import { IUser } from "../../types/IUser";


//ACTIONS
export const setProfile = (user: IUser): ActionTypes => (
   { type: Actions.SET_PROFILE, payload: user }
)

export const setMedia = (items: ITweet[]): ActionTypes => (
   { type: Actions.SET_MEDIA, payload: items }
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

export const getMedia = () => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await TweetsService.fetchMediaTweets();

         dispatch(setMedia(res));
      } catch (err: any) {
         dispatch(setError(err))
      }
   }
}
