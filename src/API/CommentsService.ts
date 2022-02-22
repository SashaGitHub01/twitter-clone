import { instance } from "./instance";
import { IComment } from "../types/IComment";
import { ICommentBody } from "../types/ICommentBody";
import { IResponse } from "./types/response";

class CommentsService {
   static createComment = async (tweetId: string, text: ICommentBody): Promise<IComment> => {
      const res = await instance.post<IResponse<IComment>>(`/comments/${tweetId}`, text);

      return res.data.data;
   }

   static deleteComment = async (id: string): Promise<string> => {
      const res = await instance.delete<IResponse<string>>(`/comments/${id}`);

      return res.data.data;
   }
}

export default CommentsService;