import { Dispatch } from "react";
import TweetsService from "../../API/TweetsService";
import UploadService from "../../API/UploadService";
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

export const setLikes = (items: ITweet[]): ActionTypes => (
   { type: Actions.SET_LIKED, payload: items }
)


export const editAvatar = (avatar: string): ActionTypes => (
   { type: Actions.EDIT_AVATAR, payload: avatar }
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

export const getMedia = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await TweetsService.fetchMediaTweets(id);

         dispatch(setMedia(res));
      } catch (err: any) {
         dispatch(setError(err))
      }
   }
}

export const getLikes = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await TweetsService.fetchLikesTweets(id);

         dispatch(setLikes(res));
      } catch (err: any) {
         dispatch(setError(err))
      }
   }
}

export const changeProfileAvatar = (file: File) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await UploadService.uploadAvatar(file);

         dispatch(editAvatar(res));
      } catch (err: any) {
         console.log(err)
      }
   }
}
