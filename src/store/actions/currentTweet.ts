import { Dispatch } from "react";
import CommentsService from "../../API/CommentsService";
import { LikesService } from "../../API/LikesService";
import TweetsService from "../../API/TweetsService";
import { Actions, ActionTypes } from "../../types/currentTweet";
import { ActionTypes as AuthActionTypes } from "../../types/auth";
import { IComment } from "../../types/IComment";
import { ICommentBody } from "../../types/ICommentBody";
import { ITweet } from "../../types/ITweet";
import { authAddLike, authDeleteLike } from "./authActions";


//ACTIONS
export const setTweet = (tweet: ITweet): ActionTypes => (
   { type: Actions.SET_TWEET, payload: tweet }
)

export const createComment = (comment: IComment): ActionTypes => (
   { type: Actions.CREATE_COMMENT, payload: comment }
)

export const deleteComment = (id: string): ActionTypes => (
   { type: Actions.DELETE_COMMENT, payload: id }
)

export const createLike = (id: string): ActionTypes => (
   { type: Actions.CREATE_LIKE, payload: id }
)

export const deleteLike = (id: string): ActionTypes => (
   { type: Actions.DELETE_LIKE, payload: id }
)

export const setIsFetchingLike = (): ActionTypes => (
   { type: Actions.FETCH_LIKE }
)

export const setIsLoading = (): ActionTypes => (
   { type: Actions.SET_IS_LOADING }
)

export const setError = (err: string): ActionTypes => (
   { type: Actions.SET_ERROR, payload: err }
)

//THUNKS
export const getTweet = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         dispatch(setIsLoading());

         const res = await TweetsService.fetchOneTweet(id);

         dispatch(setTweet(res));
      } catch (err: any) {
         dispatch(setError(err.message));
      }
   }
}

export const fetchCreateComment = (id: string, text: ICommentBody) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         const res = await CommentsService.createComment(id, text);

         dispatch(createComment(res));
      } catch (err: any) {
         console.log(err)
      }
   }
}

export const fetchDeleteComment = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes>) => {
      try {
         await CommentsService.deleteComment(id);

         dispatch(deleteComment(id));
      } catch (err: any) {
         console.log(err)
      }
   }
}

export const fetchCreateLike = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes | AuthActionTypes>) => {
      try {
         dispatch(setIsFetchingLike())

         const res = await LikesService.like(id);

         dispatch(createLike(res));
         dispatch(authAddLike(id))
      } catch (err: any) {
         console.log(err)
      }
   }
}

export const fetchDeleteLike = (id: string) => {
   return async (dispatch: Dispatch<ActionTypes | AuthActionTypes>) => {
      try {
         dispatch(setIsFetchingLike())

         const res = await LikesService.like(id);

         dispatch(deleteLike(res));
         dispatch(authDeleteLike(id));
      } catch (err: any) {
         console.log(err)
      }
   }
}